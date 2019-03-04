import {Element, render} from './element';
let allPatches;
// 默认哪个需要打补丁
let index = 0;
// 设置属性
function setAttr(node, key, value) {
    switch(key){
        case 'value':// node是一个input或者textarea
            if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                node.value=value;
            } else {
                node.setAttribute(key, value);
            }
        break;
        case 'style':
            node.style.cssText = value;
        break;
        default:
            node.setAttribute(key, value);
        break;
    }
}
function patch(node, patches){
    // 给某个元素打补丁
    allPatches = patches
    
    // 给某个元素打补丁
    walk(node);
}
function doPatch(node, patches){
    patches.forEach(patch => {
       switch(patch.type){
        case 'ATTRS':
            for(let key in patch.attrs){
                let value = patch.attrs[key];
                if (value) {
                    setAttr(node, key, value);
                } else {
                    node.removeAttribute(key);
                }
                setAttr(node, key, value);
            }
            break;
        case 'TEXT':
            node.textContent = patch.text;
            break;
        case 'REPLACE':
            let newNode = patch.newNode instanceof Element ? render(patch.newNode) : document.createTextNode(patch.newNode);
            node.parentNode.replaceChild(newNode, node);
            break;
        case 'REMOVE':
            node.parentNode.removeChild(node);
            break;
        default:
            break;
       }
    });
}
function walk(node){
    let currentPath = allPatches[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child=>walk(child));
    if(currentPath) {
        doPatch(node, currentPath);
    }
}
export default patch;