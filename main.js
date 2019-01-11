"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Modules to control application life and create native browser window
var electron = require("electron");
var _a = require("electron"), app = _a.app, BrowserWindow = _a.BrowserWindow;
var state = {
    height: 300,
    width: 700,
    offsetx: 150
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
        alwaysOnTop: true
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
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", function () {
    var width = electron.screen.getPrimaryDisplay().bounds.width;
    createWindow(state.width, state.height, width - state.width - state.offsetx, 0);
    app.setAppUserModelId(process.execPath); // Fix for Win10 notifications
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
//# sourceMappingURL=main.js.map