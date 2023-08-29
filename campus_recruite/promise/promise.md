# Promise
## **1. promise.catch() 和 try/catch有什么区别？**
promise.catch() 和 try/catch 的主要区别有:

1. 语法上:
  - promise.catch() 是 promise 的一个方法,需要调用 then() 或 catch() 才会执行。
  - try/catch 是 JavaScript 的语言结构。

2. 错误处理范围:
  - promise.catch() 只能捕获到Promise执行链中抛出的错误。
  - try/catch 可以捕获同步代码块中抛出的错误。 

3. 执行时机:
  - promise.catch() 是异步的,等待Promise执行完成。
  - try/catch 捕获的是同步代码块的错误。

4. 处理方式:
  - promise.catch() 中返回非错误的值可继续链式调用。
  - try/catch 必须手动再抛出错误继续传播。

5. 使用场景:
  - promise.catch() 更多适用于异步链式逻辑。
  - try/catch 更多适用于处理同步代码块的异常。

总之,promise.catch() 是基于 Promise 进行错误处理,而try/catch是 JavaScript 的基础语法。两者可以配合使用,但原理和适用场景不同。

## **2. 手写promise.race()**

手写一个 promise.race 的实现如下:

```js
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(resolve, reject);  
    }
  })
}

// 用法
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one')
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two')
});

Promise.myRace([promise1, promise2]).then((result) => {
  console.log(result); // 'two'
});
```

这个实现主要做了以下几件事情:

1. 返回一个新的Promise作为race的结果。

2. 遍历传入的promise数组,每一项都执行一次`.then`处理。

3. 在第一个promise resolve或者reject时,就resolve/reject`race` Promise的结果。

4. 后续的promise结果不会再影响最终结果。

这样就实现了`.race` 的效果,获得最快改变状态的Promise结果。

在 Promise.myRace 的实现中,Promise.resolve(promises[i]).then(resolve, reject)这一行实现了以下两点:

3. 在第一个promise resolve或者reject时,就resolve/rejectrace Promise的结果。

4. 后续的promise结果不会再影响最终结果。

让我详细解释下:

Promise.resolve(promises[i])这一步是为了兼容传入的promises数组中的元素可能不是promise的情况。

如果元素不是promise,将其包装成一个已resolve的promise。

然后对每个promise执行.then(resolve, reject)操作。

这就实现了一旦任意一个promise完成(resolve或reject),就会调用resolve或reject回调。

由于promise状态一旦改变就不会再改变,所以第一个完成的promise结果将决定race promise的结果。

后续promise的结果不会影响这个已经“锁定”的结果。

即使后续的promise最先完成,也不会覆盖之前已resolve/reject的race结果。

这样就实现了race的语义,获得最快改变状态的Promise结果。

所以Promise.resolve().then()这种机制很巧妙地实现了race的效果。



**promise.race() 在以下几种情况下会比较有用:**

1. 超时处理

可以通过race一个延迟的promise来实现超时:

```js
const timeout = new Promise((_, reject) => {
  setTimeout(() => reject('Timeout!'), 5000)
})

Promise.race([fetch('/api'), timeout])
  .then(res => res.json())
  .catch(err => ...) 
```

如果fetch()在5秒内没有结果,就会触发超时错误。

2. 竞争条件

当多个异步任务竞争,只取第一个返回结果的场景:

```js 
const req1 = fetch('/api1') 
const req2 = fetch('/api2')

Promise.race([req1, req2]).then(res => {
  // 取较快的请求结果
})
```

3. 可取消的异步操作

通过向race传入一个可控制的promise,可以在需要时触发reject取消操作:

```js
let abortCtrl = new AbortController();
let signal = abortCtrl.signal;

Promise.race([asyncOperation(), signal])
  .catch(e => ...) 

abortCtrl.abort() // 触发reject,取消操作
```

所以,race适用在需要快速响应、竞争场景以及可中止操作等情况。但不建议直接用于正常并发,因为它会舍弃较慢操作的结果。

## **3. 手写promise.all()**

可以这样实现一个 Promise.myAll:

```js
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new TypeError('promises must be an array')
    }

    let resolvedCount = 0;
    let promiseNum = promises.length;
    let resolvedValues = new Array(promiseNum);

    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        value => {
          resolvedCount++
          resolvedValues[index] = value

          if (resolvedCount === promiseNum) {
            return resolve(resolvedValues)
          }
        },
        error => reject(error)  
      )
    })
  })
}
```

主要思路:

1. 检查传入是否为数组,否则抛错

2. resolvedCount统计已resolve的数量

3. resolvedValues存储每个promise resolve的值

