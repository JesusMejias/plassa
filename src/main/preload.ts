import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  store: {
    get(key: any) {
      return ipcRenderer.sendSync('store-get', key);
    },
    set(key: string , val: any) {
      ipcRenderer.send('store-set', key, val);
    },
    delete(key: string) {
      ipcRenderer.send('store-delete', key);
    },
  },
  makeWindowResizable: () => ipcRenderer.send('make-window-resizable'),
});
