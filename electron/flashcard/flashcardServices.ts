import { FlashcardType } from '@/features/flashcards/types';

import { FlashcardRepository } from './FlashcardRepository';

const flashcardRepository = new FlashcardRepository();

export const getFlashcardsByDeckId = async (
  _event: Electron.IpcMainInvokeEvent,
  deckId: number
) => flashcardRepository.getFlashcardsByDeckId(deckId);

export const createFlashcard = async (
  _event: Electron.IpcMainInvokeEvent,
  flashcard: Partial<FlashcardType>,
  refetchQuery?: string
) => flashcardRepository.createOne(flashcard, refetchQuery);

export const deleteFlashcard = async (
  _event: Electron.IpcMainInvokeEvent,
  flashcardId: number,
  refetchQuery?: string
) => flashcardRepository.deleteOne(flashcardId, refetchQuery);

export const updateFlashcard = async (
  _event: Electron.IpcMainInvokeEvent,
  flashcardId: number,
  data: Partial<FlashcardType>,
  refetchQuery?: string
) => flashcardRepository.updateOne(flashcardId, data, refetchQuery);

export const getRandomFlashcards = async (
  _event: Electron.IpcMainInvokeEvent,
  deckId: number
) => flashcardRepository.getRandomFlashcardsByDeckId(deckId);
