function diff (oldTree, newTree){
    let patches = {};
    let index = 0;
    // 递归树，比较后的结果放到补丁包中
    walk(oldTree, newTree, index, patches);
    return patches;
}
function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    // 判断老的属性和新的属性的关系
    for (let key in oldAttrs) {
        if (oldAttrs[key]!== newAttrs[key]) {
            // 有可能是undefined
            patch[key] = newAttrs[key];
        }
    }
    for(let key in newAttrs) {
        // 老节点中没有新节点属性
        if (!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
function diffChildren(oldChildren, newChildren, index, patches){
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child,idx)=> {
        // 索引不应是index了 ------------
        walk(child, newChildren[idx], ++index, patches);
    });
}
function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]'
}
function walk(oldNode, newNode, index, patches) {
    let currentPatch = [];
    if (isString(oldNode) && isString(newNode)) {
        if (oldNode !== newNode) {
            currentPatch.push({
                type: TEXT,
                text: newNode
            });
        }
    } else if (oldNode.type === newNode.type) {
        let attrs = diffAttr(oldNode.props, newNode.props);
        // console.log(attrs);
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type:ATTRS, attrs});
        }
        // 如果有儿子节点，遍历儿子
        diffChildren(oldNode.children, newNode.children, index, patches);
    }
    
    if (currentPatch.length > 0) {
        // 将元素和补丁对应起来放到大补丁包中
        patches[index] = currentPatch;
        console.log(patches);
    }
}
export default diff;

// 规则：当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包{type:'ATTR',attrs: {class: 'list-group'}}

//新的DOM节点不存在{type: 'REMOVE', index: xxx}
//(1)节点类型不相同，直接采用替换模式 {type:'REPLACE',newNode: newNode}
//文本变化{type：'TEXT'，text: 1}