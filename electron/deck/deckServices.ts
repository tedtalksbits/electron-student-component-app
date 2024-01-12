import { DeckRespository } from './DeckRepository';

export const deckRepository = new DeckRespository();

export const getDecks = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof deckRepository.getAll>
) => deckRepository.getAll(...args);

export const createDeck = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof deckRepository.createOne>
) => deckRepository.createOne(...args);

export const createDecks = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof deckRepository.createMany>
) => deckRepository.createMany(...args);

export const deleteDeck = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof deckRepository.deleteOne>
) => deckRepository.deleteOne(...args);

export const updateDeck = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof deckRepository.updateOne>
) => deckRepository.updateOne(...args);

export const getDeckById = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof deckRepository.getOne>
) => deckRepository.getOne(...args);

export const getLowestMasteredDecks = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof deckRepository.getByLowestMastered>
) => deckRepository.getByLowestMastered(...args);

export const getLastStudiedDeck = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof deckRepository.getLastStudiedDeck>
) => deckRepository.getLastStudiedDeck(...args);
