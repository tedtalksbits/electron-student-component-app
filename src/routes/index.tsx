import { Decks } from '@/features/decks/routes';
import { Flashcards } from '@/features/flashcards/routes';
import { Home } from '@/features/home/routes';
import { Skedrool } from '@/features/skedrool/routes';
import { Study } from '@/features/study/routes';
import { Taskify } from '@/features/taskify/routes';
import { Tasks } from '@/features/taskify/routes/Tasks';
import { Book, CalendarCheck2Icon, HomeIcon, Tablets } from 'lucide-react';

export const routes = {
  home: {
    routes: [
      {
        title: 'Home',
        href: '/',
        description: 'Home',
        element: <Home />,
        icon: HomeIcon,
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
        icon: Book,
      },
      {
        title: 'Anki App',
        href: '/decks/:id/flashcards',
        description: 'Anki App',
        element: <Flashcards />,
        icon: Book,
      },
      {
        title: 'Anki App',
        href: '/decks/:id/study',
        description: 'Anki App',
        element: <Study />,
        icon: Book,
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
        icon: CalendarCheck2Icon,
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
        icon: Tablets,
      },
      {
        title: 'Taskify',
        href: '/taskify/tasks/:id',
        description: 'Taskify App',
        element: <Tasks />,
        icon: Tablets,
      },
    ],
  },
};
