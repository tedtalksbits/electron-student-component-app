import {
  UploadJSON,
  OnSubmitFn,
  OnValidateFn,
} from '@/features/common/UploadJSON';
import { FlashcardType } from '../types';
import { sanitizeFlashcardJSON } from '../utils/sanitizeJSON';
import { Link, useLocation, useParams } from 'react-router-dom';
import { USER_ID } from '@/constants';
import { flashcardApi } from '../api';
import { DeckType } from '@/features/decks/types';
import { useToast } from '@/components/ui/use-toast';
import { LucideCheckCircle, LucideXOctagon } from 'lucide-react';

export const UploadFlashcards = () => {
  const { id } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  const state = location.state as { deck: DeckType };

  const onSubmit: OnSubmitFn<FlashcardType> = async (data) => {
    console.log(data);
    const res = data.map(addPropsForFlashcard);
    console.log(res);
    const { error } = await flashcardApi.createFlashcards(res);
    if (error) {
      console.log(error);
      return toast({
        title: 'Error',
        description: error,
        icon: <LucideXOctagon className='h-5 w-5 text-error' />,
      });
    }
    toast({
      title: 'Success',
      description: 'Flashcards added successfully',
      icon: <LucideCheckCircle className='h-5 w-5 text-success' />,
    });
  };

  const addPropsForFlashcard = (
    data: FlashcardType | Partial<FlashcardType>
  ) => {
    return {
      ...data,
      deck_id: Number(id),
      user_id: Number(USER_ID),
    };
  };

  const onValidate: OnValidateFn<FlashcardType> = (data) => {
    console.log(data);
    const res = sanitizeFlashcardJSON(data);
    return {
      ...res,
      validatedData: res.data,
    };
  };
  return (
    <div>
      {state && (
        <Link to={`/decks/${state.deck.id}/flashcards`}>{state.deck.name}</Link>
      )}
      <UploadJSON onSubmit={onSubmit} onValidate={onValidate} />
    </div>
  );
};
