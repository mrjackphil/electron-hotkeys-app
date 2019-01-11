"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('electron').app;
var clipboard = require('electron').clipboard;
var monitor = require('active-window');
var dom_1 = require("../modules/dom");
var electron_1 = require("electron");
var shortcuts_1 = __importDefault(require("../modules/shortcuts"));
var btn = document.querySelector('.close');
var info = document.querySelector('.info');
var min = document.querySelector('.min');
var max = document.querySelector('.max');
var action = document.querySelector('.action');
var htk = document.querySelector('.hotkeys');
var callback = function (window) {
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
shortcuts_1.default.localShortcuts();
action && htk ? action.addEventListener('click', function () { return dom_1.chChilds([htk], dom_1.cInput()[0]); }) : alert('action button not found');
btn ? btn.addEventListener('click', function () { return window.close(); }) : alert('close button not found');
min ? min.addEventListener('click', function () { return electron_1.ipcRenderer.send('min'); }) : alert('minimize button not found');
max ? max.addEventListener('click', function () { return electron_1.ipcRenderer.send('max'); }) : alert('maximize button not found');
monitor.getActiveWindow(callback, -1, 1);
electron_1.ipcRenderer.on('newHotkey', function (ev, arg) {
    htk ? dom_1.chChilds([htk], dom_1.cInput()[0]) : alert('there is not hotkeys class');
});
