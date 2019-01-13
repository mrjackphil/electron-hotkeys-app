"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var mousetrap_1 = __importDefault(require("mousetrap"));
var Shortcuts = /** @class */ (function () {
    function Shortcuts() {
        this.hotkeys = {
            keymode: 'CmdOrCtrl+.',
            hide: '',
            focus: 'CmdOrCtrl+F',
            newHotkey: 'CmdOrCtrl+X',
            delete: '',
            transparent: 'CmdOrCtrl+T',
        };
    }
    Shortcuts.prototype.init = function (win) {
        var _this = this;
        var keymode = this.hotkeys.keymode;
        electron_1.globalShortcut.register(keymode, function () {
            _this.registerGlobal(win);
            setTimeout(function () { return _this.unregisterGlobal(win); }, 1000);
        });
    };
    Shortcuts.prototype.registerGlobal = function (win) {
        var _a = this.hotkeys, focus = _a.focus, newHotkey = _a.newHotkey, transparent = _a.transparent;
        electron_1.globalShortcut.register(newHotkey, function () {
            win.webContents.send('newHotkey');
        });
        electron_1.globalShortcut.register(focus, function () {
            win.focus();
        });
        electron_1.globalShortcut.register(transparent, function () {
            electron_1.ipcMain.emit('toggle-opacity');
        });
    };
    Shortcuts.prototype.unregisterGlobal = function (win) {
        var _a = this.hotkeys, focus = _a.focus, newHotkey = _a.newHotkey, transparent = _a.transparent;
        electron_1.globalShortcut.unregister(focus);
        electron_1.globalShortcut.unregister(newHotkey);
        electron_1.globalShortcut.unregister(transparent);
    };
    Shortcuts.prototype.localShortcuts = function () {
        var _a = this.hotkeys, transparent = _a.transparent, newHotkey = _a.newHotkey;
        function mt(key) { return key.replace('CmdOrCtrl', 'ctrl'); }
        mousetrap_1.default.bind(mt(transparent), function () { electron_1.ipcRenderer.send('toggle-opacity'); });
        mousetrap_1.default.bind(mt(newHotkey), function () { electron_1.ipcRenderer.emit('newHotkey'); });
    };
    return Shortcuts;
}());
exports.default = Shortcuts;
