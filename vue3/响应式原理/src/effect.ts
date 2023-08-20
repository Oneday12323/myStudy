//实现依赖的收集和依赖的更新

let acctiveEffect:any;  //定义一个全局变量 用来收集闭包
export const effect = (fn:Function)=>{
    //来一个闭包
    const _effect=function(){
        acctiveEffect=_effect;
        fn();
    }

    _effect();
}

//依赖的收集
const targetMap = new WeakMap();
export const track = (target:any,key:any)=>{
    //根据target对象去取value，存到depsMap里
    let depsMap = targetMap.get(target);
    //第一次是没有值的
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target,depsMap);
    }
    //通过key取value
    let deps = depsMap.get(key);
    if(!deps){
        deps = new Set();
        depsMap.set(key,deps)
    }

    //收集effect副作用函数  即收集依赖
    deps.add(acctiveEffect);
}

//依赖的更新
export const trigger=(target:any,key:any)=>{
    const depsMap = targetMap.get(target);
    const deps = depsMap.get(key);

    //取到依赖之后进行一个更新
    deps.forEach((effect:any)=>effect())
}