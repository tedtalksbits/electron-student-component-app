import React from 'react';
import { EmojiCategory, emojiCategories } from '@/constants/emoji-categories';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Maximize, XIcon } from 'lucide-react';
import { Label } from '../ui/label';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';
const filterEmojiData = (data: any, search: string) => {
  const flattenedEmoji = Object.values(emojiCategories.emojis).reduce(
    (acc, category) => acc.concat(category),
    []
  );

  return search
    ? flattenedEmoji.filter((emoji) =>
        emoji.name.toLowerCase().includes(search.toLowerCase())
      )
    : data;
};

export interface EmojiSelectorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSelectEmoji: (emoji: string | null) => void;
  labelKey: string;
}
export const EmojiSelectorWithCategories = React.forwardRef<
  HTMLDivElement,
  EmojiSelectorProps
>(({ className, onSelectEmoji, labelKey, ...props }, ref) => {
  if (!labelKey)
    console.warn('EmojiSelectorWithCategories: key prop is required');
  const [page, setPage] = React.useState<EmojiCategory>('Smileys & Emotion');
  const keys = Object.keys(emojiCategories.emojis) as EmojiCategory[];
  const data = emojiCategories.emojis[page];
  const [search, setSearch] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);
  const [favorites, setFavorites] = React.useState<string[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  const [showPanel, setShowPanel] = React.useState(false);

  function handleAddToFavorites(emoji: string) {
    const MAX_FAVORITES = 10;
    const NEXT_AVAILABLE_INDEX = favorites.length % MAX_FAVORITES;
    console.log(NEXT_AVAILABLE_INDEX);

    favorites.splice(NEXT_AVAILABLE_INDEX, 1, emoji);
    if (favorites.length >= MAX_FAVORITES) {
      favorites.pop();
    }

    const newFavorites = Array.from(new Set([emoji, ...favorites]));

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  }

  const handleOnSelect = (emoji: string) => {
    onSelectEmoji(emoji);
    handleAddToFavorites(emoji);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    setFilteredData(filterEmojiData(data, search));
  }, [search, data]);

  return (
    <div {...props} className={cn('relative', className)} ref={ref}>
      <motion.div layout key='emojies'>
        <input
          type='checkbox'
          name=''
          id={labelKey || 'emoji-selector'}
          className='appearance-none absolute'
          onChange={() => setShowPanel(!showPanel)}
          checked={showPanel}
        />
        <div className='controls flex my-2'>
          <Label htmlFor={labelKey || 'emojie-select'} className='text-lg'>
            Emojis
          </Label>
          <Button
            variant='outline'
            className='rounded-full p-1 w-fit h-fit ml-auto'
            onClick={() => setShowPanel(!showPanel)}
          >
            {showPanel ? (
              <XIcon className='h-4 w-4' />
            ) : (
              <Maximize className='h-4 w-4' />
            )}
          </Button>
        </div>
        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              key='content'
              className='flex flex-col border rounded-md p-2'
            >
              <header className='flex overflow-x-scroll snap-x snap-mandatory gap-3 border-b pb-2 reset-scrollbar'>
                {keys.map((key) => (
                  <p
                    key={key}
                    className={`whitespace-nowrap cursor-pointer select-none opca ${
                      page === key && 'text-primary border-b-2 border-primary'
                    }`}
                    onClick={() => setPage(key as EmojiCategory)}
                  >
                    {key}
                  </p>
                ))}
              </header>
              <Input
                type='search'
                placeholder='Search'
                value={search}
                onChange={handleSearch}
              />
              <div className='grid grid-cols-12 gap-2 h-32 overflow-y-auto p-2'>
                {filteredData.map((key) => (
                  <button
                    type='button'
                    key={key.name}
                    onClick={() => handleOnSelect(key.emoji)}
                    className=' hover:bg-secondary w-fit h-fit rounded-md hover:outline cursor-pointer'
                  >
                    {key.emoji}
                  </button>
                ))}
              </div>
              <div className='flex gap-2'>
                {favorites.map((emoji) => (
                  <div
                    key={emoji}
                    className=' hover:bg-secondary w-fit rounded-md hover:outline cursor-pointer'
                    onClick={() => onSelectEmoji(emoji)}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
});
