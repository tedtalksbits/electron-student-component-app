import { ipcMain } from 'electron';
import { exec } from 'node:child_process';

export const playgroundListeners = () => {
  ipcMain.on('run-code', (event, arg) => {
    console.log('run-code', arg);
    exec(arg, (error, stdout, stderr) => {
      if (error) {
        console.log('error', arg + ':\n' + error);
        event.reply('run-code-reply', arg + ':\n' + error.message);
        return;
      }
      if (stderr) {
        console.log('stderr', arg + '\n' + stderr);
        event.reply('run-code-reply', arg + ':\n' + stderr);
        return;
      }
      console.log('stdout', arg + ':\n' + stdout);
      event.reply('run-code-reply', arg + ':\n' + stdout);
    });
    event.reply('run-code-reply', arg + ':\n' + 'success');
  });
};
