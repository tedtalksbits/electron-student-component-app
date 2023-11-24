import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircleIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { FlashcardDTO, FlashcardType } from '../types';
import { createFlashcard } from '../api/flashcards';
import { USER_ID } from '@/constants';
import { useToast } from '@/components/ui/use-toast';
import { LucideCheckCircle } from 'lucide-react';

type AddFlashCardProps = {
  onMutation: React.Dispatch<React.SetStateAction<FlashcardType[]>>;
  deckId: number;
};
export const AddDeckFlashcardDialogForm = ({
  onMutation,
  deckId,
}: AddFlashCardProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    const hint = formData.get('hint') as string;
    const tags = formData.get('tags') as string;
    const type = formData.get('type') as string;
    console.log(type);

    if (!question || !answer) return console.log('question or answer is null');
    const data = {
      question,
      answer,
      deck_id: Number(deckId),
      user_id: USER_ID,
      audio: null,
      image: null,
      tags,
      hint,
      type,
      mastery_level: null,
      video: null,
    } as FlashcardDTO;
    console.log(data);
    const refetchQuery = `SELECT * FROM flashcards WHERE deck_id = ${deckId}`;
    createFlashcard<FlashcardType>(data, onMutation, refetchQuery);

    setOpen(false);

    toast({
      title: 'Done!',
      description: `You have successfully added a flashcard`,
      icon: <LucideCheckCircle className='h-5 w-5 text-success' />,
    });
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant='secondary'>
          <PlusCircleIcon className='h-5 w-5 mr-1' />
          Add Flash Card
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Flash Card</DialogTitle>
        <form onSubmit={handleSubmit} className='form'>
          <div className='form-group'>
            <Label htmlFor='question'>Question</Label>
            <Textarea
              autoFocus
              name='question'
              id='question'
              placeholder='question'
              cols={30}
              rows={10}
              required
            />
          </div>
          <div className='form-group'>
            <Label htmlFor='answer'>Answer</Label>
            <Textarea
              name='answer'
              id='answer'
              placeholder='answer'
              cols={30}
              rows={10}
              required
            />
          </div>

          <div className='form-group'>
            <Label htmlFor='hint'>Hint</Label>
            <Input type='text' name='hint' id='hint' placeholder='hint' />
          </div>
          <div className='form-group'>
            <Label htmlFor='tags'>Tags</Label>
            <Input type='text' name='tags' id='tags' placeholder='tags' />
          </div>
          <div className='form-footer'>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
