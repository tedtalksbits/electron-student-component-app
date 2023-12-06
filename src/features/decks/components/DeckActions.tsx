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
import { EmojiSelectorWithCategories } from '@/components/emoji-selector/EmojiSelectorWithCategories';
import { useToast } from '@/components/ui/use-toast';
import { LucideCheckCheck, LucideCheckCircle } from 'lucide-react';

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
  const [image, setImage] = useState<string | null>(deck.image);
  const { toast } = useToast();
  const refetchDecksQuery = `SELECT * FROM decks ORDER BY updated_at DESC`;

  function handleDelete() {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${deck.name}?`
    );
    if (!confirmDelete) return;
    deleteDeck(deck.id, actions.delete.onMutate, refetchDecksQuery);
    toast({
      title: 'Done!',
      description: `You have successfully deleted deck: ${deck.name}`,
      icon: <LucideCheckCircle className='h-5 w-5 text-success' />,
    });
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
      tags: tags ? tags : null,
      image,
    } as DeckType;

    updateDeck<DeckType>(
      deck.id,
      data,
      actions.edit.onMutate,
      refetchDecksQuery
    );

    toast({
      title: 'Done!',
      description: `You have successfully updated deck: ${name}`,
      icon: <LucideCheckCheck className='h-5 w-5 text-success' />,
    });
    setOpen(false);
    setImage('');
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
      <DialogContent className='flex flex-col'>
        <DialogTitle>Edit</DialogTitle>
        <form onSubmit={handleEdit} className='form'>
          <EmojiSelectorWithCategories
            labelKey='updateDeckEmoji'
            onSelectEmoji={setImage}
          />
          <DeckImage image={image || deck.image} />

          <div className='form-group'>
            <Label htmlFor='name-edit'>Name</Label>
            <Input
              autoFocus
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

const DeckImage = ({ image }: { image: string | null }) => {
  return (
    <>
      <Button variant='secondary' className='w-fit' type='button'>
        <Label htmlFor='updateDeckEmoji'>Deck Icon</Label>
      </Button>

      {/* <div
        className={`deck-image flex items-start justify-center text-center p-2 rounded-xl border w-12 h-12`}
      >
        <span className='text-3xl font-semibold '>{image ? image : ''}</span>
      </div> */}
      <label htmlFor='updateDeckEmoji' className='w-full'>
        {image && (
          <span className='text-7xl flex items-start justify-center text-center p-2 rounded-md border w-fit h-fit'>
            {image}
          </span>
        )}
      </label>
    </>
  );
};
