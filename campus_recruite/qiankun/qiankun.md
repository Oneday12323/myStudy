# qiankun
## **1. qiankun是怎么实现主应用和子应用之间的通信的?**
> qiankun实现主应用和子应用之间通信的主要方式是通过**props传递**。具体来说有以下两种方式:

1. 父传子:主应用可以通过props向子应用传递数据。

在注册子应用时可以配置props选项:

```js
registerMicroApps([
  {
    name: 'subApp',
    entry: '//localhost:8080',
    props: {
      foo: 'bar'
    } 
  }
]);
```

子应用可以通过qiankun的getPublicState方法获取到父应用传递的props。

2. 子传父:子应用可以通过暴露方法给父应用调用的方式向父应用传递数据。

子应用需要通过lifeCycles的afterMount钩子函数暴露方法:

```js
export function afterMount() {
  qiankunWindow.__SUB_APP_METHOD__ = (data) => {
    // ...
  }
}
```

父应用可以通过子应用暴露的方法名调用方法:

```js
import { getAppInstance } from './qiankun';

const subApp = getAppInstance();
subApp.__SUB_APP_METHOD__('foo'); 
```

此外,qiankun还提供了一些其他方式用于主子应用通信,比如全局事件事件通信、中间件通信等。但主要还是通过props和方法暴露这两种方式实现的。


> qiankun中使用**全局事件**的方式进行主应用和子应用之间的通信,主要是通过监听和触发事件来实现的。

1. 主应用监听事件

主应用可以通过**添加全局事件监听**来监听子应用触发的事件:

```js
import { addGlobalUncaughtErrorHandler } from 'qiankun';

// 监听事件
addGlobalUncaughtErrorHandler((event) => {
  console.log(event); 
});
```

2. 子应用触发事件

子应用通过调用dispatchEvent方法,触发一个全局事件:

```js
// 触发事件
const event = new Event('test');
window.dispatchEvent(event);
```

然后主应用就可以在全局错误处理器中捕获到这个事件,从而实现主子应用之间的通信。

这种方式的优点是实现简单,可以通过事件名称对事件进行区分。但需要主应用提前注册对应事件的监听函数。

如果不仅需要主动通信,还需要子应用接收主应用消息,也可以配合addEventListener的方式,实现双向通信。


> qiankun实现子应用和主应用之间通信的**核心原理**是:

1. 利用 JavaScript 的 Proxy 对象对全局对象进行代理,实现沙箱环境隔离子应用。

2. 主应用和子应用共享一个 Proxy 对象,通过操作这个 Proxy 对象的属性/方法实现通信。

具体技术实现主要包括:

- 主应用在注册子应用时,注入共享的 Proxy 对象。

- 子应用暴露通信方法,存储为 Proxy 对象的属性/方法。

- 主应用可以直接访问 Proxy 对象调用子应用暴露的方法。

- 子应用也可以监听 Proxy 对象属性变化,获得主应用传递的数据。

Proxy 对象就像一个中间代理,主子应用共享它,不直接访问对方的全局对象,来实现隔离和通信。

这种方式避免了直接操作子应用内部状态,也提供了清晰的通信接口,较好地解决了微前端环境下的跨应用通信问题。

代码实现如下：
好的,用代码举个例子说明下 qiankun 的主子应用通信原理:

**主应用:**

```js
// 创建 Proxy 对象
const proxy = new Proxy({}, {
  get() {}, 
  set() {} 
});

// 注册子应用,注入 Proxy 对象
qiankun.registerMicroApps([{
  name: 'subapp',
  entry: '//localhost:3000',
  props: {
    data: proxy
  }
}]); 

// 主应用调用子应用方法
proxy.foo();

// 主应用更新数据
proxy.bar = 'baz';
```

**子应用:**

```js
// 获取主应用传入的 Proxy 对象
export function afterMount(props) {
  const proxy = props.data;
  
  // 暴露方法给主应用调用
  proxy.foo = () => {
    // do something
  };

  // 监听属性变化
  Object.defineProperty(proxy, 'bar', {
    set(value) {
      // 收到主应用数据
    }
  });
}
```

这样通过共享的 Proxy 对象,主子应用就可以双向通信了,并且子应用内部状态也得到了保护。

这就是 qiankun 通过 Proxy 实现的主子应用隔离与通信的核心原理。

qiankun可以通过**addEventListener的方式**实现主应用和子应用之间的**双向通信**:

1. 子应用监听主应用事件

子应用可以在初始化时调用addEventListener监听主应用发送的事件:

```js
// 子应用
export async function bootstrap() {
  window.addEventListener('message', (e) => {
    // 收到主应用事件
  });
}  
```

2. 主应用发送事件给子应用

主应用获取子应用实例后,可以通过postMessage发送事件给子应用:

```js
// 主应用
import { getAppInstance } from '@qiankun/runtime';

const subApp = getAppInstance('subApp');
subApp.proxy.dispatchEvent(new MessageEvent('message', {
  data: 'foo' 
}));
```

3. 子应用发送事件给主应用

子应用通过postMessage发送事件给容器实例:

```js
// 子应用
window.parent.postMessage({
  from: 'subApp',
  data: 'bar'
}, '*'); 
``` 

