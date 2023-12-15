import Markdown from '../../../components/markdown/Markdown';
import MasteryScale from './MasteryScale';
import { FlashcardType } from '../../flashcards/types';
import { CollapseContent, CollapseTrigger } from '@/components/ui/collapse';
import { flashcardApi } from '../../flashcards/api/index';

type StudyFlashcardProps = {
  flashcard: FlashcardType;
  handleStudiedCard: (id: number) => void;
};
export const StudyFlashcard = ({
  flashcard,
  handleStudiedCard,
}: StudyFlashcardProps) => {
  const handleSetMastery = async (mastery: number) => {
    let newMastery = flashcard.mastery_level + mastery;
    // dont allow mastery to go below 0 or above 100
    if (newMastery < 0) newMastery = 0;
    if (newMastery > 100) newMastery = 100;

    await flashcardApi.updateFlashcard(flashcard.id, {
      mastery_level: newMastery,
    });
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
        className='w-full list-disc'
        id={flashcard.id.toString()}
      >
        <div className='answer border bg-card p-4 rounded-md text-card-foreground'>
          <Markdown className=''>{flashcard.answer}</Markdown>
        </div>
        <MasteryScale onSetMastery={handleSetMastery} />
      </CollapseContent>
    </div>
  );
};
