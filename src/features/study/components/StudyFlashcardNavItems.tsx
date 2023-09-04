import { FlashcardType } from '../../flashcards/types';

type StudyFlashcardNavItemsProps = {
  flashcards: FlashcardType[];
  currentFlashcardIndex: number;
  navItemClickHandler: (index: number) => void;
};
export const StudyFlashcardNavItems = ({
  flashcards,
  currentFlashcardIndex,
  navItemClickHandler,
}: StudyFlashcardNavItemsProps) => {
  return (
    <div>
      {flashcards.map((_, index) => (
        <span
          onClick={() => navItemClickHandler(index)}
          key={index}
          className={`study-item-nav-item ${
            index === currentFlashcardIndex ? 'bg-primary' : 'bg-foreground/50'
          }`}
        ></span>
      ))}
    </div>
  );
};
