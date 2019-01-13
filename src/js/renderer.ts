const monitor = require('active-window');
import { cInput } from '../modules/dom';
import { ipcRenderer } from 'electron';
import { REv, ipcRModule } from '../entities/ipcs';
import IShortcuts from '../entities/shotcuts';
import IHotkeyManager from '../entities/hotkeymanager';

const btn = document.querySelector('.close');
const info = document.querySelector('.info');
const min = document.querySelector('.min');
const max = document.querySelector('.max');
const action = document.querySelector('.action');
const htk = document.querySelector('.hotkeys') as HTMLElement;

ipcRenderer as ipcRModule;

class HotkeyManager implements IHotkeyManager{
	constructor() {
		this.init();
	}

	public init() {
		try {
			this.initEvents();
			this.initButtons();
			this.windowWatcher();
			return true;
		} catch(err) {
			alert(err);
			return false;
		}
	}

	private windowWatcher() {
		monitor.getActiveWindow(this.titleWatcherCallback, -1, 1);
	}

	private titleWatcherCallback(window: {app?: string, title?: string}) {
		try {
			if (String(window.title) !== 'Hotkeys manager') {
				if (info) { info.innerHTML = String(window.title); }
			}
		} catch(err) {
			alert(err);
		}
	}

	public initEvents() {
		try {
			ipcRenderer.on(REv.initShortcuts, (ev: Event, s: IShortcuts) => {console.log(s);})
			ipcRenderer.on(REv.newHotkey, () => {
				htk ? htk.appendChild(cInput()) : alert('there is not hotkeys class');
			});
			ipcRenderer.send('window-shortcuts');
			return true;
		} catch(err) {
			alert(err);
			return false;
		}
	}

	public initButtons() {
		try {
			action ? action.addEventListener('click', () => ipcRenderer.emit(REv.newHotkey)) : alert('action button not found');
			btn ? btn.addEventListener('click', () => window.close()) : alert('close button not found');
			min ? min.addEventListener('click', () => ipcRenderer.send('min')) : alert('minimize button not found');
			max ? max.addEventListener('click', () => ipcRenderer.send('max')) : alert('maximize button not found');
			return true;
		} catch(err) {
			alert(err);
			return false;
		}
	}
}

const hotkeyManager = new HotkeyManager;