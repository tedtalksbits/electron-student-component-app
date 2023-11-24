import React from 'react';
import { FlashcardType } from '../types';
import Markdown from '../../../components/markdown/Markdown';
import { FlashcardActions } from '.';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Progress } from '@/components/ui/progress';
import ContentEditor from '@/components/ui/contentEditor';
import { CollapseContent, CollapseTrigger } from '@/components/ui/collapse';
import { motion } from 'framer-motion';

type FlashcardProps = {
  flashcard: FlashcardType;
  setFlashcards: React.Dispatch<React.SetStateAction<FlashcardType[]>>;
};
export const Flashcard = ({ flashcard, setFlashcards }: FlashcardProps) => {
  return (
    <motion.div
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 24 },
        },
        hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
      }}
      key={flashcard.id}
      className='border rounded-md p-4 flex flex-col relative shadow-md'
    >
      <Progress
        className='absolute top-0 left-0'
        variant={flashcard.mastery_level >= 100 ? 'success' : 'default'}
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
            <p className='text-lg text-foreground font-normal'>
              {flashcard.question}
            </p>
          </CollapseTrigger>
          <CollapseContent id={flashcard.id.toString()}>
            <Markdown>{flashcard.answer}</Markdown>
          </CollapseContent>
        </article>
      )}
    </motion.div>
  );
};
