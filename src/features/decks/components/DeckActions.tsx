import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { DeckType } from '../types';
import { Label } from '@/components/ui/label';
import { deleteDeck, updateDeck } from '../api';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

type DeckActionsProps = {
  deck: DeckType;
  actions: {
    edit: {
      label: string;
      icon: string | React.ReactNode;
      onMutate: React.Dispatch<React.SetStateAction<DeckType[]>>;
    };
    delete: {
      label: string;
      icon: string | React.ReactNode;
      onMutate: React.Dispatch<React.SetStateAction<DeckType[]>>;
    };
  };
};
export const DeckActions = ({ deck, actions }: DeckActionsProps) => {
  const [open, setOpen] = useState(false);
  const refetchDecksQuery = `SELECT * FROM decks`;

  function handleDelete() {
    deleteDeck(deck.id, actions.delete.onMutate, refetchDecksQuery);
  }

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string;
    if (!name) return;
    const data = {
      name,
      description,
      tags,
    } as DeckType;

    updateDeck<DeckType>(
      deck.id,
      data,
      actions.edit.onMutate,
      refetchDecksQuery
    );
    setOpen(false);
  };

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
        <DialogTitle>Edit</DialogTitle>
        <form onSubmit={handleEdit} className='form'>
          <div className='form-group'>
            <Label htmlFor='name-edit'>Name</Label>
            <Input
              type='text'
              name='name'
              id='name-edit'
              defaultValue={deck.name}
              placeholder='name'
              required
            />
          </div>
          <div className='form-group'>
            <Label htmlFor='description-edit'>Description</Label>
            <Textarea
              name='description'
              id='description-edit'
              defaultValue={deck.description ?? ''}
              placeholder='description'
            />
          </div>
          <div className='form-group'>
            <Label htmlFor='tags-edit'>Tags</Label>
            <Input
              type='text'
              name='tags'
              id='tags-edit'
              defaultValue={deck.tags ?? ''}
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
