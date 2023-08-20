// /*
//     通过async可以快速的创建异步函数
// */

// function fn(){
//     return Promise.resolve(10)
// }
// fn().then(r=>console.log(r))

// /*
//     通过async可以快速的创建异步函数
//         异步函数的返回值会自动封装到一个Promise中返回
//     在async声明的异步函数中可以使用await关键字来调用异步函数
// */
async function fn2(){
    return 5
}
const res = fn2()
console.log(res)
fn2().then(r=>console.log(r))

// function sum(a,b){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(a+b)
//         },2000)
//     })
// }

// async function fn3(){
//     //SubmitEvent()
//     sum(123,456).then(r=>console.log(r))
// }
// fn3()
// const re = Promise.resolve(10) //同步任务
// console.log(re)

// var separateDigits = function (nums) {
//   const splitDigit = (n) => {
//     return (n + "").split("").map(Number);
//   };

//   let arr = [];

//   for (let i = 0; i < nums.length; i++) {
//     let num = splitDigit(nums[i]);
//     console.log(num);
//     arr = arr.concat(num);
//     console.log(arr);
//   }
//   return arr;
// };
// separateDigits([13, 25, 83, 77]);

// var maxCount = function (banned, n, maxSum) {
//   //找出1-n之间的数  1<=num<=n && num不存在于banned中 && num排序相加 ，
//   //用一个sum去接收结果，如果结果小于maxSum 就将num放入arr

//   let num = 1;
//   let sum = 0;
//   let arr = [];
//   while (num <= n) {
//     if (banned.indexOf(num) == -1) {
//       console.log("num:", num);
//       sum = sum + num;
//       console.log("sum:", sum);
//       if (sum <= maxSum) {
//         arr.push(num);
//         console.log("arr:", arr);
//       }
//     }
//     num++;
//   }
//   console.log(arr);
//   return arr;
// };
// maxCount([1, 6, 5], 5, 6);


// 通过async可以快速创建异步函数，异步函数的返回值会封装到一个Promise中去执行
// 
