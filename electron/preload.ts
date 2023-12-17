import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import {
  DECK_CHANNELS,
  FLASHCARD_CHANNELS,
  USER_CHANNELS,
  PREFERENCE_CHANNELS,
} from './config/channels';
import { flashcardRepository } from './flashcard/flashcardServices';
import { deckRepository } from './deck/deckServices';
import { userRepository } from './user/UserRepository';
import { preferenceRepository } from './preference/PreferenceRepository';

export type Channels = string;

const electronHandler = {
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
    preference: {
      async getPreference(
        ...args: Parameters<typeof preferenceRepository.getUserPreference>
      ) {
        return ipcRenderer.invoke<
          ReturnType<typeof preferenceRepository.getUserPreference>
        >(PREFERENCE_CHANNELS.GET_PREFERENCE, ...args);
      },
      async setPreference(
        ...args: Parameters<typeof preferenceRepository.updateUserPreference>
      ) {
        return ipcRenderer.invoke<
          ReturnType<typeof preferenceRepository.updateUserPreference>
        >(PREFERENCE_CHANNELS.SET_PREFERENCE, ...args);
      },
    },
    user: {
      async getUserById(...args: Parameters<typeof userRepository.getOne>) {
        return ipcRenderer.invoke<ReturnType<typeof userRepository.getOne>>(
          USER_CHANNELS.GET_BY_ID,
          ...args
        );
      },
      async createUser(...args: Parameters<typeof userRepository.createOne>) {
        return ipcRenderer.invoke<ReturnType<typeof userRepository.createOne>>(
          USER_CHANNELS.CREATE,
          ...args
        );
      },
      async deleteUser(...args: Parameters<typeof userRepository.deleteOne>) {
        return ipcRenderer.invoke<ReturnType<typeof userRepository.deleteOne>>(
          USER_CHANNELS.DELETE,
          ...args
        );
      },
      async updateUser(...args: Parameters<typeof userRepository.updateOne>) {
        return ipcRenderer.invoke<ReturnType<typeof userRepository.updateOne>>(
          USER_CHANNELS.UPDATE,
          ...args
        );
      },
      async getUserLevelAndXp(
        ...args: Parameters<typeof userRepository.getUserLevelAndXp>
      ) {
        return ipcRenderer.invoke<
          ReturnType<typeof userRepository.getUserLevelAndXp>
        >(USER_CHANNELS.GET_LEVEL, ...args);
      },
    },
    deck: {
      async getDecks() {
        return ipcRenderer.invoke<ReturnType<typeof deckRepository.getAll>>(
          DECK_CHANNELS.GET
        );
      },

      async createDeck(...args: Parameters<typeof deckRepository.createOne>) {
        return ipcRenderer.invoke<ReturnType<typeof deckRepository.createOne>>(
          DECK_CHANNELS.CREATE,
          ...args
        );
      },

      async deleteDeck(...args: Parameters<typeof deckRepository.deleteOne>) {
        return ipcRenderer.invoke<ReturnType<typeof deckRepository.deleteOne>>(
          DECK_CHANNELS.DELETE,
          ...args
        );
      },

      async updateDeck(...args: Parameters<typeof deckRepository.updateOne>) {
        return ipcRenderer.invoke<ReturnType<typeof deckRepository.updateOne>>(
          DECK_CHANNELS.UPDATE,
          ...args
        );
      },

      async getDeckById(...args: Parameters<typeof deckRepository.getOne>) {
        return ipcRenderer.invoke<ReturnType<typeof deckRepository.getOne>>(
          DECK_CHANNELS.GET_BY_ID,
          ...args
        );
      },

      async getLowestMasteredDecks(
        ...args: Parameters<typeof deckRepository.getByLowestMastered>
      ) {
        return ipcRenderer.invoke<
          ReturnType<typeof deckRepository.getByLowestMastered>
        >(DECK_CHANNELS.GET_BY_AVG_MASTERY, ...args);
      },
    },
    flashcard: {
      async getFlashcardsByDeckId(
        ...args: Parameters<typeof flashcardRepository.getFlashcardsByDeckId>
      ) {
        return ipcRenderer.invoke<
          ReturnType<typeof flashcardRepository.getFlashcardsByDeckId>
        >(FLASHCARD_CHANNELS.GET_BY_DECK_ID, ...args);
      },
      async createFlashcard(
        ...args: Parameters<typeof flashcardRepository.createOne>
      ) {
        return ipcRenderer.invoke<
          ReturnType<typeof flashcardRepository.createOne>
        >(FLASHCARD_CHANNELS.CREATE, ...args);
      },
      async deleteFlashcard(
        ...args: Parameters<typeof flashcardRepository.deleteOne>
      ) {
        return ipcRenderer.invoke<
          ReturnType<typeof flashcardRepository.deleteOne>
        >(FLASHCARD_CHANNELS.DELETE, ...args);
      },
      async updateFlashcard(
        ...args: Parameters<typeof flashcardRepository.updateOne>
      ) {
        return ipcRenderer.invoke<
          ReturnType<typeof flashcardRepository.updateOne>
        >(FLASHCARD_CHANNELS.UPDATE, ...args);
      },
      async getRandomFlashcards(
        ...args: Parameters<
          typeof flashcardRepository.getRandomFlashcardsByDeckId
        >
      ) {
        return ipcRenderer.invoke<
          ReturnType<typeof flashcardRepository.getRandomFlashcardsByDeckId>
        >(FLASHCARD_CHANNELS.GET_RANDOM, ...args);
      },
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
export type ElectronHandler = typeof electronHandler;

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
