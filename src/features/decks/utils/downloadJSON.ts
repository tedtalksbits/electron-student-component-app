import { DownloadService } from '@/features/common/types/DownloadService';
import { DeckType } from '../types';

const deckDownloader: DownloadService<DeckType> = {
  download: function (
    data: DeckType[] | Partial<DeckType>[],
    fileName: string
  ): void {
    const element = document.createElement('a');
    const sanitizedDecks = data.map((deck) => {
      const { id, created_at, updated_at, user_id, ...rest } = deck;
      return rest;
    });
    const file = new Blob([JSON.stringify(sanitizedDecks)], {
      type: 'application/json',
    });

    element.href = URL.createObjectURL(file);
    element.download = new Date().toLocaleDateString() + fileName + '.json';
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
  },
  downloadOne: function (
    data: DeckType | Partial<DeckType>,
    fileName: string
  ): void {
    const element = document.createElement('a');
    const file = new Blob(
      [
        JSON.stringify([
          {
            name: data.name,
            description: data.description,
            tags: data.tags,
            image: data.image,
            visibility: data.visibility,
          },
        ]),
      ],
      {
        type: 'application/json',
      }
    );

    element.href = URL.createObjectURL(file);
    element.download = new Date().toLocaleDateString() + fileName + '.json';

    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
  },
};

export const { download, downloadOne } = deckDownloader;
