import React from 'react';
import { DeckType } from '../types';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { DeckActions } from '.';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type DeckProps = {
  deck: DeckType;
  setDecks: React.Dispatch<React.SetStateAction<DeckType[]>>;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
};

export const DeckCard = ({ deck, setDecks, setSearch }: DeckProps) => {
  return (
    <Card className='col-span-3 border-none flex flex-col'>
      <CardHeader className='flex items-start gap-2 flex-row'>
        <div>
          {deck.image && <span>{deck.image}</span>}
          <h2
            className='hover:text-primary text-xl font-medium underline'
            title={deck.name}
          >
            <Link to={`/decks/${deck.id}/flashcards`}>{deck.name}</Link>
          </h2>
          <p className='text-foreground/50'>{deck.description}</p>
        </div>
        <header className='ml-auto'>
          <DeckActions
            deck={deck}
            actions={{
              delete: {
                icon: <TrashIcon />,
                label: 'Delete',
                onMutate: setDecks,
              },
              edit: {
                icon: <PencilIcon />,
                label: 'Edit',
                onMutate: setDecks,
              },
            }}
          />
        </header>
      </CardHeader>
      <CardContent className='mt-auto'>
        <div className='flex gap-1 my-2 overflow-x-auto snap-x scroll-smooth snap-mandatory'>
          {deck.tags &&
            deck.tags.split(',').map((tag, i) => (
              <Badge
                key={i}
                variant='outline'
                className='whitespace-nowrap text-[10px] cursor-pointer'
                onClick={() => setSearch && setSearch(tag)}
              >
                {tag}
              </Badge>
            ))}
        </div>
        <small className='font-light text-xs mt-auto text-foreground/50'>
          Last updated: {new Date(deck.updated_at).toLocaleDateString()}
        </small>
      </CardContent>
    </Card>
  );
};
