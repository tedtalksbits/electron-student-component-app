import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import crudRepository from './crudRepository';
import connection from './sql';
import { FlashcardDTO } from '../src/features/flashcards/types/index';
type Error = {
  code: string;
  errno: number;
  sql: string;
  sqlState: string;
  sqlMessage: string;
};

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;

ipcMain.on('renderer-process-message', (event, arg) => {
  console.log('this came from the renderer', arg);
  event.reply('main-process-reply', 'pong');
});

ipcMain.on('get-decks', async (event) => {
  try {
    const rows = await crudRepository.selectAll('decks');
    console.log(rows);
    event.reply('get-decks-response', { data: rows });
  } catch (error) {
    const err = error as Error;
    event.reply('delete-deck-response', {
      error: err.sqlMessage,
    });
  }
});

ipcMain.on('create-deck', async (event, data, refetchQuery: string) => {
  console.log('create-deck', data);
  console.log('refetchQuery', refetchQuery);
  try {
    await crudRepository.createOne('decks', data);
    const [rows] = await connection.execute(refetchQuery);
    event.reply('create-deck-response', { data: rows });
  } catch (error) {
    const err = error as Error;
    event.reply('delete-deck-response', {
      error: err.sqlMessage,
    });
  }
});

ipcMain.on('delete-deck', async (event, id, refetchQuery: string) => {
  console.log('delete-deck', id);
  console.log('refetchQuery', refetchQuery);
  try {
    await crudRepository.deleteOne('decks', id);
    await crudRepository.deleteMany('flashcards', { deck_id: id });
    const [rows] = await connection.execute(refetchQuery);
    event.reply('delete-deck-response', { data: rows });
  } catch (error) {
    const err = error as Error;
    event.reply('delete-deck-response', {
      error: err.sqlMessage,
    });
  }
});

ipcMain.on('update-deck', async (event, id, data, refetchQuery: string) => {
  console.log('update-deck', data);
  try {
    await crudRepository.updateOne('decks', id, data);
    const [rows] = await connection.execute(refetchQuery);
    event.reply('update-deck-response', { data: rows });
  } catch (error) {
    const err = error as Error;
    event.reply('delete-deck-response', {
      error: err.sqlMessage,
    });
  }
});

ipcMain.on('get-flashcards-by-deckId', async (event, tableName, deckId) => {
  console.log('get-flashcards-by-deckId', tableName, deckId);
  try {
    const rows = await crudRepository.select('flashcards', ['*'], {
      deck_id: deckId,
    });
    console.log(rows);
    event.reply('get-flashcards-by-deckId-response', { data: rows });
  } catch (error) {
    const err = error as Error;
    event.reply('delete-deck-response', {
      error: err.sqlMessage,
    });
  }
});

ipcMain.on(
  'create-flashcard',
  async (event, flashcard: FlashcardDTO, refetchQuery: string) => {
    console.log('create-flashcard', flashcard);
    try {
      await crudRepository.createOne('flashcards', flashcard);
      const [rows] = await connection.execute(refetchQuery);
      event.reply('create-flashcard-response', { data: rows });
    } catch (error) {
      const err = error as Error;
      event.reply('delete-deck-response', {
        error: err.sqlMessage,
      });
    }
  }
);

ipcMain.on(
  'delete-flashcard',
  async (event, flashcardId, refetchQuery: string) => {
    console.log('delete-flashcard', flashcardId);
    try {
      await crudRepository.deleteOne('flashcards', flashcardId);
      const [rows] = await connection.execute(refetchQuery);
      event.reply('delete-flashcard-response', { data: rows });
    } catch (error) {
      const err = error as Error;
      event.reply('delete-deck-response', {
        error: err.sqlMessage,
      });
    }
  }
);

ipcMain.on(
  'update-flashcard',
  async (event, id, data, refetchQuery: string) => {
    console.log('update-flashcard', data);
    try {
      await crudRepository.updateOne('flashcards', id, data);
      const [rows] = await connection.execute(refetchQuery);
      event.reply('update-flashcard-response', { data: rows });
    } catch (error) {
      const err = error as Error;
      event.reply('delete-deck-response', {
        error: err.sqlMessage,
      });
    }
  }
);

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'ankiwindows.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }
}

app.on('window-all-closed', () => {
  win = null;
});

app.whenReady().then(createWindow);
