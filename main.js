"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var shortcuts_1 = __importDefault(require("./src/modules/shortcuts"));
// Modules to control application life and create native browser window
var electron = require("electron");
var _a = require("electron"), app = _a.app, BrowserWindow = _a.BrowserWindow, globalShortcut = _a.globalShortcut;
var state = {
    height: 300,
    width: 700,
    offsetx: 150,
};
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;
function createWindow(w, h, x, y) {
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
    mainWindow.loadURL("file://" + __dirname + "/index.html");
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
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
app.on("ready", function () {
    var width = electron.screen.getPrimaryDisplay().bounds.width;
    app.setAppUserModelId(process.execPath); // Fix for Win10 notifications
    var win = createWindow(state.width, state.height, width - state.width - state.offsetx, 0);
    //   win.webContents.openDevTools();
    var shortcuts = new shortcuts_1.default;
    shortcuts.init(win);
    win.setSkipTaskbar(true);
    electron_1.ipcMain.on('toggle-opacity', function () {
        var op = win.getOpacity() === 1 ? .2 : 1;
        win.setOpacity(op);
    });
    electron_1.ipcMain.on('min', function () {
        win.setBounds({
            width: state.width,
            height: state.height / 3,
            x: width - state.width - state.offsetx,
            y: 0,
        });
    });
    electron_1.ipcMain.on('max', function () {
        win.setBounds({
            width: state.width,
            height: state.height,
            x: width - state.width - state.offsetx,
            y: 0,
        });
    });
});
// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        var width = electron.screen.getPrimaryDisplay().bounds.width;
        createWindow(state.width, state.height, width - state.width - state.offsetx, 0);
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
