import { deckListeners } from './deck/deckListeners';
import { flashcardListeners } from './flashcard/flashcardListeners';
import { userPreferenceListeners } from './preference/preferenceListeners';
import { systemListeners } from './system/systemListeners';
import { userListeners } from './user/userListeners';

export const setUpListeners = () => {
  flashcardListeners();
  deckListeners();
  userListeners();
  userPreferenceListeners();
  systemListeners();
};
