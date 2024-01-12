import { Decks, UploadDeck } from '@/features/decks/routes';
import { Flashcards } from '@/features/flashcards/routes';
import { UploadFlashcards } from '@/features/flashcards/routes/UploadFlashcards';
import { Home } from '@/features/home/routes';
import { Analytics } from '@/features/study-analytics/routes/Analytics';
import { Study } from '@/features/study/routes';
import {
  Book,
  HomeIcon,
  LucideFlame,
  LucideIcon,
  PlayIcon,
} from 'lucide-react';

export const routes: Routes = {
  home: {
    routes: [
      {
        title: 'Home',
        href: '/',
        target: null,
        description: 'Home',
        element: <Home />,
        icon: HomeIcon,
        index: true,
      },
    ],
  },
  anki: {
    routes: [
      {
        title: 'Decks',
        href: '/decks',
        target: null,
        description: 'Anki App',
        element: <Decks />,
        icon: Book,
        index: true,
      },
      {
        title: 'Deck Upload',
        href: '/decks/upload',
        target: null,
        description: 'Anki App',
        element: <UploadDeck />,
        icon: Book,
      },
      {
        title: 'Flashcards',
        href: '/decks/:id/flashcards',
        target: null,
        description: 'Anki App',
        element: <Flashcards />,
        icon: Book,
      },
      {
        title: 'Flashcard Upload',
        href: '/decks/:id/flashcards/upload',
        target: null,
        description: 'Anki App',
        element: <UploadFlashcards />,
        icon: Book,
      },
      {
        title: 'Study',
        href: '/decks/:id/study',
        target: null,
        description: 'Anki App',
        element: <Study />,
        icon: Book,
      },
    ],
  },

  playground: {
    routes: [
      {
        title: 'Playground ↗',
        href: 'https://leetcode.com/playground/new/empty',
        target: '_blank',
        description: 'Playground',
        element: <div>Playground</div>,
        icon: PlayIcon,
      },
    ],
  },
  analytics: {
    routes: [
      {
        title: 'Analytics',
        href: '/analytics',
        target: null,
        description: 'Analytics',
        element: <Analytics />,
        icon: LucideFlame,
        index: true,
      },
    ],
  },
};

export const routesArray = Object.values(routes).flatMap(
  (route) => route.routes
);

export interface Route {
  title: string;
  href: string;
  target: string | null;
  description: string;
  element: JSX.Element;
  icon: LucideIcon;
  index?: boolean;
}

interface Routes {
  [key: string]: {
    routes: Route[];
  };
}

export const indexRoutes = routesArray.filter((route) => route.index);
