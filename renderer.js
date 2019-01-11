"use strict";
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var app = require('electron').app;
var clipboard = require('electron').clipboard;
var monitor = require('active-window');
var btn = document.querySelector('.close');
var txt = document.querySelector('.clipboard');
var info = document.querySelector('.info');
var action = document.querySelector('.action');
var htk = document.querySelector('.hotkeys');
var mk = function (el) { return el.map(function (e) { return document.createElement(e); }); };
var div = function () { return mk(['div']); };
var input = function () { return mk(['input']); };
var child = function (el, ch) { return ch.map(function (e) { return el.appendChild(e); }); };
var cls = function (el, cls) { el.classList.add(cls); return el; };
var clss = function (el, clss) { return el.map(function (e) { return clss.forEach(function (c) { return cls(e, c); }); }); };
var cInput = function (el) { return el ? clss(child(el, conc(input, input)()), ['hotkey']) : null; };
var conc = function () {
    var f = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        f[_i] = arguments[_i];
    }
    return f.reduce(function (e, ab) { return function () { return ab().concat(e()); }; });
};
var callback = function (window) {
    try {
        if (String(window.title) !== 'Hotkeys manager') {
            if (info) {
                info.innerHTML = String(window.title);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
};
action ? action.addEventListener('click', function () { return cInput(htk); }) : alert('action button not found');
btn ? btn.addEventListener('click', function () { return window.close(); }) : alert('close button not found');
monitor.getActiveWindow(callback, -1, 1);
//# sourceMappingURL=renderer.js.map