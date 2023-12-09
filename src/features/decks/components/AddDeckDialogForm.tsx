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
import { EmojiSelectorWithCategories } from '@/components/emoji-selector/EmojiSelectorWithCategories';
import { FilePlus2Icon, LucideCheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type AddDeckProps = {
  onMutation: React.Dispatch<React.SetStateAction<DeckType[]>>;
};
export const AddDeckDialogForm = ({ onMutation }: AddDeckProps) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>('');
  const { toast } = useToast();
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
      image,
    } as DeckType;
    const refetchQuery = `SELECT * FROM decks ORDER BY updated_at DESC`;
    createDeck<DeckType>(data, onMutation, refetchQuery);
    setOpen(false);

    toast({
      title: 'Done!',
      description: `You have successfully created deck: ${name}`,
      icon: <LucideCheckCircle className='h-5 w-5 text-success' />,
    });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button variant='default'>
            {' '}
            <FilePlus2Icon className='w-4 h-4 mr-1' /> Add Deck
          </Button>
        </DialogTrigger>
        <DialogContent className='flex flex-col'>
          <DialogTitle>Add New Deck</DialogTitle>
          <form onSubmit={handleSubmit} className='form'>
            <EmojiSelectorWithCategories
              labelKey='addDeckEmoji'
              onSelectEmoji={setImage}
            />
            {/* <EmojiSelector /> */}
            <Button variant='secondary' className='w-fit' type='button'>
              <Label htmlFor='addDeckEmoji'>Select Icon</Label>
            </Button>
            <label htmlFor='addDeckEmoji' className='w-full'>
              {image && (
                <span className='text-7xl flex items-start justify-center text-center p-2 rounded-md border w-fit h-fit'>
                  {image}
                </span>
              )}
            </label>
            <div className='form-group'>
              <Label htmlFor='name'>name</Label>
              <Input
                autoFocus
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
