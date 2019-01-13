import { BrowserWindow } from "electron";

export enum REv {
    newHotkey = 'new-hotkey',
    initShortcuts = 'init-shortcuts',
}

export interface ipcRModule {
	emit: (event: REv, ...args: any[]) => void;
	on: (event: REv, ...args: any[]) => void;
}

export class BrowserWindowModule extends BrowserWindow{
	emit: (event: REv, ...args: any[]) => boolean = this.emit;
}