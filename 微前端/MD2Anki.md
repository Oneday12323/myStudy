# Test
## 写一个handleRouter方法来处理路由变化，当路由发生变化的时候，就去调用这个函数
```
export const handleRouter=()=>{
```

## 匹配子应用 2.1获取到当前的路由路径 `window.location.pathname`

注册列表里面的activeRule就是我们需要匹配的路由  遍历储存子应用的列表，拿着当前的路由路径和列表里的每一项的activeRule进行匹配，匹配成功则找到了子应用
```
const apps = getApps()
const app = apps.find(item=>window.location.pathname.startWith(item.activeRule))

if(!app){
     return 
}
```
## qiankun是怎么进行通信的
在 qiankun 微前端框架中，通信是通过全局事件总线来完成的。
qiankun在主应用程序中创建了一个全局事件总线，可以通过 window.addEventListener 和 window.dispatchEvent 方法来注册和触发全局事件。
在子应用程序中，可以使用 window.__POWERED_BY_QIANKUN__ 全局变量来判断应用是否运行在 qiankun 微前端环境下，如果是，则可以通过 window.top 访问全局事件总线，从而完成应用之间的通信。
例如，子应用可以通过以下方式向主应用发送事件
```
if (window.__POWERED_BY_QIANKUN__) {
  window.top.dispatchEvent(new CustomEvent('event-name', { detail: data }))
}
```
主应用可以通过以下方式监听来自子应用的事件
```
if (window.__POWERED_BY_QIANKUN__) {
  window.addEventListener('event-name', (event) => {
    const data = event.detail
    // 处理事件数据
  })
}
```
总的来说，qiankun 通过全局事件总线来实现应用程序之间的通信，这种方式比较简单，但是由于所有应用程序都共享同一个全局事件总线，因此需要避免事件名称冲突和数据交换安全性等问题。

## 如何避免事件名称冲突和数据交换安全性的问题
1. 使用命名空间来避免事件名称冲突：在 qiankun 微前端框架中，由于所有应用程序共享同一个全局事件总线，因此事件名称可能会冲突。为了避免这种情况，可以使用命名空间来对事件进行分类和分组。例如，可以使用以下方式定义事件：
```
window.top.dispatchEvent(new CustomEvent('app1:event-name', { detail: data }))
```
在主应用中，可以采用以下方式来监听事件
```
window.addEventListener('app1:event-name', (event) => {
  const data = event.detail
  // 处理事件数据
})
```
使用命名空间可以确保事件名称的唯一性，并且可以方便地对事件进行分类和分组。
2. 对事件数据进行验证和过滤：在进行应用程序通信时，需要确保数据的安全性和正确性。可以对事件数据进行验证和过滤，确保只有符合特定条件的数据才能进行交换。例如，可以使用以下方式对事件数据进行验证：
```
window.top.addEventListener('event-name', (event) => {
  const data = event.detail
  if (/* 验证数据 */) {
    // 处理事件数据
  }
})
```
通过对事件数据进行验证和过滤，可以确保数据的安全性和正确性。
3. 使用加密技术对敏感数据进行保护：对于敏感数据，可以使用加密技术进行保护。例如，可以使用 HTTPS 协议来加密应用程序之间的通信，或者使用加密算法对数据进行加密。这样可以确保数据在传输过程中不会被窃取或篡改。

## 在 qiankun 微前端框架中，由于子应用程序和主应用程序不在同一个域名下，可能会出现跨域访问的问题。这时可以通过以下方式来解决跨域问题：

1. 使用 iframe 进行子应用程序渲染：在 qiankun 微前端框架中，子应用程序可以使用 iframe 来进行渲染。由于 iframe 和主应用程序不在同一个 JavaScript 执行环境中，因此不存在跨域问题。在使用 iframe 进行子应用程序渲染时，需要注意 iframe 中的 JavaScript 代码与主应用程序中的 JavaScript 代码是相互独立的，它们无法直接通信。可以使用 postMessage API 来实现 iframe 和主应用程序之间的通信。


2. 配置跨域资源共享（CORS）：如果需要在子应用程序和主应用程序之间进行 AJAX 调用，可以使用跨域资源共享（CORS）来解决跨域问题。CORS 是一种跨域解决方案，可以让服务器在 HTTP 响应头中包含 Access-Control-Allow-Origin 标头，从而允许其他域名下的页面访问该资源。

