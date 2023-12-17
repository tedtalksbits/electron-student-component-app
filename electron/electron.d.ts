// invoke<T>(channel: string, ...args: any[]): Promise<T>;

declare namespace Electron {
  interface IpcRenderer extends NodeJS.EventEmitter {
    invoke<T>(channel: string, ...args: any[]): Promise<T>;
  }
}
