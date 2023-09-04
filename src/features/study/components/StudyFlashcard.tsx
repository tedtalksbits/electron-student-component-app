import Markdown from '../../../components/markdown/Markdown';
import MasteryScale from './MasteryScale';
import { FlashcardType } from '../../flashcards/types';
import { updateFlashcard } from '../../flashcards/api/flashcards';

type StudyFlashcardProps = {
  flashcard: FlashcardType;
  handleStudiedCard: (id: number) => void;
  setFlashcards: React.Dispatch<React.SetStateAction<FlashcardType[]>>;
};
export const StudyFlashcard = ({
  flashcard,
  handleStudiedCard,
  setFlashcards,
}: StudyFlashcardProps) => {
  const handleSetMastery = (mastery: number) => {
    updateFlashcard(
      flashcard.id,
      { mastery_level: flashcard.mastery_level + mastery },
      setFlashcards,
      'SELECT * FROM flashcards WHERE deck_id = ' + flashcard.deck_id
    );
  };
  return (
    <details onClick={() => handleStudiedCard(flashcard.id)} className='my-4'>
      <summary className='cursor-pointer font-medium'>
        <Markdown>{flashcard.question}</Markdown>
      </summary>
      <Markdown className=''>{flashcard.answer}</Markdown>
      <MasteryScale onSetMastery={handleSetMastery} />
    </details>
  );
};
