import React from 'react';
import { DeckType } from '../types';
import { Link } from 'react-router-dom';
import { deleteDeck, updateDeck } from '../api';
import Dialog from '../../../components/dialog/Dialog';
import Menu from '../../../components/menu/Menu';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

type DeckProps = {
  deck: DeckType;
  setDecks: React.Dispatch<React.SetStateAction<DeckType[]>>;
};

function Deck({ deck, setDecks }: DeckProps) {
  const [isOpenEditDeckDialog, setIsOpenEditDeckDialog] = React.useState(false);
  function handleDelete() {
    const refetchQuery = `SELECT * FROM decks`;
    deleteDeck(deck.id, setDecks, refetchQuery);
  }

  const openDialog = () => {
    setIsOpenEditDeckDialog(true);
  };
  const closeDialog = () => {
    setIsOpenEditDeckDialog(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string;
    const data = {
      name,
      description,
      tags,
    } as DeckType;
    const refetchQuery = `SELECT * FROM decks`;
    updateDeck<DeckType>(deck.id, data, setDecks, refetchQuery);
    closeDialog();
  };

  return (
    <div className='col-span-3 border p-4 rounded-md flex flex-col'>
      <header className='ml-auto'>
        <Menu
          menuItems={[
            {
              label: 'edit',
              icon: <PencilIcon />,
              onClick: openDialog,
            },
            {
              label: 'delete',
              icon: <TrashIcon />,
              onClick: handleDelete,
            },
          ]}
          menuButtonLabel='...'
        />
      </header>
      <h4 className='my-2 hover:text-sky-300 text-constraint'>
        <Link to={`/deck/${deck.id}/flashcards`}>{deck.name}</Link>
      </h4>
      <p className='text-sm text-white/75'>{deck.description}</p>
      <div className='flex gap-1 my-2 overflow-x-auto snap-x scroll-smooth snap-mandatory'>
        {deck.tags &&
          deck.tags.split(',').map((tag, i) => (
            <span
              key={i}
              className='bg-neutral-700 text-xs rounded-full px-2 py-1 overflow-x-hidden whitespace-nowrap text-ellipsis max-w-[10ch]'
            >
              {tag}
            </span>
          ))}
      </div>
      <small className='font-light text-xs text-white/20 mt-auto'>
        Last updated: {new Date(deck.updated_at).toLocaleDateString()}
      </small>
      <Dialog open={isOpenEditDeckDialog} onClose={closeDialog}>
        <div className='flex flex-col gap-4'>
          <button
            className='btn btn-secondary inline-block self-end'
            onClick={closeDialog}
          >
            close
          </button>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              defaultValue={deck.name}
              placeholder='name'
            />
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              defaultValue={deck.description ?? ''}
              placeholder='description'
            />
            <label htmlFor='tags'>Tags</label>
            <input
              type='text'
              name='tags'
              id='tags'
              defaultValue={deck.tags ?? ''}
              placeholder='tags'
            />
            <button className='btn-success mt-8'>Save</button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Deck;
