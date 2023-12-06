import { useCallback, useEffect, useRef, useState } from 'react';
import { DeckType, DeckTypeWithAvgMastery } from '../types';
import { fetchDecks, fetchDecksByAvgMastery } from '../api';
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
import { Link, NavLink } from 'react-router-dom';
import { useToggleConfig } from '@/hooks/theme';
import { USER_ID } from '../../../constants/index';
import { dayjsUtils } from '@/lib/utils';

function Decks() {
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [decksByMastery, setDecksByMastery] = useState<
    DeckTypeWithAvgMastery[]
  >([]);
  const [search, setSearch] = useState('');
  // const [viewType, setViewType] = useState<'grid' | 'list'>(
  //   (localStorage.getItem('viewType') as 'grid' | 'list') || 'grid'
  // );

  const { deckViewType, toggleDeckViewType } = useToggleConfig();
  const handleViewTypeChange = (type: 'grid' | 'list') => {
    toggleDeckViewType(type);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    fetchDecks<DeckType>(setDecks);
    fetchDecksByAvgMastery(USER_ID, setDecksByMastery);
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

        {deckViewType === 'grid' ? (
          <Button
            variant='outline'
            onClick={() => handleViewTypeChange('list')}
          >
            <List />
          </Button>
        ) : (
          <Button
            variant='outline'
            onClick={() => handleViewTypeChange('grid')}
          >
            <Grid />
          </Button>
        )}
      </div>
      <div className='flex items-center justify-between my-8'>
        <h3 className='text-2xl font-bold'>Your Decks</h3>

        <AddDeckDialogForm onMutation={setDecks} />
      </div>

      <div className='avg-mastery-decks my-8 flex flex-col gap-4'>
        <h3 className='text-md font-bold text-foreground/80'>
          These Decks Need Some Attention
        </h3>
        <div className='flex gap-4'>
          {decksByMastery &&
            decksByMastery.map((deck) => (
              <div
                key={deck.id}
                className='p-4 flex-col flex rounded-md border-orange-800/20 border bg-orange-800/10 relative hover:bg-orange-800/20 transition-colors'
              >
                <Link
                  className='group font-normal text-sm text-orange-100 hover:text-foreground transition-colors'
                  to={`/decks/${deck.id}/flashcards`}
                >
                  {deck.name}
                  <span className='inline-block opacity-0 group-hover:opacity-100 transition-all translate-x-[-30px] group-hover:translate-x-0'>
                    &rarr;
                  </span>
                </Link>
                <div
                  className='border rounded-full bg-orange-800 text-orange-100 border-orange-800 text-[.75rem] transition-all ease-in-out duration-200'
                  style={{
                    width: `${Number(deck.avg_mastery_level).toFixed()}%`,
                  }}
                >
                  <small className='flex items-center '>
                    <span> Mastery:</span>{' '}
                    <span>{Number(deck.avg_mastery_level).toFixed()}%</span>
                  </small>
                </div>
                <span
                  className='text-[.75rem] text-orange-100'
                  title={deck.last_studied.toLocaleDateString()}
                >
                  Studied: {dayjsUtils.timeFromNow(deck.last_studied)}
                </span>
              </div>
            ))}
        </div>
      </div>
      {deckViewType === 'grid' ? (
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
