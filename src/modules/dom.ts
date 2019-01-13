const mk = (el: string) => document.createElement(el);
const mks = (els: string[]) => els.map( e => mk(e));
const div = () => mk('div');
const input = () => mk('input');
export const chParent = (el: HTMLElement[], ch: HTMLElement[]) => el.map ( elem => ch.map( (e) => { elem.appendChild(e); return elem;} ) );
export const chChilds = (el: HTMLElement[], ch: HTMLElement[]) => el.map ( elem => ch.map( (e) => elem.appendChild(e) ) );
const cls = (el: HTMLElement, cls: string) => {el.classList.add(cls); return el;};
// const clss = (el: HTMLElement[], clss: string[]) => el.map((e) => clss.forEach( (c) => cls(e, c) ));

const conc = (...f: Array<() => any[]>) => f.reduce( (e, ab) => () => ab().concat(e()) );
const row = () => cls( div(), 'row' );
const htk = () => cls( input(), 'hotkey' );

const create = (el: Element, childs: Array<() => Element>) => { childs.map( e => el.appendChild(e()) ); return el; };

// export const cInput = () => chParent( row(), conc( htk, htk )() );
export const cInput = () => create( row(), [htk, htk] );

// export const cInput = (el: Element | null) => el ? ch([el], ch(row(), conc(htk, htk)())[0] ) : null;
