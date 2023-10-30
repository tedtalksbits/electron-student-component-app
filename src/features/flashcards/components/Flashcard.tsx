import React from 'react';
import { FlashcardType } from '../types';
import Markdown from '../../../components/markdown/Markdown';
import { FlashcardActions } from '.';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Progress } from '@/components/ui/progress';
import ContentEditor from '@/components/ui/contentEditor';
import { CollapseContent, CollapseTrigger } from '@/components/ui/collapse';

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
      <Progress
        className='absolute top-0 left-0'
        value={flashcard.mastery_level}
        title={`${flashcard.mastery_level ?? 0}%`}
      />
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
      {flashcard.type === 'advanced' ? (
        <>
          <ContentEditor value={flashcard.question} />
          <ContentEditor value={flashcard.answer} />
        </>
      ) : (
        <article className='my-4'>
          <CollapseTrigger
            variant='ghost'
            aria-labelledby={flashcard.id.toString()}
          >
            {flashcard.question}
          </CollapseTrigger>
          <CollapseContent id={flashcard.id.toString()}>
            <Markdown>{flashcard.answer}</Markdown>
          </CollapseContent>
        </article>
      )}
    </div>
  );
};
