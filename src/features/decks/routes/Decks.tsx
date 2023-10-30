import { useCallback, useEffect, useRef, useState } from 'react';
import { DeckType } from '../types';
import { fetchDecks } from '../api';
import { Deck, AddDeckDialogForm } from '../components';
import { AllStudyData } from '@/features/study-analytics/components/AllStudyData';
import { Input } from '@/components/ui/input';
import { useShortcuts } from '@/hooks/useShortcuts';

function Decks() {
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    fetchDecks<DeckType>(setDecks);
  }, []);

  const filteredDecks = decks.filter((deck) => {
    const nameMatch = deck.name.toLowerCase().includes(search.toLowerCase());
    const descriptionMatch = deck.description
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const tagsMatch = deck.tags?.toLowerCase().includes(search.toLowerCase());
    return nameMatch || descriptionMatch || tagsMatch;
  });

  const handleSearchShortcut = useCallback((e: KeyboardEvent) => {
    if (e.key === 'f' && e.ctrlKey) {
      e.preventDefault();
      setSearch('');
      inputRef.current?.focus();
    }
  }, []);

  useShortcuts(handleSearchShortcut);

  if (!decks || decks.length === 0) return <div>loading...</div>;

  return (
    <div>
      <Input
        type='search'
        placeholder='Search'
        onChange={(e) => setSearch(e.target.value)}
        value={search || ''}
        ref={inputRef}
      />
      <div className='flex items-center justify-between my-8'>
        <h3 className='text-2xl font-bold'>Your Decks</h3>
        <AddDeckDialogForm onMutation={setDecks} />
      </div>
      <div className='grid md:grid-cols-12 gap-2'>
        {filteredDecks.map((deck) => (
          <Deck
            key={deck.id}
            deck={deck}
            setDecks={setDecks}
            setSearch={setSearch}
          />
        ))}
      </div>
      <hr className='my-10' />
      <AllStudyData />
    </div>
  );
}

export default Decks;
