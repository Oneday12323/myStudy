setTimeout(() => {
   
    console.log(1);
   
}, 0);
   

console.log(2); 
   
   
(new Promise((resolve) => {
   
  console.log(3); 
   
})).then(() => {
   
  console.log(4); //这里的then既没有接收成功之后的返回值，也没有返回出去新的结果，状态为pending
   
});

   
console.log(5); 
//2 3 5 1