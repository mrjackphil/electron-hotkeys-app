const mk = (el: string[]) => el.map( (e) => document.createElement(e) );
const div = () => mk(['div']);
const input = () => mk(['input']);
export const chParent = (el: HTMLElement[], ch: HTMLElement[]) => el.map ( elem => ch.map( (e) => { elem.appendChild(e); return elem;} ) );
export const chChilds = (el: HTMLElement[], ch: HTMLElement[]) => el.map ( elem => ch.map( (e) => elem.appendChild(e) ) );
const cls = (el: HTMLElement[], cls: string) => el.map( e => { e.classList.add(cls); return e;} );
// const clss = (el: HTMLElement[], clss: string[]) => el.map((e) => clss.forEach( (c) => cls(e, c) ));

const conc = (...f: Array<() => any[]>) => f.reduce( (e, ab) => () => ab().concat(e()) );
const row = () => cls( div(), 'row' );
const htk = () => cls( input(), 'hotkey' );
export const cInput = () => chParent( row(), conc( htk, htk )() );

// export const cInput = (el: Element | null) => el ? ch([el], ch(row(), conc(htk, htk)())[0] ) : null;
