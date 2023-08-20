# 微前端的运行原理

## 监听路由变化
### /hash 路由：window.onhashChange
### /history 路由：history.go|history.back|history.forward| 使用popstate事件--> window.onPopstate()  /pushstate、replaceState 需要通过函数重写的方式进行劫持（添加历史记录和替换历史记录）

window.onpopstate = function //这个方式会把前面的覆盖掉
//追加事件的监听，不会影响原有的
window.addEventListener('popstate',()=>{
    console.log('监听到了popstate')
    handleRouter()
})   

//重写pushState
//将原来的pushState做一下备份
const rawPushState = window.history.pushState
window.history.pushState=(...args)=>{
    rawPushState.apply(window.history,args);
    console.log('监视到pushState的变化了')
    handleRouter()
}
const rawReplaceState = window.history.pushState
window.history.replaceState=(...args)=>{
    rawReplaceState.apply(window.history,args);
    console.log('监视到replaceState的变化了')
    handleRouter()
}
把上面重写的路由封装到一个方法里面，然后再=在start()里面进行使用

## 写一个handleRouter方法来处理路由变化，当路由发生变化的时候，就去调用这个函数

export const handleRouter=()=>{

## 2.匹配子应用
### 2.1获取到当前的路由路径 window.location.pathname
    注册列表里面的activeRule就是我们需要匹配的路由  遍历储存子应用的列表，拿着当前的路由路径和列表里的每一项的activeRule进行匹配，匹配成功则找到了子应用
    const apps = getApps()
    const app = apps.find(item=>window.location.pathname.startWith(item.activeRule))

    if(!app){
        return 
    }
    
## 3.加载子应用
    //请求获取子应用的资源：HTML、CSS、JS
    const html = fetch(app.entry).then(res=>res.text())
    const container = document.querySelector(app.container)
    //1.客户端渲染需要通过执行JavaScript来生成内容
    //2.浏览器出与安全考虑，innerHTML中的script不会加载执行
    container.innerHTML=html

    //手动加载子应用中的script，然后执行script中的代码
    //通过eval() ---eval里面也可以访问到上下文 或者使用new Function()
## 4.渲染子应用
}

