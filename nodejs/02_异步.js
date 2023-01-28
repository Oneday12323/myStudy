/* 
    1.进程和线程
        -进程(工厂)
            -程序的运行环境
        -线程(工人)
            -实际进行运算的东西
    2.同步
        -通常情况下代码都是自上向下一行一行执行
        -前边的代码不执行后面的代码也不会执行
        -同步的代码执行会出现阻塞的情况
        -一行代码执行慢会影响到整个程序的执行
    
    3.解决同步问题
        -java python
            -多线程来解决(对计算机性能要求高，对代码编写要求高)
        -node.js
            -通过异步方式来解决

    4.异步
        -一段代码的执行不会影响到程序的其他代码
        -异步的问题：
            -异步的代码无法通过return设置返回值
        -特点：
            -不会阻塞其他代码的执行
            -需要通过回调函数来返回结果
        -基于回调函数的异步带来的问题
            -代码的可读性差
            -代码的可调试性差

    5.回调地狱
        -为什么会有？
            -因为异步调用必须要通过 回调函数 来接收返回结果
        -解决问题
            -需要一个东西，代替回调函数来给我们返回结果
            -Promise横空出世
                -Promise是一个可以用来存储数据的对象
                    -Promise存储数据的方式比较特殊，这种特殊的方式使得Promise可以用来存储数据
*/
function sum (a,b,cb){
    let bagin = Date.now()

    /* while(Date.now() - bagin <10000){}
    return a+b */
    
    //setTimeout(()=>{return a+b},10000)

    setTimeout(()=>{
        cb(a+b)    //调用回调函数 cb(),并且传入参数a+b ，该回调函数的返回值是console.log(a+b)
    },1000)

}
console.log(1111)
let result = sum(123,456,(result)=>{
    console.log(result)
    sum(result,10,(result)=>{
        console.log(result)
        sum(result,10,(result)=>{
            console.log(result)
        })
    })
})

console.log(7777)
