import { useCallback, useEffect, useRef, useState } from 'react';
import { DeckType } from '../types';
import { fetchDecks } from '../api';
import { Deck, AddDeckDialogForm, DeckActions } from '../components';
import { AllStudyData } from '@/features/study-analytics/components/AllStudyData';
import { Input } from '@/components/ui/input';
import { useShortcuts } from '@/hooks/useShortcuts';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Grid, List } from 'lucide-react';

function Decks() {
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [search, setSearch] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>(
    (localStorage.getItem('viewType') as 'grid' | 'list') || 'grid'
  );
  const handleViewTypeChange = (viewType: 'grid' | 'list') => {
    setViewType(viewType);
    localStorage.setItem('viewType', viewType);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    fetchDecks<DeckType>(setDecks);
  }, []);

  const filteredDecks = decks.filter((deck) => {
    const nameMatch = deck.name.toLowerCase().includes(search.toLowerCase());
    const descriptionMatch = deck.description
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const tagsMatch = deck.tags?.toLowerCase().includes(search.toLowerCase());
    return nameMatch || descriptionMatch || tagsMatch;
  });

  const handleSearchShortcut = useCallback((e: KeyboardEvent) => {
    if (e.key === 'f' && e.ctrlKey) {
      e.preventDefault();
      setSearch('');
      inputRef.current?.focus();
    }
  }, []);

  useShortcuts(handleSearchShortcut);

  if (!decks || decks.length === 0) return <div>loading...</div>;

  return (
    <div>
      <div className='flex items-center justify-between'>
        <Input
          type='search'
          placeholder='Search'
          onChange={(e) => setSearch(e.target.value)}
          value={search || ''}
          ref={inputRef}
          className='w-34'
        />
        <Button
          variant='outline'
          onClick={() =>
            handleViewTypeChange(viewType === 'grid' ? 'list' : 'grid')
          }
        >
          {viewType === 'grid' ? <List /> : <Grid />}
        </Button>
      </div>
      <div className='flex items-center justify-between my-8'>
        <h3 className='text-2xl font-bold'>Your Decks</h3>
        <AddDeckDialogForm onMutation={setDecks} />
      </div>
      {viewType === 'grid' ? (
        <div className='grid md:grid-cols-12 gap-2'>
          {filteredDecks.map((deck) => (
            <Deck
              key={deck.id}
              deck={deck}
              setDecks={setDecks}
              setSearch={setSearch}
            />
          ))}
        </div>
      ) : (
        <div>
          <Table className='bg-card rounded-lg overflow-hidden'>
            <TableHeader>
              <TableRow className='hover:bg-accent bg-accent [&>td]:p-4  font-semibold'>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDecks.map((deck) => (
                <TableRow key={deck.id} className='[&>td]:p-4'>
                  <TableCell>
                    <h2
                      className='hover:text-primary font-medium underline'
                      title={deck.name}
                    >
                      <Link to={`/decks/${deck.id}/flashcards`}>
                        {deck.name}
                      </Link>
                    </h2>
                  </TableCell>
                  <TableCell>{deck.description}</TableCell>
                  <TableCell>
                    {new Date(deck.updated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {deck.tags?.split(',').map((tag, i) => (
                      <Badge
                        key={i}
                        variant='outline'
                        className='whitespace-nowrap text-[10px] cursor-pointer'
                        onClick={() => setSearch(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <DeckActions
                      deck={deck}
                      actions={{
                        delete: {
                          icon: <TrashIcon />,
                          label: 'Delete',
                          onMutate: setDecks,
                        },
                        edit: {
                          icon: <PencilIcon />,
                          label: 'Edit',
                          onMutate: setDecks,
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <hr className='my-10' />
      <AllStudyData />
    </div>
  );
}

export default Decks;
