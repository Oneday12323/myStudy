//闭包是将函数内部和外部连接起来的一座桥梁
//es6通过闭包可以实现私有属性，该私有属性通过get 和set方法来读取，

let _age = 4
class Animal {
  constructor (type) {
    this.type = type
  }
  // 利用闭包实现对 _age 这一私有属性的保护
  get age () { // 函数前加 get 或 set 就变成了属性，ES6 中允许把属性放在类的最顶层
    return _age // 注意：返回值和“出入口”的名字不能一样（比如这里如果写成 return age 就会导致死循环了）
  }
  set age (val) {
    if (val > 4 && val < 7) {
      _age = val
    }
  }
  // 注意：上面的两个 age 可以理解为访问时的出入口，而不是实例对象的属性名。
  eat () { // 定义实例对象的方法
    console.log('I am eating food...')
  }
}
let dog = new Animal('dog')
console.log(dog.age) //4
dog.age = 5
dog.age = 8
console.log(dog.age) // set 和 get 本身是函数，但是调用它们时是按属性调用的，所以这里的 age 后面不加括号
console.log(dog._age)

/* 运行结果：
4
5
undefined  因为dog没有_age这个属性
*/


//闭包有什么作用？
/* 
    做一个防抖：
        用户频繁触发某个东西，只想让他最后一次生效
        比如搜索功能：
            实时搜索，实时请求接口------这样会导致页面性能的问题

            写一个input，当触发oninput事件时发送请求
                由于每次输入都会触发请求，所以用防抖来优化一下性能，此时用到闭包


                定时器不断的更新，直到更新到最后一次的定时器

                并没有说明通过闭包处理防抖的必要性。定义一个全局timer一样可以。
                之所以用闭包，还是为了达到防抖函数的复用，而不必给每个防抖函数创建一个全局变量timer

        function debounce(fn,delay){
            let timer = null;  //用来存定时器
            return function(){
                if(timer){
                    clearSetTimeout() ; //如果还停在上一次的触发，则清除定时器，重新开始定时器
                }
                timer=setTimeout(()=>{
                    fn&&fn()  //执行业务代码
                },delay)
            }
        }


    做一个节流：
        滚动条：滚动条在滚动的时候要去进行请求，或者执行某种操作，没必要频繁执行，
        此时需要节流，滚动到一定的程度再去进行请求

        节流需要一个标识，来控制是否执行完毕，如果已经在执行了就不需要再次执行

        function throttle(fn,delay){
            let flag = true;  //代表执行结束
            return function(){
                if(!flag){   //说明上一次还在执行
                    return 
                }
                flag=false; //执行开始
                setTimeout(()=>{
                    fn&&fn(); //执行业务代码
                    flag=true； //执行结束
                },delay)
            }
        }


*/

/* 
        闭包优缺点：
            读取函数内部的变量
            避免全局污染

            闭包的缺点：导致无法被垃圾回收机制所清除，会大量消耗内存
            不恰当使用闭包可能会造成内存泄露的问题

            如果用闭包，在退出函数之前，将不使用的局部变量全部清除
*/