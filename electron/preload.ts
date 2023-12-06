import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { AppConfig } from './config/appConfig';
import {
  DECK_CHANNELS,
  APP_CONFIG_CHANNELS,
  FLASHCARD_CHANNELS,
} from './config/channels';
import { DeckTypeWithAvgMastery } from '@/features/decks/types';
import { FlashcardServicesMain } from './flashcard/types';
import { FlashcardDTO } from '../src/features/flashcards/types/index';

export type Channels = string;
export interface ElectronHandler {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]): void;
    on(channel: Channels, func: (...args: unknown[]) => void): () => void;
    once(channel: Channels, func: (...args: unknown[]) => void): void;
    invoke(channel: Channels, ...args: unknown[]): Promise<unknown>;
    appConfig: {
      get(): Promise<AppConfig>;
      set(config: AppConfig): Promise<void>;
    };
    deck: {
      getByAvgMastery(
        userId: string | number
      ): Promise<DeckTypeWithAvgMastery[]>;
    };
    flashcard: FlashcardServicesMain;
  };
}
const electronHandler: ElectronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invoke(channel: Channels, ...args: unknown[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
    appConfig: {
      get() {
        return ipcRenderer.invoke(
          APP_CONFIG_CHANNELS.GET_CONFIG
        ) as Promise<AppConfig>;
      },
      set(config: AppConfig) {
        return ipcRenderer.invoke(APP_CONFIG_CHANNELS.SET_CONFIG, config);
      },
    },
    deck: {
      async getByAvgMastery(userId: string | number) {
        return ipcRenderer.invoke(
          DECK_CHANNELS.GET_BY_AVG_MASTERY,
          userId
        ) as Promise<DeckTypeWithAvgMastery[]>;
      },
    },
    flashcard: {
      async getFlashcardsByDeckId(deckId: number) {
        return ipcRenderer.invoke(FLASHCARD_CHANNELS.GET_BY_DECK_ID, deckId);
      },
      async createFlashcard(
        flashcard: Partial<FlashcardDTO>,
        refetchQuery?: string
      ) {
        return ipcRenderer.invoke(
          FLASHCARD_CHANNELS.CREATE,
          flashcard,
          refetchQuery
        );
      },
      async deleteFlashcard(flashcardId: number, refetchQuery?: string) {
        return ipcRenderer.invoke(
          FLASHCARD_CHANNELS.DELETE,
          flashcardId,
          refetchQuery
        );
      },
      async updateFlashcard(
        flashcardId: number,
        flashcard: Partial<FlashcardDTO>,
        refetchQuery?: string
      ) {
        return ipcRenderer.invoke(
          FLASHCARD_CHANNELS.UPDATE,
          flashcardId,
          flashcard,
          refetchQuery
        );
      },
      async getRandomFlashcards(deckId: number, limit = 20) {
        return ipcRenderer.invoke(FLASHCARD_CHANNELS.GET_RANDOM, deckId, limit);
      },
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
// export type ElectronHandler = typeof electronHandler;

function domReady(
  condition: DocumentReadyState[] = ['complete', 'interactive']
) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find((e) => e === child)) {
      parent.appendChild(child);
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find((e) => e === child)) {
      parent.removeChild(child);
    }
  },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`;
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `;
  const oStyle = document.createElement('style');
  const oDiv = document.createElement('div');

  oStyle.id = 'app-loading-style';
  oStyle.innerHTML = styleContent;
  oDiv.className = 'app-loading-wrap';
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle);
      safeDOM.remove(document.body, oDiv);
    },
  };
}

// ----------------------------------------------------------------------

// eslint-disable-next-line react-hooks/rules-of-hooks
const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
  ev.data.payload === 'removeLoading' && removeLoading();
};

setTimeout(removeLoading, 4999);
