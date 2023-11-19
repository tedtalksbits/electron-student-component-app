import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FlashcardType } from '../types';
import { useState } from 'react';
import { deleteFlashcard, updateFlashcard } from '../api/flashcards';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

type FlashcardActionsProps = {
  flashcard: FlashcardType;
  actions: {
    edit: {
      label: string;
      icon: string | React.ReactNode;
      onMutate: React.Dispatch<React.SetStateAction<FlashcardType[]>>;
    };
    delete: {
      label: string;
      icon: string | React.ReactNode;
      onMutate: React.Dispatch<React.SetStateAction<FlashcardType[]>>;
    };
  };
};

export const FlashcardActions = ({
  flashcard,
  actions,
}: FlashcardActionsProps) => {
  const [open, setOpen] = useState(false);
  const refetchFlashcardsByDeckIdQuery = `SELECT * FROM flashcards WHERE deck_id = ${flashcard.deck_id}`;

  function handleDelete() {
    deleteFlashcard(
      flashcard.id,
      actions.delete.onMutate,
      refetchFlashcardsByDeckIdQuery
    );
  }

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
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

    console.log('handleUpdate', data);

    updateFlashcard<FlashcardType>(
      flashcard.id,
      data,
      actions.edit.onMutate,
      refetchFlashcardsByDeckIdQuery
    );
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' className='w-fit h-fit p-1'>
            <DotsVerticalIcon className='h-5 w-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <span className='h-5 w-5 mr-1'>{actions.edit.icon}</span>{' '}
              {actions.edit.label}
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete}>
            <span className='h-5 w-5 mr-1'>{actions.delete.icon}</span>{' '}
            {actions.delete.label}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate} className='form'>
          <div className='form-group'>
            <Label htmlFor='question'>Question</Label>
            <Textarea
              name='question'
              id='question'
              cols={30}
              rows={10}
              defaultValue={flashcard.question}
              placeholder='question'
            />
          </div>
          <div className='form-group'>
            <Label htmlFor='answer'>Answer</Label>
            <Textarea
              name='answer'
              id='answer'
              defaultValue={flashcard.answer}
              placeholder='answer'
              cols={30}
              rows={10}
            />
          </div>
          <div className='form-group'>
            <Label htmlFor='hint'>Hint</Label>
            <Input
              type='text'
              name='hint'
              id='hint'
              defaultValue={flashcard.hint ?? ''}
              placeholder='hint'
            />
          </div>
          <div className='form-group'>
            <Label htmlFor='tags'>Tags</Label>
            <Input
              type='text'
              name='tags'
              id='tags'
              defaultValue={flashcard.tags ?? ''}
              placeholder='tags'
            />
          </div>
          <div className='form-footer'>
            <Button variant='outline' onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button type='submit'>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
