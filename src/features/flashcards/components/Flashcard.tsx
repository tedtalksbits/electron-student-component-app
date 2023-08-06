import React from 'react';
import { FlashcardType } from '../types';
import Markdown from '../../../components/markdown/Markdown';
import { FlashcardActions } from '.';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

type FlashcardProps = {
  flashcard: FlashcardType;
  setFlashcards: React.Dispatch<React.SetStateAction<FlashcardType[]>>;
};
export const Flashcard = ({ flashcard, setFlashcards }: FlashcardProps) => {
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
        <Markdown className=' before:content-["A:"] before:block before:h-4'>
          {flashcard.answer}
        </Markdown>
      </details>
    </div>
  );
};
