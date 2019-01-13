import { BrowserWindow } from "electron";

export interface KeyboardKeys {
	keymode: string,
	hide: string,
	focus: string,
	newHotkey: string,
	delete: string,
	transparent: string
}

export default class Shortcuts {
    hotkeys: KeyboardKeys = this.hotkeys;
    init: (win: BrowserWindow) => void = this.init;
    registerGlobal: (win: BrowserWindow) => void = this.registerGlobal;
    unregisterGlobal: (win: BrowserWindow) => void = this.unregisterGlobal;
    localShortcuts: () => void = this.localShortcuts;

}