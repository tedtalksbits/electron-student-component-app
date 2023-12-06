import { DECK_CHANNELS } from '../../../../electron/config/channels';
import { DeckType, DeckTypeWithAvgMastery } from '../types/index';

type ResponseData<T> = {
  data: T;
  error?: string;
};

export function fetchDecks<T>(
  setDecks: React.Dispatch<React.SetStateAction<T[]>>
) {
  window.electron.ipcRenderer.sendMessage('get-decks', 'decks');
  window.electron.ipcRenderer.once('get-decks-response', (args) => {
    const response = args as ResponseData<T[]>;
    if (response.error) {
      alert(response.error);
      return;
    }

    setDecks(response.data);
  });
}

export function fetchDeckById<T>(
  deckId: number,
  setDecks: React.Dispatch<React.SetStateAction<T | null>>
) {
  window.electron.ipcRenderer.sendMessage('get-deck-by-id', deckId);
  window.electron.ipcRenderer.once('get-deck-by-id-response', (args) => {
    const response = args as ResponseData<T>;
    if (response.error) {
      alert(response.error);
      return;
    }

    setDecks(response.data);
  });
}

export function deleteDeck<T>(
  deckId: number,
  setDecks: React.Dispatch<React.SetStateAction<T[]>>,
  refetchQuery: string
) {
  window.electron.ipcRenderer.sendMessage('delete-deck', deckId, refetchQuery);
  window.electron.ipcRenderer.once('delete-deck-response', (args) => {
    const response = args as ResponseData<T[]>;
    if (response.error) {
      alert(response.error);
      return;
    }

    setDecks(response.data);
  });
}

export function updateDeck<T>(
  deckId: number,
  data: Partial<T>,
  setDecks: React.Dispatch<React.SetStateAction<T[]>>,
  refetchQuery: string
) {
  window.electron.ipcRenderer.sendMessage(
    'update-deck',
    deckId,
    data,
    refetchQuery
  );
  window.electron.ipcRenderer.once('update-deck-response', (args) => {
    const response = args as ResponseData<T[]>;
    if (response.error) {
      alert(response.error);
      return;
    }

    setDecks(response.data);
  });
}

export function createDeck<T>(
  data: Partial<T>,
  setDecks: React.Dispatch<React.SetStateAction<T[]>>,
  refetchQuery: string
) {
  window.electron.ipcRenderer.sendMessage('create-deck', data, refetchQuery);
  window.electron.ipcRenderer.once('create-deck-response', (args) => {
    const response = args as ResponseData<T[]>;
    if (response.error) {
      alert(response.error);
      return;
    }

    setDecks(response.data);
  });
}

export async function fetchDecksByAvgMastery(
  userId: number,
  setDecks: React.Dispatch<React.SetStateAction<DeckTypeWithAvgMastery[]>>
) {
  try {
    const res = await window.electron.ipcRenderer.deck.getByAvgMastery(userId);
    setDecks(res);
  } catch (error) {
    console.error(error);
  }
}
