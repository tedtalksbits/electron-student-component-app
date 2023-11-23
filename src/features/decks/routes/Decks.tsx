import { useCallback, useEffect, useRef, useState } from 'react';
import { DeckType } from '../types';
import { fetchDecks } from '../api';
import { DeckCard, AddDeckDialogForm, DeckRow } from '../components';
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
import { Grid, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

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

  if (!decks || decks.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ['20%', '20%', '50%', '50%', '20%'],
        }}
      >
        loading...
      </motion.div>
    );

  return (
    <div className=''>
      <div
        className='
        bg-gradient-to-b
        from-primary/5
        to-transparent
        w-full
        h-[200px]
        left-0
        top-0
        absolute
        z-[-1] animate-fade-in'
      ></div>
      <div className='flex items-center justify-between'>
        <div className='space-x-2 flex items-center'>
          <NavLink to='/'>
            <Button variant='outline'>← Back</Button>
          </NavLink>
          <Input
            type='search'
            placeholder='Search'
            onChange={(e) => setSearch(e.target.value)}
            value={search || ''}
            ref={inputRef}
            className='w-34'
          />
        </div>
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
            <DeckCard
              key={deck.id}
              deck={deck}
              setDecks={setDecks}
              setSearch={setSearch}
            />
          ))}
        </div>
      ) : (
        <div className='border rounded-lg overflow-hidden'>
          <Table className='bg-card '>
            <TableHeader>
              <TableRow className='hover:bg-accent bg-accent [&>td]:p-4 text-foreground/30'>
                <TableCell>Name</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDecks.map((deck) => (
                <DeckRow
                  key={deck.id}
                  deck={deck}
                  setDecks={setDecks}
                  setSearch={setSearch}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default Decks;
