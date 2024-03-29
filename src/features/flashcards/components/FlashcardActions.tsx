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
import { FlashcardDTO, FlashcardType } from '../types';
import { useState } from 'react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { LucideCheckCircle, LucideXOctagon, Trash2Icon } from 'lucide-react';
import { NativeDialog } from '@/components/ui/native-dialog';
import { flashcardApi } from '../api';
import { useToast } from '@/components/ui/use-toast';
import { downloadOne } from '../utils/downloadJSON';

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
    download: {
      label: string;
      icon: string | React.ReactNode;
    };
  };
};

export const FlashcardActions = ({
  flashcard,
  actions,
}: FlashcardActionsProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const refetchFlashcardsByDeckIdQuery = `SELECT * FROM flashcards WHERE deck_id = ${flashcard.deck_id}`;

  async function handleDelete() {
    const { data, error } = await flashcardApi.deleteFlashcard(
      flashcard.id,
      refetchFlashcardsByDeckIdQuery
    );
    setShowDeleteDialog(false);
    if (error) {
      return toast({
        title: 'Error!',
        description: `Something went wrong: ${error}`,
        icon: <LucideXOctagon className='h-5 w-5 text-destructive' />,
      });
    }

    if (data) {
      actions.delete.onMutate(data);
      toast({
        title: 'Success!',
        description: `Flashcard deleted successfully`,
        icon: <LucideCheckCircle className='h-5 w-5 text-success' />,
      });
    }
  }

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  function handleShowDeleteDialog(): void {
    setShowDeleteDialog(true);
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    const hint = formData.get('hint') as string;
    const tags = formData.get('tags') as string;
    const update = {
      question,
      answer,
      hint,
      tags,
    } as Partial<FlashcardDTO>;

    const { data, error } = await flashcardApi.updateFlashcard(
      flashcard.id,
      update,
      refetchFlashcardsByDeckIdQuery
    );

    if (error) {
      return toast({
        title: 'Error!',
        description: `Something went wrong: ${error}`,
        icon: <LucideXOctagon className='h-5 w-5 text-destructive' />,
      });
    }

    if (data) {
      actions.edit.onMutate(data);
      toast({
        title: 'Success!',
        description: `Flashcard updated successfully`,
        icon: <LucideCheckCircle className='h-5 w-5 text-success' />,
      });
    }
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
          <DropdownMenuItem onClick={() => downloadOne(flashcard, 'flashcard')}>
            <span className='h-5 w-5 mr-1'>{actions.download.icon}</span>{' '}
            {actions.download.label}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleShowDeleteDialog}>
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
              Delete{' '}
              <span className='bg-secondary/50 border-secondary border font-bold rounded-md px-1'>
                {flashcard.question}
              </span>
              ?
            </p>
            <div className='flex justify-end gap-2 mt-8'>
              <Button
                variant='outline'
                onClick={() => setShowDeleteDialog(false)}
                type='button'
              >
                Cancel
              </Button>
              <Button
                type='button'
                variant='destructive'
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </NativeDialog>
    </Dialog>
  );
};
