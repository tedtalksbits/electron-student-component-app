import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import React from 'react';
import { DeckType } from '../types';
import { Link } from 'react-router-dom';
import { DeckActions } from '.';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { cn } from '@/lib/utils';

interface DeckRowProps {
  deck: DeckType;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  setDecks: React.Dispatch<React.SetStateAction<DeckType[]>>;
  className?: string;
}

export const DeckRow = ({
  deck,
  setSearch,
  setDecks,
  className,
  ...props
}: DeckRowProps) => {
  return (
    <TableRow key={deck.id} className={cn('[&>td]:p-4)', className)} {...props}>
      <TableCell className='flex space-x-2 items-center'>
        <div
          className={`deck-image flex items-start justify-center text-center p-2 rounded-xl border w-12 h-12 bg-gradient-to-l ${generateRandomTailwindGradient()}`}
        >
          <span className='text-3xl font-semibold '>
            {deck.image ? deck.image : deck.name.split('')[0]}
          </span>
        </div>
        <div>
          <h2
            className='hover:text-primary font-medium transition-colors'
            title={deck.name}
          >
            <Link className='group' to={`/decks/${deck.id}/flashcards`}>
              {deck.name}{' '}
              <span className='inline-block opacity-0 group-hover:opacity-100 transition-all translate-x-[-30px] group-hover:translate-x-0'>
                &rarr;
              </span>
            </Link>
          </h2>
          <span className='text-foreground/30 text-xs'>{deck.description}</span>
        </div>
      </TableCell>

      <TableCell>{new Date(deck.updated_at).toLocaleDateString()}</TableCell>
      <TableCell>
        {deck.tags?.split(',').map((tag, i) => (
          <Badge
            key={i}
            variant='outline'
            className='whitespace-nowrap text-[10px] cursor-pointer'
            onClick={() => setSearch && setSearch(tag)}
          >
            {tag}
          </Badge>
        ))}
      </TableCell>
      <TableCell>
        <DeckActions
          deck={deck}
          actions={{
            delete: {
              icon: <TrashIcon className='text-destructive' />,
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
      </TableCell>
    </TableRow>
  );
};

function generateRandomTailwindGradient() {
  const colors = [
    'from-red-500 to-yellow-500',
    'from-yellow-500 to-green-500',
    'from-green-500 to-blue-500',
    'from-blue-500 to-purple-500',
    'from-purple-500 to-pink-500',
    'from-pink-500 to-red-500',
    'from-primary to-red-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
