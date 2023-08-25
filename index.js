const {
          app,
          BrowserWindow,
          globalShortcut,
          ipcMain,
      }    = require('electron');
const path = require('path');
const {OverlayController} = require("electron-overlay-window");

require('electron-reload')(__dirname);

// <editor-fold desc="Electron Specific">

/**
 * @returns {Promise<Electron.CrossProcessExports.BrowserWindow>}
 */
const createWindow = async () => {

    // We cannot require the screen module until the app is ready.
    const {screen} = require('electron');

    // Create a window that fills the screen's available work area.
    const primaryDisplay = screen.getPrimaryDisplay();
    const {
              width,
              height,
          }              = primaryDisplay.workAreaSize;

    const win = new BrowserWindow({
        width:          1280,
        height:         720,
        frame:          false,
        alwaysOnTop:    false,
        resizable:      false,
        minimizable:    false,
        skipTaskbar:    false,
        focusable:      true,
        fullscreen:     false,
        fullscreenable: false,
        center:         false,
        transparent:    true,
        webPreferences: {
            nodeIntegration:            false,
            contextIsolation:           true,
            worldSafeExecuteJavaScript: true,
            preload:                    path.join(__dirname, 'preload.js'),
        },
    });

    await win.loadFile('web.html');
    return win;
};

(async () => {
    await app.whenReady();

    const win = await createWindow();
    //win.setAlwaysOnTop(true, "pop-up-menu");
    //win.setIgnoreMouseEvents(true);
    win.webContents.openDevTools({mode: "detach"});

    const sendKey = (key) => win.webContents.send('key', key);

    globalShortcut.register('Control+Alt+Left', () => sendKey('left'));
    globalShortcut.register('Control+Alt+Right', () => sendKey('right'));
    globalShortcut.register('Control+Alt+Up', () => sendKey('up'));
    globalShortcut.register('Control+Alt+Down', () => sendKey('down'));
    globalShortcut.register('Control+Alt+Enter', () => sendKey('confirm'));
    globalShortcut.register('Control+Alt+Backspace', () => sendKey('back'));
    globalShortcut.register('Control+Alt+End', () => app.quit());
    globalShortcut.register('Control+Alt+Home', () => sendKey('reset'));

})();

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// </editor-fold>
