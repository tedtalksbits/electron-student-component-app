import React from 'react';
import { FlashcardType } from '../types';
import { deleteFlashcard, updateFlashcard } from '../api';
import Dialog from '../../../components/dialog/Dialog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Menu from '../../../components/menu/Menu';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
type FlashcardProps = {
  flashcard: FlashcardType;
  setFlashcards: React.Dispatch<React.SetStateAction<FlashcardType[]>>;
};
function Flashcard({ flashcard, setFlashcards }: FlashcardProps) {
  const [isOpenEditFlashcardDialog, setIsOpenEditFlashcardDialog] =
    React.useState(false);

  const openDialog = () => {
    setIsOpenEditFlashcardDialog(true);
  };
  const closeDialog = () => {
    setIsOpenEditFlashcardDialog(false);
  };
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
    closeDialog();
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
      <details className='my-4'>
        <summary>Q: {flashcard.question}</summary>
        <ReactMarkdown
          className='my-4 before:content-["A:"] before:block before:h-4'
          remarkPlugins={[remarkGfm]}
          children={flashcard.answer}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={atomDark}
                  language={match[1]}
                  PreTag='div'
                />
              ) : (
                <code
                  {...props}
                  className={
                    className + ' bg-neutral-700 rounded-md text-amber-200'
                  }
                >
                  {children}
                </code>
              );
            },
          }}
        />
      </details>
      <Dialog open={isOpenEditFlashcardDialog} onClose={closeDialog}>
        <div className='flex flex-col gap-4'>
          <div className='flex item-center justify-between'>
            <h2 className='text-2xl font-bold'>Edit Flashcard</h2>
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
              defaultValue={flashcard.question}
              placeholder='question'
            />
            <label htmlFor='answer'>Answer</label>
            <textarea
              name='answer'
              id='answer'
              defaultValue={flashcard.answer}
              placeholder='answer'
              cols={30}
              rows={10}
            />
            <label htmlFor='hint'>Hint</label>
            <input
              type='text'
              name='hint'
              id='hint'
              defaultValue={flashcard.hint ?? ''}
              placeholder='hint'
            />
            <label htmlFor='tags'>Tags</label>
            <input
              type='text'
              name='tags'
              id='tags'
              defaultValue={flashcard.tags ?? ''}
              placeholder='tags'
            />
            <button className='btn-success mt-8'>Save</button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Flashcard;
