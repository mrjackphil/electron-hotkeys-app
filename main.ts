import E, { ipcMain } from "electron";
import Shortcuts from './src/modules/shortcuts';

// Modules to control application life and create native browser window
const electron = require("electron");
const { app, BrowserWindow, globalShortcut } = require("electron");

const state = {
  height: 300,
  width: 700,
  offsetx: 150,
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: E.BrowserWindow | null;

function createWindow(w: number, h: number, x?: number, y?: number) {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: w,
    height: h,
    x: x,
    y: y,
    movable: false,
	resizable: false,
	alwaysOnTop: true,
	frame: false,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  const { width } = electron.screen.getPrimaryDisplay().bounds;

  app.setAppUserModelId(process.execPath); // Fix for Win10 notifications

  const win = createWindow(
    state.width,
    state.height,
    width - state.width - state.offsetx,
    0
  );

//   win.webContents.openDevTools();

  const shortcuts = new Shortcuts;
  shortcuts.init(win);

  ipcMain.on('toggle-opacity', () => {
	const op = win.getOpacity() === 1 ? .2 : 1;
	win.setOpacity(op);
  });

  ipcMain.on('min', () => {
	win.setBounds({
		width: state.width,
		height: state.height / 3,
		x: width - state.width - state.offsetx,
		y: 0,
	});
  });

  ipcMain.on('max', () => {
	win.setBounds({
		width: state.width,
		height: state.height,
		x: width - state.width - state.offsetx,
		y: 0,
	});
  });

});

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
    const { width } = electron.screen.getPrimaryDisplay().bounds;
    createWindow(
      state.width,
      state.height,
      width - state.width - state.offsetx,
      0
    );
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
