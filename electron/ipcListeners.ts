import { deckListeners } from './deck/deckListeners';
import { flashcardListeners } from './flashcard/flashcardListeners';

export const setUpListeners = () => {
  flashcardListeners();
  deckListeners();
};
