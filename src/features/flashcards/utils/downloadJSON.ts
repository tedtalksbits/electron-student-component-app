import { DownloadService } from '@/features/common/types/DownloadService';
import { FlashcardType } from '../types';

export const fCDownloader: DownloadService<FlashcardType> = {
  download: (flashcards: FlashcardType[] | Partial<FlashcardType>[]) => {
    const element = document.createElement('a');
    const basicCards = flashcards.map((f) => {
      const { id, updated_at, created_at, user_id, deck_id, ...rest } = f;
      return rest;
    });
    const file = new Blob([JSON.stringify(basicCards)], {
      type: 'application/json',
    });

    element.href = URL.createObjectURL(file);
    element.download = new Date().toLocaleDateString() + '-flashcards.json';
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
  },

  downloadOne: (flashcard: FlashcardType | Partial<FlashcardType>) => {
    const { id, updated_at, created_at, user_id, deck_id, ...rest } = flashcard;
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify([rest])], {
      type: 'application/json',
    });

    element.href = URL.createObjectURL(file);
    element.download = new Date().toLocaleDateString() + '-flashcard.json';
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
  },
};

export const { download, downloadOne } = fCDownloader;
