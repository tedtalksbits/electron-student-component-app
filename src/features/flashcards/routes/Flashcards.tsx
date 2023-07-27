import React from 'react';
import { useParams } from 'react-router-dom';
import { FlashcardType, FlashcardDTO } from '../types';
import { useEffect, useState } from 'react';
import Flashcard from '../components/Flashcard';
import { createFlashcard, fetchFlashcardsByDeckId } from '../api';
import Dialog from '../../../components/dialog/Dialog';

function Flashcards() {
  const { id } = useParams();
  console.log(id);
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [isOpenNewFlashcardDialog, setIsOpenNewFlashcardDialog] =
    useState(false);

  useEffect(() => {
    fetchFlashcardsByDeckId<FlashcardType>(Number(id), setFlashcards);
  }, [id]);

  const openDialog = () => {
    setIsOpenNewFlashcardDialog(true);
  };
  const closeDialog = () => {
    setIsOpenNewFlashcardDialog(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    const data = {
      question,
      answer,
      deck_id: Number(id),
      user_id: 2,
      audio: null,
      image: null,
      tags: null,
      hint: null,
      mastery_level: null,
      video: null,
    } as FlashcardDTO;
    console.log(data);
    const refetchQuery = `SELECT * FROM flashcards WHERE deck_id = ${id}`;
    createFlashcard<FlashcardType>(data, setFlashcards, refetchQuery);
    closeDialog();
  };

  return (
    <div>
      <div className='flex items-center justify-between my-4'>
        <h2 className='text-4xl font-bold'>Flashcards | Deck {id}</h2>
        <button className='btn-primary' onClick={openDialog}>
          new
        </button>
      </div>

      <div className='flex flex-col gap-4'>
        {flashcards.map((flashcard) => (
          <Flashcard
            key={flashcard.id}
            flashcard={flashcard}
            setFlashcards={setFlashcards}
          />
        ))}
      </div>

      <Dialog open={isOpenNewFlashcardDialog} onClose={closeDialog}>
        <div className='flex flex-col gap-4'>
          <div className='flex item-center justify-between'>
            <h2 className='text-2xl font-bold'>Add Flashcard</h2>
            <button
              onClick={closeDialog}
              className='btn btn-secondary inline-block self-end'
            >
              close
            </button>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <label htmlFor='question'>Question</label>
            <input
              type='text'
              name='question'
              id='question'
              placeholder='question'
            />
            <label htmlFor='answer'>Answer</label>
            <input type='text' name='answer' id='answer' placeholder='answer' />
            <button className='btn-success mt-8'>Save</button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Flashcards;
