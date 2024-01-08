import { Link, NavLink, useParams } from 'react-router-dom';
import { FlashcardType } from '../types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudySession } from '../../study/api/studysessions';
import { getSessionId, setSessionId } from '../../../utils/setSessionId';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@heroicons/react/solid';
import { AddDeckFlashcardDialogForm, Flashcard } from '../components';
import { USER_ID } from '@/constants';
import { Progress } from '@/components/ui/progress';
import { DeckType } from '@/features/decks/types';
import { motion } from 'framer-motion';
import { flashcardApi } from '../api';
import { deckApi } from '@/features/decks/api';
import { download } from '../utils/downloadJSON';
import { DownloadIcon, Upload } from 'lucide-react';

function Flashcards() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);

  const [deck, setDeck] = useState<DeckType | null>(null);

  useEffect(() => {
    flashcardApi.getFlashcardsByDeckId(Number(id)).then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setFlashcards(data);
      }
    });
    deckApi.getDeckById(Number(id)).then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setDeck(data);
      }
    });
  }, [id]);

  const handleStartStudy = () => {
    if (flashcards.length === 0)
      return alert('You need to add flashcards to this deck first!');
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

  const handleDownloadAll = () => {
    download(flashcards, deck?.name || 'flashcards');
  };
  const overallMastery = flashcards.reduce((acc, curr) => {
    return acc + curr.mastery_level;
  }, 0);
  const averageMastery = overallMastery / flashcards.length || 0;

  return (
    <>
      <div
        className='   
        bg-gradient-to-b
        from-success/5
        to-transparent
        w-full
        h-[200px]
        left-0
        top-0
        absolute
        z-[-1] animate-fade-in'
      ></div>
      <div className='relative'>
        <div className='flex items-center justify-between animate-fade-in'>
          <NavLink to='/decks'>
            <Button variant='outline'>← Back</Button>
          </NavLink>
          <h2 className='text-lg font-bold'>Deck Overview</h2>
          <div className='flex items-center gap-2'>
            <p>Overall Mastery:</p>
            <div className='text-xs text-foreground/50 relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary rounded-md blur opacity-50 z-[-1]'></div>
              {averageMastery.toFixed(2)}%
              <Progress value={averageMastery} />
            </div>
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
          <div>
            <h2 className='text-lg font-bold'>
              {deck?.name}{' '}
              <Button onClick={handleDownloadAll} variant='ghost' size='icon'>
                <DownloadIcon className='w-4 h-4' />
              </Button>
            </h2>
            <small className='text-foreground/50'>{deck?.description}</small>
          </div>
          <div className='flex items-center gap-2'>
            {deck && (
              <AddDeckFlashcardDialogForm
                onMutation={setFlashcards}
                deck={deck}
              />
            )}
            <Link
              to={`/decks/${deck?.id}/flashcards/upload`}
              state={{
                deck,
              }}
            >
              <Button variant='secondary'>
                <Upload className='w-4 h-4 mr-1' />
                <span>Import</span>
              </Button>
            </Link>
            <div className='pl-4 border-l border-border'></div>
            <Button
              variant='success'
              onClick={handleStartStudy}
              disabled={flashcards.length === 0}
            >
              <PlayIcon className='h-4 w-4 mr-1' />
              Study
            </Button>
          </div>
        </div>
        <motion.div
          className='flex flex-col gap-4'
          initial='hidden'
          animate='visible'
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
          }}
        >
          {flashcards.map((flashcard) => (
            <Flashcard
              key={flashcard.id}
              flashcard={flashcard}
              setFlashcards={setFlashcards}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
}

export default Flashcards;
