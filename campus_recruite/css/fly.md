# didi
## 如何实现的飞入动画效果

**以下是飞入动画的实现**

```javaScript
window.onload = async function () {
    let a = document.getElementById("a");
    let b = document.getElementById("b");

    await flyTo(b, a, {
        duration: 800
    });
};

/**
 * 飞入
 * @param {Node} source 要飞入的节点
 * @param {Node} target 目标节点
 * @param {Object} options 配置项
 * @param {Number} options.duration 动画时长
 */
function flyTo(source, target, options = {}) {
    return new Promise(resolve => {
        options = options || {};
        if (typeof options.duration !== "number") {
            options.duration = 500;
        }
        // 克隆节点并包装
        let frameEl = cloneWithPackage(source);
        // 显示克隆节点
        frameEl.style.display = "block";
        // 获取目标节点的位置
        let targetRect = target.getBoundingClientRect();
        // 获取源节点的位置
        let sourceRect = source.getBoundingClientRect();
        // 计算两个节点的距离
        let distanceX = targetRect.left - (sourceRect.left + sourceRect.width / 2) + window.scrollX;
        let distanceY = targetRect.top - (sourceRect.top + sourceRect.height / 2) + window.scrollY;
        // 设置飞入动画
        frameEl.style.transition = `all ${options.duration}ms`;
        frameEl.style.transform = "translate(" + distanceX + "px," + distanceY + "px)";
        // 设置真实节点的动画运动时长
        frameEl.childNodes[0].style.transition = `all ${options.duration}ms`;
        // 在10%的时候开始透明并缩小消失
        setTimeout(() => {
            frameEl.style.opacity = 0;
            frameEl.childNodes[0].style.transform = "scale(0.1)";
        }, options.duration * 0.1);
        // 监听动画结束事件
        frameEl.addEventListener("transitionend", function fn() {
            // 动画结束后删除节点
            frameEl.parentNode.removeChild(frameEl);
            // 移除监听
            frameEl.removeEventListener("transitionend", fn);
            // 通知外部动画结束
            resolve(void 0);
        });
        // 隐藏原节点
        source.style.display = "none";
    });
}

/**
 * 克隆节点并包装
 * @param {Node} node 要克隆的节点
 * @returns {Node} 包装节点
 */
function cloneWithPackage(node) {
    let frameEl = document.createElement("div");
    frameEl.style.position = "absolute";
    frameEl.style.left = "0px";
    frameEl.style.top = "0px";
    frameEl.style.zIndex = "2147483647";
    frameEl.appendChild(cloneNode(node));
    document.body.appendChild(frameEl);
    return frameEl;
}

/**
 * 克隆节点
 * @param {Node} node 要克隆的节点
 * @returns {Node} 克隆出的节点
 */
function cloneNode(node) {
    // 用内置 API 克隆一个节点元素
    let clone = node.cloneNode();
    // 删除 id 和 class 属性
    clone.id = "";
    clone.className = "";
    // 如果是元素节点，还需要复制样式
    if (clone instanceof Element) {
        let styleStr = "";
        // 获取当前应用的所有样式
        let styleObj = document.defaultView.getComputedStyle(node);
        // 拼接样式字符串
        for (let i = 0; i < styleObj.length; i++) {
            styleStr += styleObj[i] + ":" + styleObj.getPropertyValue(styleObj[i]) + ";";
        }
        // 设置样式
        clone.style = styleStr;
        // 清除动画
        clone.style.animation = "none";
        clone.style.transition = "none";
    }
    for (let i = 0; i < node.childNodes.length; i++) {
        // 递归克隆子节点
        clone.appendChild(cloneNode(node.childNodes[i]));
    }
    // 返回克隆出的节点
    return clone;
}
```

实现了一个飞入动画效果。以下是每个函数的功能解释：

- window.onload 函数：在页面加载完毕后，获取两个节点并执行 flyTo 函数，将一个节点飞入到另一个节点的位置。

- flyTo 函数：实现节点飞入动画效果。参数 source 是要飞入的节点，target 是目标节点，options 是配置项。函数返回一个 Promise 对象，用于在动画结束后通知外部代码。

- cloneWithPackage 函数：克隆一个节点，并将其包装在一个新的 <div> 元素中。返回值是包装后的节点。

- cloneNode 函数：克隆一个节点，并递归复制其所有子节点。返回值是克隆出的节点。如果是元素节点，还会复制其样式，并清除其中的动画效果。

这段代码使用了一些 DOM 操作和 CSS 样式设置，实现了一个比较复杂的动画效果。


## 将这个飞入动画的功能打包成npm包供外部使用过

将这个功能打包成 npm 包，需要进行以下步骤：

1. 创建一个新的 npm 包，可以使用 `npm init` 命令进行初始化。

2. 在包中创建一个 `index.js` 文件，将 `flyTo` 函数和其依赖的函数（如 `cloneWithPackage` 和 `cloneNode`）导出。

3. 在 `package.json` 文件中添加必要的字段，如 `name`、`version`、`description`、`main` 等。还可以添加其他字段，如 `keywords`、`license`、`repository` 等。

4. 执行 `npm login` 命令登录 npm 账号，然后执行 `npm publish` 命令发布包到 npm 上。

5. 在其他项目中使用该包，可以执行 `npm install 包名` 命令进行安装，然后在代码中使用 `require` 或 `import` 导入需要的函数即可。

需要注意的是，在将这个功能打包成 npm 包时，需要将其中用到的浏览器 API（如 `document`、`window` 等）替换成 Node.js 可以使用的 API，以便在非浏览器环境下使用。

