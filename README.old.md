## 生成项目
```
create-react-app dom-diff
```
## 虚拟dom
1. 用javascript对象模拟DOM
2. 把此虚拟DOM转成真实DOM并插入页面中
3. 如果有事件发生修改了虚拟DOM比较两颗虚拟DOM树的差异，得到差异对象
4.把差异对象应用到真正的DOM树上