import { FlashcardType } from '../../flashcards/types';
import {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type StudyCardsPaginationProps = {
  flashcards: FlashcardType[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};
export const StudyCardsPagination = ({
  flashcards,
  currentIndex,
  setCurrentIndex,
}: StudyCardsPaginationProps) => {
  const handleSetIndex = (index: number) => {
    if (index < 0 || index > flashcards.length - 1) {
      return;
    }
    setCurrentIndex(index);
  };

  function hidePaginationItem(index: number) {
    // show first 3 items
    if (index < 3) {
      return false;
    }

    // show last 3 items
    if (index > flashcards.length - 3) {
      return false;
    }

    // show items around current index
    if (index + 3 > currentIndex && index - 3 < currentIndex) {
      return false;
    }

    return true;
  }

  return (
    <Pagination className='pagination'>
      <PaginationContent className='pagination-content list-none [&>*]:cursor-pointer'>
        <PaginationPrevious
          className={`${
            currentIndex === 0 &&
            'opacity-50 cursor-not-allowed hover:bg-transparent'
          }`}
          onClick={() => handleSetIndex(currentIndex - 1)}
        />

        {flashcards.map((_, index) => (
          <div key={index}>
            {hidePaginationItem(index) ? (
              <span className='w-1 h-1 bg-foreground/20 rounded block'></span>
            ) : (
              <PaginationLink
                className={`pagination-item`}
                onClick={() => handleSetIndex(index)}
                isActive={index === currentIndex}
              >
                {index + 1}
              </PaginationLink>
            )}
          </div>
        ))}

        <PaginationNext
          className={`${
            currentIndex === flashcards.length - 1 &&
            'opacity-50 cursor-not-allowed hover:bg-transparent'
          }`}
          onClick={() => handleSetIndex(currentIndex + 1)}
        />
      </PaginationContent>
    </Pagination>
  );
};
