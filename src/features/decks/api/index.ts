type ResponseData<T> = {
  data: T;
  error?: string;
};

/**
 *
 *
 * @param deckId
 * @param setFlashcards- React hook state setter
 * @returns void
 *
 *
 * This function is used to fetch flashcards by deckId.
 * keys: 'get-flashcards-by-deckId' and 'get-flashcards-by-deckId-response'
 *
 *
 * */

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

/**
 *
 *
 * @param deckId
 * @param setFlashcards- React hook state setter
 * @param refetchQuery - string: SQL query to refetch data after mutation
 * @returns void
 *
 * This function is used to delete a flashcard by id.
 * keys: 'delete-flashcard' and 'delete-flashcard-response'
 *
 *
 * */

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

/**
 *
 *
 * @param flashcardId
 * @param setFlashcards- React hook state setter
 * @param refetchQuery - string: SQL query to refetch data after mutation
 * @returns void
 * This function is used to delete a flashcard by id.
 * keys: 'delete-flashcard' and 'delete-flashcard-response'
 *
 *
 * */

export function updateDeck<T>(
  deckId: number,
  data: unknown,
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

/**
 *
 *
 * @param flashcardId
 * @param setFlashcards- React hook state setter
 * @param refetchQuery - string: SQL query to refetch data after mutation
 * @returns void
 * This function is used to delete a flashcard by id.
 *
 *
 * */

export function createDeck<T>(
  data: unknown,
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
