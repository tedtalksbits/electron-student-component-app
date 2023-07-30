import { useEffect, useState } from 'react';
import { DeckType } from '../types';
import { fetchDecks } from '../api';
import { Deck, AddDeckDialogForm } from '../components';
import { AllStudyData } from '@/features/study-analytics/components/AllStudyData';

function Decks() {
  const [decks, setDecks] = useState<DeckType[]>([]);
  useEffect(() => {
    fetchDecks<DeckType>(setDecks);
  }, []);

  return (
    <div>
      <div className='flex items-center justify-between my-4'>
        <h1 className='text-4xl font-bold'>Your Decks</h1>
        <AddDeckDialogForm onMutation={setDecks} />
      </div>
      <div className='grid md:grid-cols-12 gap-2'>
        {decks.map((deck) => (
          <Deck key={deck.id} deck={deck} setDecks={setDecks} />
        ))}
      </div>
      <hr className='my-5' />
      <AllStudyData />
    </div>
  );
}

export default Decks;
