"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var monitor = require('active-window');
var dom_1 = require("../modules/dom");
var electron_1 = require("electron");
var ipcs_1 = require("../entities/ipcs");
var btn = document.querySelector('.close');
var info = document.querySelector('.info');
var min = document.querySelector('.min');
var max = document.querySelector('.max');
var action = document.querySelector('.action');
var htk = document.querySelector('.hotkeys');
electron_1.ipcRenderer;
var HotkeyManager = /** @class */ (function () {
    function HotkeyManager() {
        this.init();
    }
    HotkeyManager.prototype.init = function () {
        try {
            this.initEvents();
            this.initButtons();
            this.windowWatcher();
            return true;
        }
        catch (err) {
            alert(err);
            return false;
        }
    };
    HotkeyManager.prototype.windowWatcher = function () {
        monitor.getActiveWindow(this.titleWatcherCallback, -1, 1);
    };
    HotkeyManager.prototype.titleWatcherCallback = function (window) {
        try {
            if (String(window.title) !== 'Hotkeys manager') {
                if (info) {
                    info.innerHTML = String(window.title);
                }
            }
        }
        catch (err) {
            alert(err);
        }
    };
    HotkeyManager.prototype.initEvents = function () {
        try {
            electron_1.ipcRenderer.on(ipcs_1.REv.initShortcuts, function (s) { return s.localShortcuts(); });
            electron_1.ipcRenderer.on(ipcs_1.REv.newHotkey, function () {
                htk ? htk.appendChild(dom_1.cInput()) : alert('there is not hotkeys class');
            });
            return true;
        }
        catch (err) {
            alert(err);
            return false;
        }
    };
    HotkeyManager.prototype.initButtons = function () {
        try {
            action ? action.addEventListener('click', function () { return electron_1.ipcRenderer.emit(ipcs_1.REv.newHotkey); }) : alert('action button not found');
            btn ? btn.addEventListener('click', function () { return window.close(); }) : alert('close button not found');
            min ? min.addEventListener('click', function () { return electron_1.ipcRenderer.send('min'); }) : alert('minimize button not found');
            max ? max.addEventListener('click', function () { return electron_1.ipcRenderer.send('max'); }) : alert('maximize button not found');
            return true;
        }
        catch (err) {
            alert(err);
            return false;
        }
    };
    return HotkeyManager;
}());
var hotkeyManager = new HotkeyManager;
