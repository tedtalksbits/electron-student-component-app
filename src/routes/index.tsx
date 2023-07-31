import { Decks } from '@/features/decks/routes';
import { Flashcards } from '@/features/flashcards/routes';
import { Home } from '@/features/home/routes';
import { Skedrool } from '@/features/skedrool/routes';
import { Study } from '@/features/study/routes';
import { Taskify } from '@/features/taskify/routes';

export const routes = {
  home: {
    routes: [
      {
        title: 'Home',
        href: '/',
        description: 'Home',
        element: <Home />,
      },
    ],
  },
  anki: {
    routes: [
      {
        title: 'Anki',
        href: '/decks',
        description: 'Anki App',
        element: <Decks />,
      },
      {
        title: 'Anki App',
        href: '/decks/:id/flashcards',
        description: 'Anki App',
        element: <Flashcards />,
      },
      {
        title: 'Anki App',
        href: '/decks/:id/study',
        description: 'Anki App',
        element: <Study />,
      },
    ],
  },
  skedrool: {
    routes: [
      {
        title: 'Skedrool',
        href: '/skedrool',
        description: 'Skedrool App',
        element: <Skedrool />,
      },
    ],
  },
  taskify: {
    routes: [
      {
        title: 'Taskify',
        href: '/taskify',
        description: 'Taskify App',
        element: <Taskify />,
      },
    ],
  },
};
