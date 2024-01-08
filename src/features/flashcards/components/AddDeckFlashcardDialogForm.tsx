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
import React, { useState } from 'react';
import { FlashcardDTO, FlashcardType } from '../types';
import { USER_ID } from '@/constants';
import { useToast } from '@/components/ui/use-toast';
import { LucideCheckCircle, LucideXOctagon, Plus } from 'lucide-react';
import { flashcardApi } from '../api';
import { DeckType } from '@/features/decks/types';
import { PillInput } from '@/components/ui/pill-input';

type AddFlashCardProps = {
  onMutation: React.Dispatch<React.SetStateAction<FlashcardType[]>>;
  deck: DeckType;
};
export const AddDeckFlashcardDialogForm = ({
  onMutation,
  deck,
}: AddFlashCardProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState('');
  const [suggestTags, setSuggestTags] = useState<string[] | undefined>([
    'computer',
    'programming',
    'javascript',
    'react',
  ]);
  const itemsInput = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  function biggestWords() {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    const hint = formData.get('hint') as string;
    if (!question && !answer && !hint) return;
    const removeRegex = /[^a-zA-Z ]/g;
    const questionArr = question
      .toLowerCase()
      .replace(removeRegex, '')
      .split(' ');
    const answerArr = answer.toLowerCase().replace(removeRegex, '').split(' ');
    const hintArr = hint.toLowerCase().replace(removeRegex, '').split(' ');

    const allWords = [...questionArr, ...answerArr, ...hintArr];
    if (allWords.length === 0) return;

    // find the 3 biggest words
    const biggestWords = allWords
      .sort((a, b) => b.length - a.length)
      .slice(0, 8);
    if (biggestWords.length === 0) return;

    const uniqueWords = [...new Set(biggestWords)];
    console.log('uniqueWords', uniqueWords);

    setSuggestTags(uniqueWords);
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems(e.target.value);
  };
  const handleAddItem = (item: string) => {
    console.log('item', item);
    if (items === '') {
      setItems(item);
    } else {
      setItems(items + `, ${item}`);
    }
    itemsInput.current?.focus();
  };
  const handleRemoveItem = (item: string) => {
    const itemsArr = items.split(', ');
    const newItemsArr = itemsArr.filter((t) => t !== item);
    setItems(newItemsArr.join(', '));
  };
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;
    const hint = formData.get('hint') as string;
    const tags = formData.get('tags') as string;
    const type = formData.get('type') as string;

    if (!question || !answer) return console.log('question or answer is null');
    const newFlashcard = {
      question,
      answer,
      deck_id: Number(deck.id),
      user_id: USER_ID,
      audio: null,
      image: null,
      tags: tags ? tags : null,
      hint: hint ? hint : null,
      type,
      video: null,
    } as Partial<FlashcardDTO>;

    const refetchQuery = `SELECT * FROM flashcards WHERE deck_id = ${deck.id}`;
    const { data, error } = await flashcardApi.createFlashcard(
      newFlashcard,
      refetchQuery
    );
    if (error) {
      return toast({
        title: 'Done!',
        description: `Something went wrong: ${error}`,
        icon: <LucideXOctagon className='h-5 w-5 text-destructive' />,
      });
    }
    if (data) {
      onMutation(data);
      toast({
        title: 'Done!',
        description: `You have successfully added a flashcard`,
        icon: <LucideCheckCircle className='h-5 w-5 text-success' />,
      });
    }
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='h-4 w-4 mr-1' />
          New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Flash Card</DialogTitle>
        <form onSubmit={handleSubmit} className='form' ref={formRef}>
          <div className='form-group'>
            <Label htmlFor='question'>Question</Label>
            <Textarea
              autoFocus
              name='question'
              id='question'
              placeholder='question'
              cols={30}
              rows={10}
              onBlur={biggestWords}
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
              onBlur={biggestWords}
              required
            />
          </div>

          <div className='form-group'>
            <Label htmlFor='hint'>Hint</Label>
            <Input
              type='text'
              name='hint'
              id='hint'
              placeholder='hint'
              onBlur={biggestWords}
            />
          </div>
          <div className='form-group'>
            <Label htmlFor='tags'>Tags</Label>
            <Input type='text' name='tags' id='tags' placeholder='tags' />
          </div>
          <div className='form-group'>
            <Label htmlFor='custom-tags'>Test</Label>
            <PillInput
              className='mt-2'
              items={items}
              onAdd={handleAddItem}
              onRemove={handleRemoveItem}
              id='custom-tags'
              placeholder='custom tags'
              onChange={handleInputChange}
              ref={itemsInput}
              value={items}
              defaultItems={suggestTags}
            />
          </div>
          <div className='form-footer'>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
