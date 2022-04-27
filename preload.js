const {
          contextBridge,
          ipcRenderer,
      } = require('electron');

const keyMapping = {
    'left': 'ArrowLeft',
    'right': 'ArrowRight',
    'down': 'ArrowDown',
    'up': 'ArrowUp',
    'confirm': 'Enter',
    'back': 'Backspace',
    'reset': 'Delete'
}

const context = {
    onKeyReceived: (func) => {
        ipcRenderer.on('key', (_, key) => func(keyMapping[key]));
    },
};

contextBridge.exposeInMainWorld('context', context);
