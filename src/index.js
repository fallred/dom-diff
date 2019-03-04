import { createElement, render, renderDom } from './element';
let vertualDom = createElement('ul', {class: 'list', style: {display: 'none', backgroundImage: ''}}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c']),
]);
console.log(vertualDom);
let el = render(vertualDom);
renderDom(el, window.root);
console.log(el);