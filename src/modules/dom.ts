const mk = (el: string[]) => el.map( (e) => document.createElement(e) );
const div = () => mk(['div']);
const input = () => mk(['input']);
const child = (el:Element, ch: HTMLElement[]) => ch.map( (e) => el.appendChild(e) );
const cls = (el: HTMLElement, cls: string) => { el.classList.add(cls); return el };
const clss = (el: HTMLElement[], clss: string[]) => el.map((e) => clss.forEach( (c) => cls(e, c) ));

const conc = (...f: Array<() => any[]>) => f.reduce( (e, ab) => () => ab().concat(e()) );
export const cInput = (el: Element | null) => el ? clss(child(el, conc(input, input)()), ['hotkey']) : null;
