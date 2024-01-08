const getDecks = async (
  ...args: Parameters<typeof window.electron.ipcRenderer.deck.getDecks>
) => await window.electron.ipcRenderer.deck.getDecks(...args);

const getDeckById = async (
  ...args: Parameters<typeof window.electron.ipcRenderer.deck.getDeckById>
) => await window.electron.ipcRenderer.deck.getDeckById(...args);

const createDeck = async (
  ...args: Parameters<typeof window.electron.ipcRenderer.deck.createDeck>
) => await window.electron.ipcRenderer.deck.createDeck(...args);

const createDecks = async (
  ...args: Parameters<typeof window.electron.ipcRenderer.deck.createDecks>
) => await window.electron.ipcRenderer.deck.createDecks(...args);

const updateDeck = async (
  ...args: Parameters<typeof window.electron.ipcRenderer.deck.updateDeck>
) => await window.electron.ipcRenderer.deck.updateDeck(...args);

const deleteDeck = async (
  ...args: Parameters<typeof window.electron.ipcRenderer.deck.deleteDeck>
) => await window.electron.ipcRenderer.deck.deleteDeck(...args);

const getLowestMasteredDecks = async (
  ...args: Parameters<
    typeof window.electron.ipcRenderer.deck.getLowestMasteredDecks
  >
) => await window.electron.ipcRenderer.deck.getLowestMasteredDecks(...args);

export const deckApi = {
  getDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck,
  getLowestMasteredDecks,
  createDecks,
};