4. 遍历promises数组,执行then获取每个结果

5. 当resolvedCount等于总数时,resolve最终结果

6. 如果任一 promise 失败,则直接 reject

这样当所有传入的 promise 都完成时,就可以得到全部 resolve 结果。


在 Promise.myAll 的实现中,return resolve(resolvedValues)被包装在 Promise.resolve 中的主要原因是为了把返回的值从Promise执行上下文中解包出来。

如果直接写成:

```js 
if (resolvedCount === promiseNum) {
  return resolvedValues;
}
```

由于这一步是在 Promise 的执行器函数内部,直接 return 一个值不会使 myAll 返回的 Promise 进入 resolved 状态。

而是会被当成执行器函数的返回值,被忽略掉。myAll 返回的 Promise 会一直处于 pending 状态,而不是被 resolve。

所以这里需要使用:

```js
return resolve(resolvedValues);
```

用 Promise.resolve() 包装一下返回的值,以显式地把 resolvedValues 传到 myAll Promise 的 resolve 函数中。

这才可以让 myAll 返回的 Promise 被 resolve,从而达到 Promise.all 的效果。

Promise.resolve() 可以把一个非 Promise 的值“包装”成一个 resolved 状态的 Promise。很巧妙地将值从 Promise 执行上下文传递了出来。


## **4. js中的并发是什么？什么时候需要用到并发？**

> JS中的并发(Concurrency)指的是程序中多个任务可以同时执行或交替执行的能力。

由于JavaScript是单线程执行的,无法真正实现多线程式的并行,所以JS中的并发实际是通过事件循环快速交替执行多个任务实现的。

什么时候需要用到并发?

1. 需要同时请求多个接口获取数据,等所有接口返回后统一处理。

2. 需要同时进行一些高延迟的I/O操作,如读取文件、数据库查询等。

3. 需要频繁交替执行一些小任务,如轮询、间隔处理等。

4. 需要同时开启多个定时任务或间隔回调。

5. 需要最大程度利用CPU进行计算密集型任务。

实现并发的常用方式有:

- Promise.all: 并发执行多个Promise
- Async/await: 在顶层await多个异步任务
- Web Worker: 创建多个线程
- setTimeout/setInterval: 交替执行任务
- requestIdleCallback:利用空闲时间执行任务

所以对于一些需要并发操作或者计算的场景,合理利用JS的并发处理能力,可以获得很好的性能优化。


## **5. js中的并发处理**

> 正常的并发场景,需要等待所有异步操作都完成,可以使用 Promise.all() 来实现:

```js
const p1 = fetch('/api1');
const p2 = fetch('/api2');

Promise.all([p1, p2])
  .then(([res1, res2]) => {
    // 处理两个请求的结果
  }); 
```

Promise.all() 会并发执行传入的 Promise,等到所有 Promise 都 resolve 后才会resolve。即使有请求失败,也会等待所有请求完成。

另外,Async/Await 的写法也很适合处理并发场景:

```js
async function concurrent() {

  const p1 = fetch('/api1');
  const p2 = fetch('/api2');
  
  const res1 = await p1; 
  const res2 = await p2;

  // 处理结果
}
```

async/await 会阻塞后续代码,等待 Promise 完成后再继续执行。可以非常直观地表达并发等待的效果。

还可以用任务队列的方式实现并发控制:

```js
const queue = [];

function dispatch(promise) {
  promise.then(() => {
    if(queue.length) {
      queue.shift()(); 
    }
  });

  queue.push(promise);
}

dispatch(fetch('/api1'));
dispatch(fetch('/api2'));
```

所以,Promise.all、async/await 和任务队列都可以优雅地实现正常的并发场景。


























对于Promise相关的代码读题,输出结果分析需要注意以下几点:

1. Promise是一个异步操作,其回调函数会在当前执行栈完成后被调用。

2. Promise的`.then`和`.catch`返回一个新的Promise,可以链式调用。

3. `.then`和`.catch`中`return`一个值会被包装成Promiseresolve出去。

4. Promise的`.then`或`.catch`中抛出异常会被后续的`.catch`捕获。

5. Promise一旦状态改变就无法更改,`resolve`或`reject`只会被调用一次。

6. Promise的`.then`或`.catch`参数期望是函数,传入非函数则会发生值透传。

7. Promise默认是pending状态,`resolve`和`reject`函数触发执行后分别改变为fulfilled和rejected状态。

具体分析时,要画出Promise执行链,观察每个Promise的状态变化,根据异步执行规则逐步推导输出结果。多练习这类题目可以帮助掌握Promise的规范行为。