import { useEffect, useState } from 'react';
import { DeckType } from '../types';
import { createDeck, fetchDecks } from '../api';
import Deck from '../components/Deck';
import Dialog from '../../../components/dialog/Dialog';

function Decks() {
  const [decks, setDecks] = useState<DeckType[]>([]);
  useEffect(() => {
    fetchDecks<DeckType>(setDecks);
  }, []);

  const [isOpenDeckDialog, setIsOpenDeckDialog] = useState(false);

  const openDialog = () => {
    setIsOpenDeckDialog(true);
  };
  const closeDialog = () => {
    setIsOpenDeckDialog(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const data = {
      name,
      description,
      user_id: 2,
      tags: null,
    } as DeckType;
    const refetchQuery = `SELECT * FROM decks`;
    createDeck<DeckType>(data, setDecks, refetchQuery);
    closeDialog();
  };

  return (
    <div>
      <div className='flex items-center justify-between my-4'>
        <h1 className='text-4xl font-bold'>Your Decks</h1>
        <button className='btn-primary' onClick={openDialog}>
          Add Deck
        </button>
      </div>
      <div className='grid md:grid-cols-12 gap-2'>
        {decks.map((deck) => (
          <Deck key={deck.id} deck={deck} setDecks={setDecks} />
        ))}
      </div>
      <Dialog open={isOpenDeckDialog} onClose={closeDialog}>
        <div className='flex flex-col gap-4'>
          <div className='flex item-center justify-between'>
            <h2 className='text-2xl font-bold'>Add Deck</h2>
            <button onClick={closeDialog} className='btn-secondary self-end'>
              close
            </button>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <label htmlFor='name'>name</label>
            <input type='text' name='name' id='name' placeholder='name' />
            <label htmlFor='description'>description</label>
            <input
              type='text'
              name='description'
              id='description'
              placeholder='description'
            />
            <button className='btn-success mt-8'>Save</button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Decks;
