//在调用new的过程中会发生四件事：
/* 
    1.创建一个空对象
    2.设置原型，将实例对象的原型 设置为 函数的prototype对象
    3.让函数的this指向实例对象，执行构造函数的代码
    4.判断函数的返回值类型，如果是值类型，返回创建的实例对象，
        如果是引用类型，就返回这个引用类型的对象  ？？？ 有点不太明白这里表达啥意思
*/
 