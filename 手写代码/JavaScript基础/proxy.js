const handler ={
    set(target, name,value,receiver){
        let success = Reflect.set(target, name,value,receiver);
        // console.log("映射---------",success);   true
        if(success){
            console.log('property'+name+'on'+target+'set to'+value);
        }
        // console.log("---------",success);    true
        return success;
    },
    
}
const sub = {
    name:'lucy',
    value:1,
    age:10,
    
}
let proxy = new Proxy(sub,handler)
console.log(proxy.name);
//只有调用了代理对象的方法，才会映射成功？


