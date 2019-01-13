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

	public init() {
	}
	public register() {
	}

	public unregister() {

    }

}