"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var ipcs_1 = require("../entities/ipcs");
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
            _this.register(win);
            setTimeout(function () { return _this.unregister(); }, 1000);
        });
    };
    Shortcuts.prototype.register = function (win) {
        var _a = this.hotkeys, focus = _a.focus, newHotkey = _a.newHotkey, transparent = _a.transparent;
        electron_1.globalShortcut.register(newHotkey, function () {
            win.webContents.send(ipcs_1.REv.newHotkey);
        });
        electron_1.globalShortcut.register(focus, function () {
            win.focus();
        });
        electron_1.globalShortcut.register(transparent, function () {
            electron_1.ipcMain.emit('toggle-opacity');
        });
    };
    Shortcuts.prototype.unregister = function () {
        var _a = this.hotkeys, focus = _a.focus, newHotkey = _a.newHotkey, transparent = _a.transparent;
        electron_1.globalShortcut.unregister(focus);
        electron_1.globalShortcut.unregister(newHotkey);
        electron_1.globalShortcut.unregister(transparent);
    };
    return Shortcuts;
}());
exports.default = Shortcuts;
