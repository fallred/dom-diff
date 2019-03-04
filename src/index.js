import { createElement, render, renderDom } from './element';
import diff from './diff';
let vertualDom1 = createElement('ul', {class: 'list', style: {display: 'none', backgroundImage: ''}}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c']),
]);

let vertualDom2 = createElement('ul', {class: 'list-group', style: {display: 'none', backgroundImage: ''}}, [
    createElement('li', {class: 'item'}, ['1']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['3']),
]);
let patches = diff(vertualDom1, vertualDom2);
// console.log(vertualDom);
// 将虚拟dom转化成了真实dom渲染到页面上
// let el = render(vertualDom);
// renderDom(el, window.root);
// console.log(el);


// DOM DIff 比较两个虚拟DOM的区别，比较两个对象的区别
// dom diff作用 根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新dom

