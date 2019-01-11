// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {app} = require('electron');
const {clipboard} = require('electron');
const monitor = require('active-window');
import { chChilds, cInput } from '../modules/dom';
import { ipcRenderer } from 'electron';
import Shortcuts from '../modules/shortcuts';

const btn = document.querySelector('.close');
const info = document.querySelector('.info');
const min = document.querySelector('.min');
const max = document.querySelector('.max');
const action = document.querySelector('.action');
const htk = document.querySelector('.hotkeys') as HTMLElement;


const callback = function(window: {app?: string, title?: string}){
	try {
		if (String(window.title) !== 'Hotkeys manager') {
			if (info) { info.innerHTML = String(window.title); }
		}
	}catch(err) {
		alert(err);
	}
}

Shortcuts.localShortcuts();

action && htk ? action.addEventListener('click', () => chChilds([htk], cInput()[0])) : alert('action button not found');
btn ? btn.addEventListener('click', () => window.close()) : alert('close button not found');
min ? min.addEventListener('click', () => ipcRenderer.send('min')) : alert('minimize button not found');
max ? max.addEventListener('click', () => ipcRenderer.send('max')) : alert('maximize button not found');

monitor.getActiveWindow(callback, -1, 1);

ipcRenderer.on('newHotkey', (ev: Event, arg: string) => {
	htk ? chChilds( [htk], cInput()[0] ) : alert('there is not hotkeys class');
});
