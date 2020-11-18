// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
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

  // and load the index.html of the app.
  mainWindow.loadFile("editor.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: 'undocked' });

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  var menu = Menu.buildFromTemplate([
    {
      label: "",
      submenu: [
        {
          label: "Refresh",
          role: "reload",
          accelerator: "Cmd+R"
        },
        {
          label: "About",
          role: "about"
        },

        {
          label: "Quit",
          click() {
            app.quit();
          },
          accelerator: "Cmd+Q"
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        {
          label: "Select All",
          role: "selectall",

          accelerator: "Cmd+A"
        },
        {
          label: "Copy",
          role: "copy",

          accelerator: "Cmd+C"
        },
        {
          label: "Cut",
          role: "cut",

          accelerator: "Cmd+X"
        },
        {
          label: "Paste",
          role: "paste",

          accelerator: "Cmd+V"
        },
        {
          label: "Undo",
          role: "undo",

          accelerator: "Cmd+Z"
        },
        {
          label: "Redo",
          role: "redo",

          accelerator: "Cmd+Shift+Z"
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