3. 使用反向代理：如果子应用程序和主应用程序之间的跨域问题无法通过上述方式解决，可以考虑使用反向代理来解决。反向代理是一种服务器配置，它可以将客户端请求转发到目标服务器，并将目标服务器的响应返回给客户端。可以在反向代理中配置代理规则，将子应用程序的请求转发到主应用程序的域名下，从而解决跨域问题。

## 在做微前端的时候为什么不用iframe而是选择用qiankun？
虽然可以使用 iframe 技术来实现微前端，但是 qiankun 微前端框架提供了更多的优势：

1. 更好的性能：在 qiankun 微前端框架中，子应用程序是以 JavaScript 模块的形式加载的，而不是使用 iframe。这样可以避免 iframe 的性能问题，如额外的网络请求、多个 JavaScript 执行上下文等问题。同时，qiankun 微前端框架使用了浏览器端的模块加载器，可以更好地控制 JavaScript 代码的加载和执行。

2. 更好的隔离性：在 qiankun 微前端框架中，每个子应用程序都有自己的 JavaScript 执行上下文，不会影响其他子应用程序或主应用程序的 JavaScript 代码。这种隔离性可以防止子应用程序之间的 JavaScript 冲突和依赖冲突，从而提高了应用程序的可靠性和稳定性。

3. 更好的扩展性：在 qiankun 微前端框架中，可以方便地添加、删除或更新子应用程序，从而实现应用程序的动态扩展。而在使用 iframe 技术时，需要手动添加或删除 iframe 元素，不够方便。

4. 更好的开发体验：在 qiankun 微前端框架中，每个子应用程序都是独立的项目，可以使用不同的框架、技术栈和构建工具进行开发。这种灵活性可以提高开发团队的生产力和工作效率。

- 综上所述，使用 qiankun 微前端框架可以获得更好的性能、隔离性、扩展性和开发体验，因此在实现微前端时选择 qiankun 微前端框架更为推荐。

## qiankun的js沙箱实现原理
- qiankun 微前端框架中的 JavaScript 沙箱是基于浏览器原生的 JavaScript 沙箱技术实现的。具体来说，**qiankun 在每个子应用程序中都创建了一个沙箱环境，用于隔离子应用程序的 JavaScript 代码和全局对象，避免子应用程序之间的 JavaScript 冲突和依赖冲突**。

在沙箱环境中，qiankun 使用浏览器的原生 JavaScript 沙箱技术，如 iframe、Content-Security-Policy（CSP）和 JavaScript Proxy 等技术，来实现以下功能：

1. 隔离全局对象：在沙箱环境中，每个子应用程序都有自己的全局对象，不会影响其他子应用程序或主应用程序的全局对象。这种隔离性可以防止子应用程序之间的全局变量冲突和依赖冲突。

2. 隔离 DOM：在沙箱环境中，每个子应用程序都可以使用自己的 DOM 元素，不会影响其他子应用程序或主应用程序的 DOM 元素。这种隔离性可以防止子应用程序之间的 CSS 样式冲突和 DOM 结构冲突。

3. 隔离 JavaScript 代码：在沙箱环境中，每个子应用程序都有自己的 JavaScript 执行上下文，不会影响其他子应用程序或主应用程序的 JavaScript 代码。这种隔离性可以防止子应用程序之间的 JavaScript 冲突和依赖冲突。

4. 安全性控制：在沙箱环境中，qiankun 使用 Content-Security-Policy（CSP）技术来限制子应用程序的 JavaScript 代码 只能访问特定的域名或 URL，从而防止子应用程序的 JavaScript 代码进行恶意操作或跨站攻击。

5. 对象代理：在沙箱环境中，qiankun 使用 JavaScript Proxy 技术来代理全局对象和 DOM 元素，从而可以在访问全局对象或 DOM 元素时进行拦截和限制。这种限制可以防止子应用程序的 JavaScript 代码修改主应用程序的全局对象或 DOM 元素。

