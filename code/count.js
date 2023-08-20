// 计数器
let counter = (n) => {   
    return () => {
        return n++; // return n;  n=n++
    };
}

let count0 = counter(10);  //  count0 = ()=> 10++
let n1 = count0(); // 10  n=11
let n2 = count0(); // 11  n=12
console.log(n1,n2,count0()); 


/* 
要实现一个计数器函数，需要在每次调用计数器函数时返回上一次返回的值加 1。
由于需要记住上一次返回的值，可以使用闭包来实现。 */
//闭包：