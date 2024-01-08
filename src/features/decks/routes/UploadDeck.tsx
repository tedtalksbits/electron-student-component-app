import {
  OnSubmitFn,
  OnValidateFn,
  UploadJSON,
} from '@/features/common/UploadJSON';
import { DeckType } from '../types';
import { sanitizeDeckJSON } from '../utils/sanitizeDeckJSON';
import { deckApi } from '../api';
import { useToast } from '@/components/ui/use-toast';
import { LucideCheckCircle, LucideXOctagon } from 'lucide-react';

export const UploadDeck = () => {
  const { toast } = useToast();
  const onSubmit: OnSubmitFn<DeckType> = async (data) => {
    console.log(data);
    const { error } = await deckApi.createDecks(data);
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

  const onValidate: OnValidateFn<DeckType> = (data) => {
    const res = sanitizeDeckJSON(data);
    return {
      ...res,
      validatedData: res.data,
    };
  };
  return (
    <div>
      UploadDeck
      <UploadJSON onSubmit={onSubmit} onValidate={onValidate} />
    </div>
  );
};
