// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {app} = require('electron');
const {clipboard} = require('electron');
const monitor = require('active-window');
import {cInput} from '../modules/dom';

const btn = document.querySelector('.close');
const info = document.querySelector('.info');
const action = document.querySelector('.action');
const htk = document.querySelector('.hotkeys');


const callback = function(window: {app?: string, title?: string}){
	try {
		if (String(window.title) !== 'Hotkeys manager') {
			if (info) { info.innerHTML = String(window.title); }
		}
	}catch(err) {
		alert(err);
	}
}

action ? action.addEventListener('click', () => cInput(htk)) : alert('action button not found');
btn    ? btn   .addEventListener('click', () => window.close()) : alert('close button not found');
monitor.getActiveWindow(callback, -1, 1);

