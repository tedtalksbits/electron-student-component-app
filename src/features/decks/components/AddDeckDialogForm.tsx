import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DeckType } from '../types';
import { useState } from 'react';
import { createDeck } from '../api';
import { USER_ID } from '@/constants';

type AddDeckProps = {
  onMutation: React.Dispatch<React.SetStateAction<DeckType[]>>;
};
export const AddDeckDialogForm = ({ onMutation }: AddDeckProps) => {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string;

    if (!name) {
      return;
    }
    const data = {
      name,
      description,
      user_id: USER_ID,
      tags: tags || null,
    } as DeckType;
    const refetchQuery = `SELECT * FROM decks`;
    createDeck<DeckType>(data, onMutation, refetchQuery);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button variant='default'>Add Deck</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add New Deck</DialogTitle>
          <form onSubmit={handleSubmit} className='form'>
            <div className='form-group'>
              <Label htmlFor='name'>name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='name'
                required
              />
            </div>
            <div className='form-group'>
              <Label htmlFor='description'>description</Label>
              <Input
                type='text'
                name='description'
                id='description'
                placeholder='description'
              />
            </div>
            <div className='form-group'>
              <Label htmlFor='tags'>tags</Label>
              <Input type='text' name='tags' id='tags' placeholder='tags' />
            </div>
            <div className='form-footer'>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
