"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mk = function (el) { return el.map(function (e) { return document.createElement(e); }); };
var div = function () { return mk(['div']); };
var input = function () { return mk(['input']); };
exports.chParent = function (el, ch) { return el.map(function (elem) { return ch.map(function (e) { elem.appendChild(e); return elem; }); }); };
exports.chChilds = function (el, ch) { return el.map(function (elem) { return ch.map(function (e) { return elem.appendChild(e); }); }); };
var cls = function (el, cls) { return el.map(function (e) { e.classList.add(cls); return e; }); };
// const clss = (el: HTMLElement[], clss: string[]) => el.map((e) => clss.forEach( (c) => cls(e, c) ));
var conc = function () {
    var f = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        f[_i] = arguments[_i];
    }
    return f.reduce(function (e, ab) { return function () { return ab().concat(e()); }; });
};
var row = function () { return cls(div(), 'row'); };
var htk = function () { return cls(input(), 'hotkey'); };
exports.cInput = function () { return exports.chParent(row(), conc(htk, htk)()); };
// export const cInput = (el: Element | null) => el ? ch([el], ch(row(), conc(htk, htk)())[0] ) : null;
