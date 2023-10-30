import Markdown from '../../../components/markdown/Markdown';
import MasteryScale from './MasteryScale';
import { FlashcardType } from '../../flashcards/types';
import { updateFlashcard } from '../../flashcards/api/flashcards';
import { CollapseContent, CollapseTrigger } from '@/components/ui/collapse';

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
    <div onClick={() => handleStudiedCard(flashcard.id)} className='my-4'>
      <CollapseTrigger
        className='font-medium'
        aria-labelledby={flashcard.id.toString()}
      >
        <Markdown>{flashcard.question}</Markdown>
      </CollapseTrigger>
      <CollapseContent id={flashcard.id.toString()}>
        <Markdown className=''>{flashcard.answer}</Markdown>
        <MasteryScale onSetMastery={handleSetMastery} />
      </CollapseContent>
    </div>
  );
};
