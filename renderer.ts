// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {app} = require('electron');
const {clipboard} = require('electron');
const monitor = require('active-window');

const btn = document.querySelector('.close');
const txt = document.querySelector('.clipboard');
const info = document.querySelector('.info');
const action = document.querySelector('.action');
const htk = document.querySelector('.hotkeys');

const mk = (el: string[]) => el.map( (e) => document.createElement(e) );
const div = () => mk(['div']);
const input = () => mk(['input']);
const child = (el:Element, ch: HTMLElement[]) => ch.map( (e) => el.appendChild(e) );
const cls = (el: HTMLElement, cls: string) => { el.classList.add(cls); return el };
const clss = (el: HTMLElement[], clss: string[]) => el.map((e) => clss.forEach( (c) => cls(e, c) ));

const cInput = (el: Element | null) => el ? clss(child(el, conc(input, input)()), ['hotkey']) : null;
const conc = (...f: Array<() => any[]>) => f.reduce( (e, ab) => () => ab().concat(e()) );


const callback = function(window: {app?: string, title?: string}){
	try {
		if (String(window.title) !== 'Hotkeys manager') {
			if (info) { info.innerHTML = String(window.title); }
		}
	}catch(err) {
		console.log(err);
	}
}

action ? action.addEventListener('click', () => cInput(htk)) : alert('action button not found');
btn    ? btn   .addEventListener('click', () => window.close()) : alert('close button not found');
monitor.getActiveWindow(callback, -1, 1);

