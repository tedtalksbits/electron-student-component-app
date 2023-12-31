import { app, BrowserWindow, ipcMain, screen } from 'electron';

import path from 'node:path';
import crudRepository from './crudRepository';
import connection from './sql';
import { RowDataPacket } from 'mysql2';

import { createLevels, createLevelsTable } from './config/appConfig';
import { setUpListeners } from './ipcListeners';
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
const isMac = process.platform === 'darwin';
const isProd = process.env.NODE_ENV === 'production' || app.isPackaged;

setUpListeners();

ipcMain.on('renderer-process-message', (event, arg) => {
  console.log('this came from the renderer', arg);
  event.reply('main-process-reply', 'pong');
});

ipcMain.on('add-study-session', async (event, data, refetchQuery?: string) => {
  try {
    const [rows] = await crudRepository.createOne('study_sessions', data);

    if (refetchQuery) {
      const [rows] = await connection.execute(refetchQuery);
      event.reply('add-study-session-response', { data: rows });
    }
    event.reply('add-study-session-response', { sessionId: rows.id });
  } catch (error) {
    const err = error as Error;
    event.reply('add-study-session-response', {
      error: err.sqlMessage,
    });
  }
});

ipcMain.on(
  'update-study-session',
  async (event, data, id, refetchQuery?: string) => {
    console.log('update-study-session', data);
    try {
      const [row] = await crudRepository.updateOne('study_sessions', id, data);
      console.log(row);
      if (refetchQuery) {
        const rows = await connection.execute(refetchQuery);
        event.reply('update-study-session-response', { data: rows });
      }
      event.reply('update-study-session-response', { data: row });
    } catch (error) {
      console.log(error);
      const err = error as Error;
      event.reply('update-study-session-response', {
        error: err.sqlMessage,
      });
    }
  }
);

ipcMain.on('get-study-sessions', async (event, userId) => {
  console.log('get-study-sessions', userId);
  try {
    const rows = await crudRepository.select('study_sessions', ['*'], {
      user_id: userId,
    });

    event.reply('get-study-sessions-response', { data: rows });
  } catch (error) {
    const err = error as Error;
    event.reply('get-study-sessions-response', {
      error: err.sqlMessage,
    });
  }
});

// study session analytics stored procedures
// get flashcards studied daily by user

ipcMain.on('get-flashcards-studied-daily', async (event, userId) => {
  console.log('get-flashcards-studied-daily', userId);
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'CALL get_flashcards_study_daily(?)',
      [userId]
    );
    event.reply('get-flashcards-studied-daily-response', { data: rows[0] });
  } catch (error) {
    const err = error as Error;
    event.reply('get-flashcards-studied-daily-response', {
      error: err.sqlMessage,
    });
  }
});

// get most studied decks by user

ipcMain.on('get-most-studied-decks', async (event, userId) => {
  console.log('get-most-studied-decks', userId);
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'CALL get_most_studied_decks(?)',
      [userId]
    );
    event.reply('get-most-studied-decks-response', { data: rows[0] });
  } catch (error) {
    const err = error as Error;
    event.reply('get-most-studied-decks-response', {
      error: err.sqlMessage,
    });
  }
});

// get last studied deck by user

ipcMain.on('get-last-studied-deck', async (event, userId) => {
  console.log('get-last-studied-deck', userId);
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'CALL get_last_study_session(?)',
      [userId]
    );
    event.reply('get-last-studied-deck-response', { data: rows[0] });
  } catch (error) {
    const err = error as Error;
    event.reply('get-last-studied-deck-response', {
      error: err.sqlMessage,
    });
  }
});

// get_total_analytics

ipcMain.on('get-total-analytics', async (event, userId) => {
  console.log('get-total-analytics', userId);
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'CALL get_total_analytics(?)',
      [userId]
    );
    event.reply('get-total-analytics-response', { data: rows[0] });
  } catch (error) {
    const err = error as Error;
    event.reply('get-total-analytics-response', {
      error: err.sqlMessage,
    });
  }
});

/*
  ========================================
  XP LEVELS
  ========================================
*/

ipcMain.on('get-total-xp', async (event, userId) => {
  console.log('get-total-xp', userId);
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'CALL get_user_total_xp(?)',
      [userId]
    );
    console.log('total xp', rows[0][0]);
    event.reply('get-total-xp-response', { data: rows[0][0] });
  } catch (error) {
    const err = error as Error;
    event.reply('get-total-xp-response', {
      error: err.sqlMessage,
    });
  }
});

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
const localDir = path.join(app.getPath('userData'));
console.log('localDir', localDir);
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'icon.png'),
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

  const displays = screen.getAllDisplays();
  let display;

  if (!isProd) {
    win.webContents.openDevTools();
    const devMonitorLabel = isMac ? 'Built-in Retina Display' : 'DELL U2518D';
    display = displays.find((display) =>
      display.label.includes(devMonitorLabel)
    );
  } else {
    display = displays.find(
      (display) => display.bounds.x === 0 && display.bounds.y === 0
    );
  }

  if (display) {
    win.setBounds(display.bounds);
  }

  win?.webContents.on('did-finish-load', async () => {
    console.log('did-finish-load');
    win?.webContents.send('app-loaded');
  });
}
// const NOTIFICATION_TITLE = 'Basic Notification';
// const NOTIFICATION_BODY = 'Notification from the Main process';

// function showNotification() {
//   new Notification({
//     title: NOTIFICATION_TITLE,
//     body: NOTIFICATION_BODY,
//   }).show();
// }
app.on('window-all-closed', () => {
  win = null;
});

app
  .whenReady()
  .then(createWindow)
  .then(async () => {
    await createLevelsTable();
    await createLevels();
  });