综上所述，qiankun 的 JavaScript 沙箱是基于浏览器原生的 JavaScript 沙箱技术实现的，利用 iframe、Content-Security-Policy（CSP）和 JavaScript Proxy 等技术来实现隔离性、安全性和限制性控制，从而保证子应用程序之间的 JavaScript 代码不会相互影响，提高应用程序的可靠性和安全性。

## js沙箱的实现原理
JavaScript沙箱是一种安全机制，用于在不信任的环境中运行不可信的代码。它提供了一种限制代码访问和修改全局变量和对象的方式，从而保护宿主环境不受恶意代码的影响。

实现JavaScript沙箱的基本思想是创建一个独立的执行环境，该环境与主程序的执行环境隔离开来，使得代码无法访问或修改主程序的变量、对象和函数。

一种简单的实现方式是使用JavaScript的函数作用域和闭包。创建一个全局对象，并在该对象上定义所有的全局变量和函数。然后，将要执行的代码包装在一个匿名函数中，该函数接受全局对象作为参数，并在函数内部创建一个局部变量作为代码的执行环境。在函数内部，可以通过参数引用全局对象，从而访问和修改全局对象中定义的变量和函数。由于代码只能访问全局对象上的内容，它无法直接访问或修改主程序的变量和对象。

例如，以下是一个简单的JavaScript沙箱的实现示例：
```
function createSandbox() {
  var global = {};
  global.console = console;
  global.setTimeout = setTimeout;
  global.setInterval = setInterval;
  // Define other global variables and functions here...

  return function(code) {
    (function(global) {
      eval(code);
    })(global);
  };
}

var sandbox = createSandbox();
sandbox("console.log('Hello, world!');");
```
在这个例子中，createSandbox函数创建一个沙箱，该沙箱包含全局变量console、setTimeout和setInterval。它返回一个匿名函数，该函数接受一个字符串参数表示要执行的代码，并将其作为参数传递给一个立即执行的匿名函数，该函数接受全局对象作为参数，并通过eval()函数在局部环境中执行代码。由于eval()函数的执行环境是一个局部变量，代码无法访问主程序的变量和对象。

在调用sandbox函数时，它将要执行的代码作为参数传递给沙箱，该沙箱在自己的执行环境中执行代码，从而保护主程序不受恶意代码的影响。

qiankun框架的js沙箱实现代码
qiankun是一个基于微前端的解决方案，它可以将多个子应用程序集成到一个主应用程序中。为了确保每个子应用程序在自己的沙箱中运行，qiankun框架提供了一种名为qiankun Sandbox的沙箱实现。

以下是qiankun Sandbox的实现代码示例：
```
import { SandBox } from 'qiankun';

class QiankunSandbox extends SandBox {
  constructor() {
    super();

    // Define the global variables and functions that the sandbox can access
    this.global = {
      window: window,
      location: location,
      console: console,
      setTimeout: setTimeout,
      setInterval: setInterval,
      clearTimeout: clearTimeout,
      clearInterval: clearInterval,
      ...other global variables and functions...
    };

    // Create a new context for the sandbox
    this.context = new window.Proxy({}, {
      set: (target, key, value) => {
        // Prohibit sandbox from modifying global variables
        throw new Error(`Cannot set ${key} property in sandbox context.`);
      },
      get: (target, key) => {
        // Return the value of the global variable or function
        if (this.global[key]) {
          return this.global[key];
        }
        // Prohibit sandbox from accessing non-existent global variables
        throw new Error(`Cannot find ${key} property in sandbox context.`);
      },
    });
  }

  // Override the runInContext method to run the code in the sandbox context
  runInContext(code) {
    const fn = new Function('context', code);
    fn(this.context);
  }
}

export default QiankunSandbox;
```
在这个例子中，QiankunSandbox继承了qiankun的SandBox类，并覆盖了runInContext方法以在沙箱环境中运行代码。在构造函数中，它定义了沙箱可以访问的全局变量和函数，并创建了一个新的沙箱上下文。这个上下文是一个代理对象，可以拦截对它的访问，以确保沙箱不能修改全局变量，也不能访问不存在的全局变量。

当调用runInContext方法时，它使用Function构造函数创建一个新的函数，该函数接受上下文作为参数，并在上下文中执行代码。由于使用了代理对象，沙箱环境无法访问主应用程序的全局变量和函数，从而保护主应用程序免受恶意代码的影响。

