import { Decks } from '@/features/decks/routes';
import { Flashcards } from '@/features/flashcards/routes';
import { Home } from '@/features/home/routes';
import { Playground } from '@/features/playground/routes/Playground';
import { Terminal } from '@/features/playground/routes/Terminal';
import { Skedrool } from '@/features/skedrool/routes';
import { Study } from '@/features/study/routes';
import {
  Book,
  CalendarCheck2Icon,
  HomeIcon,
  LucideIcon,
  PlayCircleIcon,
  TerminalIcon,
} from 'lucide-react';

export const routes: iModules = {
  home: {
    routes: [
      {
        title: 'Home',
        href: '/',
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
        title: 'Anki',
        href: '/decks',
        description: 'Anki App',
        element: <Decks />,
        icon: Book,
        index: true,
      },
      {
        title: 'Anki App',
        href: '/decks/:id/flashcards',
        description: 'Anki App',
        element: <Flashcards />,
        icon: Book,
        index: false,
      },
      {
        title: 'Anki App',
        href: '/decks/:id/study',
        description: 'Anki App',
        element: <Study />,
        icon: Book,
        index: false,
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
        index: true,
      },
    ],
  },
  playground: {
    routes: [
      {
        title: 'Playground',
        href: '/playground',
        description: 'Playground',
        element: <Playground />,
        icon: PlayCircleIcon,
        index: true,
      },
      {
        title: 'Terminal',
        href: '/playground/terminal',
        description: 'Terminal',
        element: <Terminal />,
        icon: TerminalIcon,
        index: false,
      },
      {
        title: 'File Converter',
        href: '/playground/file-converter',
        description: 'File Converter',
        element: <h1>File Converter</h1>,
        icon: TerminalIcon,
        index: false,
      },
    ],
  },
};

export const indexRoutes = [
  ...routes.home.routes,
  ...routes.anki.routes,
  ...routes.skedrool.routes,
  ...routes.playground.routes,
].filter((route) => route.index);

export interface iRoute {
  title: string;
  href: string;
  description: string;
  element: JSX.Element;
  icon: LucideIcon;
  index: boolean;
}

export interface iModule {
  routes: iRoute[];
}

export interface iModules {
  [key: string]: iModule;
}
