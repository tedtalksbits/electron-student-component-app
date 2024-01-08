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
import { deckApi } from '../api';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { EmojiSelectorWithCategories } from '@/components/emoji-selector/EmojiSelectorWithCategories';
import { useToast } from '@/components/ui/use-toast';
import { LucideCheckCircle, LucideXOctagon, Trash2Icon } from 'lucide-react';
import { NativeDialog } from '@/components/ui/native-dialog';
import { addStudySession } from '@/features/study/api/studysessions';
import { getSessionId, setSessionId } from '@/utils/setSessionId';
import { useNavigate } from 'react-router-dom';
import { USER_ID } from '@/constants';
import { downloadOne } from '../utils/downloadJSON';

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
    study: {
      label: string;
      icon: string | React.ReactNode;
      onMutate?: React.Dispatch<React.SetStateAction<DeckType[]>>;
    };
    download: {
      label: string;
      icon: string | React.ReactNode;
    };
  };
};

export const DeckActions = ({ deck, actions }: DeckActionsProps) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(deck.image);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  const refetchDecksQuery = `SELECT * FROM decks ORDER BY updated_at DESC`;

  async function handleDelete() {
    const { data, error } = await deckApi.deleteDeck(
      deck.id,
      refetchDecksQuery
    );
    setShowDeleteDialog(false);
    if (error) {
      return toast({
        title: 'Error!',
        description: `Something went wrong: ${error}`,
        icon: <LucideXOctagon className='h-5 w-5 text-error' />,
      });
    }

    if (data) {
      actions.delete.onMutate(data);
      toast({
        title: 'Done!',
        description: `You have successfully deleted deck: ${deck.name}`,
        icon: <LucideCheckCircle className='h-5 w-5 text-success' />,
      });
    }
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string;
    if (!name) return;
    const update = {
      name,
      description,
      tags: tags ? tags : null,
      image,
    } as DeckType;

    const { data, error } = await deckApi.updateDeck(
      deck.id,
      update,
      refetchDecksQuery
    );
    if (error) {
      return toast({
        title: 'Error!',
        description: `Something went wrong: ${error}`,
        icon: <LucideXOctagon className='h-5 w-5 text-error' />,
      });
    }
    if (data) {
      actions.edit.onMutate(data);
      toast({
        title: 'Done!',
        description: `You have successfully updated deck: ${name}`,
        icon: <LucideCheckCircle className='h-5 w-5 text-success' />,
      });
    }
    setOpen(false);
    setImage('');
  };
  const navigate = useNavigate();

  const handleStudy = (id: number) => {
    if (!id) return alert('You need to add a deck with flashcards first!');
    addStudySession(
      {
        deck_id: Number(id),
        user_id: USER_ID,
        start_time: new Date(),
      },
      (sessionId) => {
        setSessionId(sessionId.toString());
        console.log(sessionId);
        console.log('session id set');
        console.log(getSessionId());
        navigate(`/decks/${id}/study`);
      }
    );
  };

  function handleShowDeleteDialog(): void {
    setShowDeleteDialog(true);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' className='w-fit h-fit p-1'>
              <DotsVerticalIcon className='h-5 w-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleStudy(deck.id)}>
              <span className='h-5 w-5 mr-1'>{actions.study.icon}</span>
              {actions.study.label}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <span className='h-5 w-5 mr-1'>{actions.edit.icon}</span>
                {actions.edit.label}
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => downloadOne(deck, deck.name)}>
              <span className='h-5 w-5 mr-1'>{actions.download.icon}</span>
              {actions.download.label}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleShowDeleteDialog}>
              <span className='h-5 w-5 mr-1'>{actions.delete.icon}</span>
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
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type='submit'>Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <NativeDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        dialogTitle={
          <div className='flex items-center text-2xl'>
            <Trash2Icon className='h-8 w-8 text-destructive' /> Are you sure?
          </div>
        }
        variant='medium'
      >
        <div>
          <div>
            <p>
              Delete:{' '}
              <span className='bg-secondary/50 border-secondary border font-bold rounded-md px-1'>
                {deck.name}
              </span>
              ?
            </p>
            <div className='flex justify-end gap-2 mt-8'>
              <Button
                variant='outline'
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button variant='destructive' onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </NativeDialog>
    </>
  );
};

const DeckImage = ({ image }: { image: string | null }) => {
  return (
    <>
      <Button variant='secondary' className='w-fit' type='button'>
        <Label htmlFor='updateDeckEmoji'>Deck Icon</Label>
      </Button>
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
