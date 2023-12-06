import Markdown from '../../../components/markdown/Markdown';
import MasteryScale from './MasteryScale';
import { FlashcardType } from '../../flashcards/types';
import { updateFlashcard } from '../../flashcards/api/flashcards';
import { CollapseContent, CollapseTrigger } from '@/components/ui/collapse';

type StudyFlashcardProps = {
  flashcard: FlashcardType;
  handleStudiedCard: (id: number) => void;
};
export const StudyFlashcard = ({
  flashcard,
  handleStudiedCard,
}: StudyFlashcardProps) => {
  const handleSetMastery = (mastery: number) => {
    let newMastery = flashcard.mastery_level + mastery;
    // dont allow mastery to go below 0 or above 100
    if (newMastery < 0) newMastery = 0;
    if (newMastery > 100) newMastery = 100;

    updateFlashcard(flashcard.id, { mastery_level: newMastery });
  };
  return (
    <div
      onClick={() => handleStudiedCard(flashcard.id)}
      className='my-4 w-full'
    >
      <CollapseTrigger
        className='font-medium text-lg bg-transparent'
        aria-labelledby={flashcard.id.toString()}
        variant='ghost'
      >
        <Markdown>{flashcard.question}</Markdown>
      </CollapseTrigger>
      <CollapseContent
        className='w-full bg-card p-4 rounded-md text-card-foreground list-disc'
        id={flashcard.id.toString()}
      >
        <Markdown className=''>{flashcard.answer}</Markdown>
        <MasteryScale onSetMastery={handleSetMastery} />
      </CollapseContent>
    </div>
  );
};
