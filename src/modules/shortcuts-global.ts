import { globalShortcut, BrowserWindow, ipcMain } from "electron";
import IShortcuts, {KeyboardKeys} from '../entities/shotcuts';
import { REv } from "../entities/ipcs";

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
			this.register(win);
			setTimeout( () => this.unregister(), 1000);
		});

	}
	public register(win: BrowserWindow) {
		const {focus, newHotkey, transparent} = this.hotkeys;

		globalShortcut.register(newHotkey, () => {
			win.webContents.send(REv.newHotkey);
		});

		globalShortcut.register(focus, () => {
			win.focus();
		});

		globalShortcut.register(transparent, () => {
			ipcMain.emit('toggle-opacity');
		});
	}

	public unregister() {
		const {focus, newHotkey, transparent} = this.hotkeys;

		globalShortcut.unregister(focus);
		globalShortcut.unregister(newHotkey);
		globalShortcut.unregister(transparent);
	}

}