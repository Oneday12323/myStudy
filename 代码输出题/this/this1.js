let name = '123';
   
var obj = {
  name: '456',
   
   getName: function () {
   
      function printName() {
   
         console.log(this.name);
   
      }
   
      printName();//这里调用printName()的是？
   
    }
   
}
   
obj.getName();
//123