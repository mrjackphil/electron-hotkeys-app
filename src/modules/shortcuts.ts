import { globalShortcut, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import Mousetrap from 'mousetrap';
import IShortcuts, {KeyboardKeys} from '../entities/shortcuts';

export default class Shortcuts implements IShortcuts{
	hotkeys: KeyboardKeys;
	constructor() {
		this.hotkeys = {
			keymode: 'CmdOrCtrl+.',
			hide: '',
			focus: 'CmdOrCtrl+F',
			newHotkey: 'CmdOrCtrl+X',
			delete: '',
			transparent: 'CmdOrCtrl+T',
		}
	}

	public init(win: BrowserWindow) {
		const {keymode} = this.hotkeys;

		globalShortcut.register(keymode, () => {
			this.registerGlobal(win);
			setTimeout( () => this.unregisterGlobal(win), 1000);
		});

	}
	public registerGlobal(win: BrowserWindow) {
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

	public unregisterGlobal(win: BrowserWindow) {
		const {focus, newHotkey, transparent} = this.hotkeys;

		globalShortcut.unregister(focus);
		globalShortcut.unregister(newHotkey);
		globalShortcut.unregister(transparent);
	}

	public localShortcuts() {
		const {transparent, newHotkey} = this.hotkeys;
		function mt(key: string) { return key.replace('CmdOrCtrl', 'ctrl') }
		Mousetrap.bind(mt(transparent), () => { ipcRenderer.send('toggle-opacity')});
		Mousetrap.bind(mt(newHotkey), () => { ipcRenderer.emit('newHotkey') });
	}
}