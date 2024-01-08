import { useCallback, useEffect, useRef, useState } from 'react';
import { DeckType, DeckTypeWithAvgMastery } from '../types';
import { deckApi } from '../api';
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
import { DownloadIcon, Grid, List, LucideShuffle, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { USER_ID } from '../../../constants/index';
import { dayjsUtils } from '@/lib/utils';
import { ProgressBar } from '@tremor/react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { addStudySession } from '@/features/study/api/studysessions';
import { getSessionId, setSessionId } from '@/utils/setSessionId';
import { download } from '../utils/downloadJSON';

function Decks() {
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [decksByMastery, setDecksByMastery] = useState<
    DeckTypeWithAvgMastery[]
  >([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { deckViewType, setDeckViewType } = useUserPreferences();
  const handleViewTypeChange = (type: 'grid' | 'list') => {
    setDeckViewType(type);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    deckApi.getDecks().then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setDecks(data);
      }
    });
    deckApi.getLowestMasteredDecks(USER_ID).then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setDecksByMastery(data);
      }
    });
  }, []);

  const handleRandomStudy = () => {
    if (decks.length === 0)
      return alert('You need to add a deck with flashcards first!');
    const randomDeck = decks[Math.floor(Math.random() * decks.length)];
    const id = randomDeck.id;

    handleStudy(id);
  };

  const handleStudy = (id: number) => {
    if (!id) return alert('You need to add a deck with flashcards first!');
    addStudySession(
      {
        deck_id: Number(id),
        user_id: USER_ID,
        start_time: new Date(),
      },
      (sessionId) => {
        setSessionId(sessionId.toString());
        console.log(sessionId);
        console.log('session id set');
        console.log(getSessionId());
        navigate(`/decks/${id}/study`);
      }
    );
  };

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
    <div className='animate-fade-in'>
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
        </div>
        <div className='space-x-2 flex items-center'>
          {deckViewType === 'grid' ? (
            <Button
              variant='outline'
              title='Switch to list view'
              onClick={() => handleViewTypeChange('list')}
            >
              <List />
            </Button>
          ) : (
            <Button
              variant='outline'
              onClick={() => handleViewTypeChange('grid')}
              title='Switch to grid view'
            >
              <Grid />
            </Button>
          )}
          <Button
            onClick={handleRandomStudy}
            variant='outline'
            title='Study a random deck'
          >
            <LucideShuffle className='w-4 h-4' />
          </Button>
        </div>
      </div>
      <div
        ref={(ref) => {
          if (!ref) return;
          const cls = ['bg-background/80', 'py-4', 'shadow-md', 'px-4'];
          window.onscroll = () => {
            if (window.scrollY > 150) {
              ref.classList.add(...cls);
            } else {
              ref.classList.remove(...cls);
            }
          };
        }}
        className='flex items-center justify-between my-8 sticky top-0 z-10 backdrop-blur-md transition-all duration-500 ease-in-out'
      >
        <h3 className='text-2xl font-bold'>
          Your Decks{' '}
          <Button
            onClick={() => download(decks, 'decks')}
            variant='ghost'
            size='icon'
            title='Download all decks as JSON'
          >
            <DownloadIcon className='w-4 h-4 mr-1' />
          </Button>
        </h3>
        <div className='flex gap-2'>
          <AddDeckDialogForm onMutation={setDecks} />
          <Link to='/decks/upload'>
            <Button variant='secondary'>
              <Upload className='w-4 h-4 mr-1' />
              <span>Import</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className='avg-mastery-decks my-8 flex flex-col'>
        <h3 className='text-2xl leading-[4rem] font-bold text-foreground/80'>
          Recommended Decks
        </h3>
        <div className='grid grid-cols-12 gap-2'>
          {decksByMastery &&
            decksByMastery.map((deck) => (
              <div
                key={deck.id}
                className='col-span-3 p-4 flex-col gap-4 flex rounded-md border-card border bg-card relative hover:bg-card/90 transition-colors'
              >
                <Link
                  className='group font-semibold text-base text-foreground/70 hover:text-foreground transition-colors'
                  to={`/decks/${deck.id}/flashcards`}
                >
                  {deck.name}
                  <span className='inline-block opacity-0 group-hover:opacity-100 transition-all translate-x-[-30px] group-hover:translate-x-0'>
                    &rarr;
                  </span>
                </Link>

                <ProgressBar
                  showAnimation
                  color='gray'
                  value={Number(Number(deck.avg_mastery_level).toFixed())}
                  tooltip='Average Mastery Level'
                />
                <p className='text-foreground/80 '>
                  {Number(Number(deck.avg_mastery_level).toFixed())}% complete
                </p>
                <p
                  className='text-[.65rem] text-foreground/50'
                  title={deck.last_studied.toLocaleDateString()}
                >
                  Studied: {dayjsUtils.timeFromNow(deck.last_studied)}
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <h3 className='text-2xl leading-[4rem] font-bold text-foreground/80'>
          All Decks
        </h3>
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
