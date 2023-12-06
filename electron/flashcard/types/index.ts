import { FlashcardDTO, FlashcardType } from '@/features/flashcards/types';
import { ServiceReturnType } from '../../config/types/service';

type GetCollectionArgs = [id: number, limit?: number];

type CreateFlashcardFunction = (
  _event: Electron.IpcMainInvokeEvent,
  flashcard: Partial<FlashcardDTO>,
  refetchQuery?: string
) => ServiceReturnType<FlashcardType[]>;

type CreateFlashcardWithoutEvent = (
  flashcard: Partial<FlashcardDTO>,
  refetchQuery?: string
) => ServiceReturnType<FlashcardType[]>;

type DeleteFlashcardFunction = (
  _event: Electron.IpcMainInvokeEvent,
  flashcardId: number,
  refetchQuery?: string
) => ServiceReturnType<FlashcardType[]>;

type DeleteFlashcardWithoutEvent = (
  flashcardId: number,
  refetchQuery?: string
) => ServiceReturnType<FlashcardType[]>;

type UpdateFlashcardFunction = (
  _event: Electron.IpcMainInvokeEvent,
  flashcardId: number,
  data: Partial<FlashcardDTO>,
  refetchQuery?: string
) => ServiceReturnType<FlashcardType[]>;

type UpdateFlashcardWithoutEvent = (
  flashcardId: number,
  data: Partial<FlashcardDTO>,
  refetchQuery?: string
) => ServiceReturnType<FlashcardType[]>;

type GetFlashcardsByDeckIdFunction = (
  _event: Electron.IpcMainInvokeEvent,
  deckId: number
) => ServiceReturnType<FlashcardType[]>;

type GetFlashcardsByDeckIdWithoutEvent = (
  deckId: number
) => ServiceReturnType<FlashcardType[]>;

type GetRandomFlashcardsFunction = (
  _event: Electron.IpcMainInvokeEvent,
  deckId: number
) => ServiceReturnType<FlashcardType[]>;

export interface FlashcardServices {
  createFlashcard: CreateFlashcardFunction;
  deleteFlashcard: DeleteFlashcardFunction;
  updateFlashcard: UpdateFlashcardFunction;
  getFlashcardsByDeckId: GetFlashcardsByDeckIdFunction;
  getRandomFlashcards: GetRandomFlashcardsFunction;
}

export interface FlashcardServicesMain {
  createFlashcard: CreateFlashcardWithoutEvent;
  deleteFlashcard: DeleteFlashcardWithoutEvent;
  updateFlashcard: UpdateFlashcardWithoutEvent;
  getFlashcardsByDeckId: GetFlashcardsByDeckIdWithoutEvent;
  getRandomFlashcards: GetFlashcardsByDeckIdWithoutEvent;
}

// // export type FlashcardServicesMain = {
// //   [K in keyof FlashcardServices]: (
// //     ...args: Parameters<FlashcardServices[K]>
// //   ) => ReturnType<FlashcardServices[K]>;
// // };
