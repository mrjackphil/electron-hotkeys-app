import { BrowserWindow } from "electron";

export interface KeyboardKeys {
	keymode: string,
	hide: string,
	focus: string,
	delete: string,
	transparent: string
	newHotkey: string,
}

export default class IShortcuts {
    hotkeys: KeyboardKeys = this.hotkeys;
    init: (win: BrowserWindow) => void = this.init;
    register: (win: BrowserWindow) => void = this.register;
    unregister: (win: BrowserWindow) => void = this.unregister;
}