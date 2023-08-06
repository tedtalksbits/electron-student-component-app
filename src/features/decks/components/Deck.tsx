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
};

export const Deck = ({ deck, setDecks }: DeckProps) => {
  return (
    <Card className='col-span-3'>
      <CardHeader className='flex items-center flex-row'>
        <h4 className='my-2 hover:text-sky-300 text-constraint'>
          <Link to={`/decks/${deck.id}/flashcards?deck_name=${deck.name}`}>
            {deck.name}
          </Link>
        </h4>
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
      <CardContent>
        <p>{deck.description}</p>
        <div className='flex gap-1 my-2 overflow-x-auto snap-x scroll-smooth snap-mandatory'>
          {deck.tags &&
            deck.tags.split(',').map((tag, i) => (
              <Badge key={i} variant='outline'>
                {tag}
              </Badge>
            ))}
        </div>
        <small className='font-light text-xs mt-auto text-muted-foreground'>
          Last updated: {new Date(deck.updated_at).toLocaleDateString()}
        </small>
      </CardContent>
    </Card>
  );
};
