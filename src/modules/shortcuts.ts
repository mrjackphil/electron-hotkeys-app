import { globalShortcut, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import Mousetrap from 'mousetrap';

interface KeyboardKeys {
	keymode: string,
	hide: string,
	focus: string,
	newHotkey: string,
	delete: string,
	transparent: string
}
export default class Shortcuts {
	hotkeys: KeyboardKeys;
	keywait: boolean;
	constructor() {
		this.hotkeys = {
			keymode: 'CmdOrCtrl+.',
			hide: '',
			focus: 'CmdOrCtrl+F',
			newHotkey: 'CmdOrCtrl+X',
			delete: '',
			transparent: 'CmdOrCtrl+T',
		}
		this.keywait = false;
	}

	public init(win: BrowserWindow) {
		const {keymode} = this.hotkeys;

		globalShortcut.register(keymode, () => {
			this.registerGlobal(win);
			setTimeout( () => this.unregisterGlobal(win), 1000);
		});

	}
	private registerGlobal(win: BrowserWindow) {
		const {focus, newHotkey, transparent} = this.hotkeys;

		globalShortcut.register(newHotkey, () => {
			win.webContents.send('newHotkey');
		});

		globalShortcut.register(focus, () => {
			win.focus();
		});

		globalShortcut.register(transparent, () => {
			ipcMain.emit('toggle-opacity');
		});
	}

	private unregisterGlobal(win: BrowserWindow) {
		const {focus, newHotkey, transparent} = this.hotkeys;

		globalShortcut.unregister(focus);
		globalShortcut.unregister(newHotkey);
		globalShortcut.unregister(transparent);
	}

	public static localShortcuts() {
		Mousetrap.bind('ctrl+t', () => { ipcRenderer.send('toggle-opacity')});
		Mousetrap.bind('ctrl+x', () => { ipcRenderer.emit('newHotkey') });
	}
}