4. 主应用监听事件

主应用添加message事件监听函数:

```js
// 主应用
window.addEventListener('message', (e) => {
  // 收到子应用消息
});
```

这样通过addEventListener和postMessage的配合,可以实现主子应用的双向通信。

## **2.qiankun的主应用和子应用的项目是怎么部署到服务器的？**



## **3.要把用express搭建的后端，vue3写的前端的项目部署到云服务器上，要怎么操作？**

## **4.ssr和csr的步骤和区别？**

## **5.iframe和qiankun微前端有什么区别？**

## **6.qiankun的css隔离是怎么做的？**

## **7.qiankun的js隔离是怎么做的？**

## **8.qiankun使用过程中会遇到哪些坑？怎么解决这些坑？**

## **9.postMessage是什么**

**postMessage 是 HTML5 新增的一个方法,它提供了跨源窗口之间安全可靠的通信方式。**

postMessage 的语法如下:

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

其中:

- otherWindow - 目标窗口的一个引用,比如 iframe 的 contentWindow 属性、执行 window.open 返回的窗口对象等。

- message - 将要发送到其他 window的数据,可以是任意类型,甚至可以是对象、数组等。

- targetOrigin - 限定接收消息的窗口的源,可以设置为 "*" 表示不限制。

- transfer - 是一串和 message 同时传输的 Transferable 对象。

postMessage 的主要作用有:

- 跨域 iframe 通信
- 页面和页面的弹出窗口之间通信
- 页面和 Web Worker 之间的通信
- 页面和嵌入页面的 Chrome 扩展等通信

postMessage 避免了使用 location hash 或 cookie 的限制,提供更安全可靠的跨源通信方式,被广泛用于网页应用和框架之间的消息传递。

MessageEvent 是 JavaScript 中的一个事件对象,用于消息传递和通信相关的事件,如 postMessage 发送消息时会产生该事件。

MessageEvent 事件对象的主要属性包括:

- data: 存放消息的实际数据
- origin: 发送消息的窗口的源(origin)
- source: 发送消息的窗口对象的引用
- ports: 用于消息通道时传递的端口

例如在使用 postMessage 跨窗口通信时,接收消息窗口中会触发 message 事件,事件对象中会包含发送消息窗口发送的数据:

```js
// 窗口A 
window.postMessage('hello', 'http://example.com');

// 窗口B
window.addEventListener('message', (event) => {
  console.log(event.data); // hello
  console.log(event.origin); // http://example.com
}); 
```

MessageEvent 常用于页面与页面、页面与 Worker、浏览器扩展与页面等不同上下文之间传递消息。WebRTC 中也用到了 MessageEvent 实现客户端点对点通信。

所以 MessageEvent 提供了一个标准化的方式表示和访问消息事件相关数据,很好地服务于消息传递机制。


## **10. 跨域怎么解决？**

> **跨域是指浏览器的同源策略不允许不同源(协议、域名、端口都相同)的客户端脚本进行请求或者资源访问的现象。这个策略是出于安全考虑设计的。**

常见的跨域场景包括:

- 主域名不同的页面访问资源
- 协议不同如Http和Https混合使用 
- 端口号不同的请求交互

解决跨域的常用方式有:

1. JSONP - 通过动态生成script标签请求资源,绕过跨域限制。

2. CORS -服务器设置Access-Control-Allow-Origin头,表明允许跨域请求。

3. 代理 - 通过服务器代理转发请求,避免浏览器端直接跨域。

4. postMessage - 通过postMessage接口跨域传递消息,实际信息不会直接暴露。

5. document.domain + iframe - 限制在二级域名相同时,两个页面可通信。

6. WebSocket - WebSocket协议支持跨域通信。

7. Node代理 - Node.js中间件代理转发跨域请求响应。

8. Nginx反向代理 - Nginx配置反向代理转发跨域请求。

总之,对于跨域问题,建议根据实际需求选择合适的跨域方案。安全性和可靠性都是需要考量的因素。

## **11.webview是什么？**

> **webview简称WV,是移动应用中嵌入的一个微型浏览器。它提供了一个沙箱环境,可以在应用里加载和显示web页面,而且与主程序逻辑相隔离。**

使用webview主要有以下优点:

- 不需要打开系统浏览器,提供更好的用户体验。
- 可以与主App进程通信交互,实现JS接口调用等。
- 对加载资源和代码有更高控制权。
- 不会与主App混合cookie、localStorage等数据。

但是webview也存在一些问题需注意:

- 如果不作防范,存在XSS攻击和代码注入风险。
- 资源加载可能存在优先级或性能问题。
- 不能直接通过IP地址加载页面。
- 跨域权限控制可能需专门处理。
- 无法通过PC浏览器工具直接调试。

所以使用WV需注意:

- 避免WV间共享数据,安全处理WV通信。
- 小心触发WV重新加载时销毁现有状态。
- 测试线上HTTPS环境,不要通过file://加载。
- 合理设置WV用户代理信息。
- 针对WV做好异常捕获与处理。

总之,WV提供了Native应用内嵌web的能力,使用时需要注意安全性与优化。