const { app, BrowserWindow, Menu } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    fullscreen: false,
    backgroundColor: '#0a0e14',
    fullscreenable: true,
    minHeight: 600,
    minWidth: 800,
    title: null,
    frame: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadFile('editor.html');

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'undocked' });
  }

  mainWindow.on('close', function () {
    mainWindow = null;
  });

  var macOSMenu = Menu.buildFromTemplate([
    {
      label: 'Not Boop',
      submenu: [
        {
          label: 'About',
          role: 'about',
        },
        {
          label: 'Close',
          role: 'close',
          accelerator: 'Cmd+W',
        },
        {
          label: 'Quit',
          click() {
            app.quit();
          },
          accelerator: 'Cmd+Q',
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Select All',
          role: 'selectall',
          accelerator: 'Cmd+A',
        },
        {
          label: 'Copy',
          role: 'copy',
          accelerator: 'Cmd+C',
        },
        {
          label: 'Cut',
          role: 'cut',
          accelerator: 'Cmd+X',
        },
        {
          label: 'Paste',
          role: 'paste',
          accelerator: 'Cmd+V',
        },
        {
          label: 'Undo',
          role: 'undo',
          accelerator: 'Cmd+Z',
        },
        {
          label: 'Redo',
          role: 'redo',
          accelerator: 'Cmd+Shift+Z',
        },
      ],
    },
  ]);

  var winMenu = Menu.buildFromTemplate([
    {
      label: 'Not Boop',
      submenu: [
        {
          label: 'About',
          role: 'about',
        },
        {
          label: 'Quit',
          click() {
            app.quit();
          },
          accelerator: 'Ctrl+W',
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Select All',
          role: 'selectall',
          accelerator: 'Ctrl+A',
        },
        {
          label: 'Copy',
          role: 'copy',
          accelerator: 'Ctrl+C',
        },
        {
          label: 'Cut',
          role: 'cut',
          accelerator: 'Ctrl+X',
        },
        {
          label: 'Paste',
          role: 'paste',
          accelerator: 'Ctrl+V',
        },
        {
          label: 'Undo',
          role: 'undo',
          accelerator: 'Ctrl+Z',
        },
        {
          label: 'Redo',
          role: 'redo',
          accelerator: 'Ctrl+Shift+Z',
        },
      ],
    },
  ]);

  if (process.platform == 'darwin') {
    Menu.setApplicationMenu(macOSMenu);
  } else {
    Menu.setApplicationMenu(winMenu);
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
