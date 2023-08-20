function Foo() {
   
    this.a = 1;
    return {
        a: 2,
        b: 3	
    }
  
  }
  
  Foo.prototype.a = 6;
  
  Foo.prototype.b = 7;
  
  Foo.prototype.c = 8;
  
  var o = new Foo();
  
  console.log(o.a);
  
  console.log(o.b);
  
  console.log(o.c)
  //2,3
  //如果删除return 则会打印  678
/*  原因：
在调用new的过程中会发生四件事：
    1.创建一个空对象
    2.设置原型，将实例对象的原型（__proto__）属性 设置为 构造函数的 原型对象（prototype）
    3.让构造函数的this指向实例对象，执行构造函数的代码
    4.判断构造函数的返回值类型，
        --如果是值类型，返回创建的实例对象，
        --如果是引用类型，就返回这个引用类型的对象
*/