import React from 'react';
import { FlashcardType } from '../types';
import { deleteFlashcard, updateFlashcard } from '../api/flashcards';
import Markdown from '../../../components/markdown/Markdown';
import { FlashcardActions } from '.';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

type FlashcardProps = {
  flashcard: FlashcardType;
  setFlashcards: React.Dispatch<React.SetStateAction<FlashcardType[]>>;
};
export const Flashcard = ({ flashcard, setFlashcards }: FlashcardProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    const hint = formData.get('hint') as string;
    const tags = formData.get('tags') as string;
    const data = {
      question,
      answer,
      hint,
      tags,
    } as FlashcardType;
    console.log(data);
    const refetchQuery = `SELECT * FROM flashcards WHERE deck_id = ${flashcard.deck_id}`;
    updateFlashcard<FlashcardType>(
      flashcard.id,
      data,
      setFlashcards,
      refetchQuery
    );
  };

  const handleDelete = () => {
    const refetchQuery = `SELECT * FROM flashcards WHERE deck_id = ${flashcard.deck_id}`;
    deleteFlashcard(flashcard.id, setFlashcards, refetchQuery);
  };

  return (
    <div
      key={flashcard.id}
      className='border rounded-md p-4 flex flex-col relative'
    >
      <header className='ml-auto'>
        <FlashcardActions
          flashcard={flashcard}
          actions={{
            delete: {
              icon: <TrashIcon />,
              label: 'Delete',
              onMutate: setFlashcards,
            },
            edit: {
              label: 'Edit',
              icon: <PencilIcon />,
              onMutate: setFlashcards,
            },
          }}
        />
      </header>
      <details className='my-4'>
        <summary>Q: {flashcard.question}</summary>
        <Markdown>{flashcard.answer}</Markdown>
      </details>
    </div>
  );
};
