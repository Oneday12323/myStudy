# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.


## 为什么要有虚拟DOM？？-
- 当直接对一个dom元素进行操作的话，是很浪费性能的----为什么呢？？---因为一个dom身上的属性是很多的
- 对于这种性能的浪费 我们需要合适的解决方式：可以通过js的计算性能来换取dom操作所消耗的性能，一般来说，操作js是很快的

- 虚拟DOM就是通过js生成的一个AST抽象语法树，即节点树。
- TS转JS的时候，在转换的过程中，也会进行AST的转换
- babel插件，在ES6转ES5的时候，也会经过这个AST这个抽象语法树的一个转换
- js通过v8引擎帮我们1去转字节码的时候，也是会进行一个ast
 
- 无key的diff算法
- 3步：
1. 通过for循环，去patch，去重新渲染元素 ---- 拿新的节点去替换旧的节点
2. 新增----替换之后如果还有新的节点，就进行一个新增插入
3. 删除----替换之后如果旧节点有多余，就删除

- 有key的diff算法
- 5步：
1. 前序算法：进行一个判断isSameVNodeType()判断type和key是否是一样的，如果是一样的，就对这个节点进行一个复用
2. 尾序算法：当前序算法遇到不一样的节点时，会进行尾序算法，从后面开始对比
3. 新节点如果多出来就是一个挂载
4. 旧节点如果多出来进行一个卸载
5. 乱序的话：分为三小节：5.1构建新节点的映射关系 5.2记录新节点在旧节点中的一个位置数组，如果有多余的旧节点就进行一个删除，如果新节点不包含在就节点里面，也进行一个删除，如果节点出现了交叉，就要通过移动去求最长递增子序列----最长递增子序列升序算法（贪心+二分）
- 就是找以该数之前的，比他小的元素，且元素关系是增长的数列的长度
如果当前遍历的节点不在子序列，说明要进行一个移动，如果节点在子序列，那就直接跳过
**vue3做了优化，最长递增子序列算法**


vue2：头和头 尾和尾，头和尾，尾和头交叉比较

## ref
1. **ref**
- 是一个函数，也接收一些类型，可以定义一个泛型
```
type M = {
   name:string
}
const Man = ref<M>({name:"蒲蒲"})
//const Man:Ref<M>=ref({name:"蒲蒲"})
```
或者可以让他自己去做一个类型推导
ref也有自己的interface Ref，可以import进来
修改值的时候怎么做？---ref返回的是一个ES6的一个class的类，然后里面有个属性是.value----修或者取值必须用这个.value

2. **isRef**
- 判断一个东西是不是ref对象

3. **shallowRef**
- 浅层响应式，只能到.value来进行赋值
- ref可以用 Man.value.name="滔滔"
- shallowRef只能通过 Man.value={name:"滔滔"} 来进行赋值
- 如果两个混合使用，shallowRef会被ref影响变为深层响应 --- 这是因为这样等于触发了一次update生命周期,强制更新了视图

4. **triggerRef**
- ref底层更新的逻辑的时候，会调用triggerRef ，
- triggerRef会强制更新我们收集的依赖
- 所以在调用shallowRef之前调用triggerRef，会让shallowRef变成深层响应的
- ref本身就调用了triggerRef

5. **customRef**
- 自定义一个ref
- 修改也是通过.value来修改的，写防抖的效果是不错的
```
<template>

 <div>customRef:{{ obj }}</div>
 <button @click="change">修改</button>

  <div ref="dom">我是dom</div>
</template>

<script setup lang='ts'>
import {ref,reactive,customRef} from 'vue'

function MyRef<T>(value:T){
  let timer:any
  return customRef((track,trigger)=>{
    return{
      get(){
        track();  //用来收集依赖的
        return value;
      },
      set(newVal){
        clearTimeout(timer);
        timer= setTimeout(()=>{
          console.log('触发了')
          value= newVal;
          timer=null;
        trigger(); //触发依赖更新
        },500)
        
      }
    }
  })
}

const dom = ref<HTMLElement>();  //使用类型推断，将其推断为一个HTMLElement


const obj = MyRef<string>("蒲蒲");

const change = ()=>{
  obj.value="滔滔";
  console.log(dom.value?.innerText);  //如果放在外面的话，会是一个undefined，因为外面dom还未渲染
}

</script>
<style scoped>

</style>
```

- 如果传的是数组或者对象，其实ref内部也是会调用reactive的 如果传的是基本类型的变量的话，会直接把值返回

## reactive
- 使用示例
```
<template>

 <div>
    <form >
      <input v-model="form.name" type="text">
      <br>
      <input v-model="form.age" type="text">
      <br>
      <button @click.prevent="submit">提交</button>
    </form>
 </div>

</template>

<script setup lang='ts'>
import {ref,reactive} from 'vue'
type M = {
  name:string,
  age:number
}
let form = reactive<M>({
  name:"pupu",
  age:23
})

const submit = ()=>{
  console.log(form)
}
</script>
<style scoped>

</style>
```
- reactive可以直接给对象的属性赋值，但是不能给数组赋值，把数组变成对象的属性，就可以赋值了
- reactive 是proxy代理的一个对象 对于数组不能直接赋值，直接赋值的话会把代理的对象做一个覆盖
```
<template>

 <div>
      <ul>
        <li v-for="item in list">{{ item }}</li>
      </ul>
      <button @click.prevent="add">添加</button>
 </div>

</template>

<script setup lang='ts'>
import {ref,reactive} from 'vue'

let list = reactive<string []>([])

const add = ()=>{
  //list.push('EDG');
  //如果这里变成一个异步，这种情况下，控制台是可以看到有值输出的，但是视图没有任何变化，因为reactive是一个proxy代理对象，直接赋值的话会
  setTimeout(()=>{
    let res =['EDG','RNG','JDG'];
    list = res;
    console.log(list)
  },2000)
}
</script>
```
- 解决方式：
1. 通过push方法向数组中添加元素
```
const add = ()=>{
  //list.push('EDG');
  //如果这里变成一个异步，这种情况下，控制台是可以看到有值输出的，但是视图没有任何变化，因为reactive是一个proxy代理对象，直接赋值的话会
  setTimeout(()=>{
    let res =['EDG','RNG','JDG'];
    list.push(...res)
    console.log(list)
  },2000)
}
```
2. 把数组包装在一个对象中,---添加一个对象，把数组作为一个属性去解决
```
<template>

 <div>
      <ul>
        <li v-for="item in list.arr">{{ item }}</li>
      </ul>
      <button @click.prevent="add">添加</button>
 </div>

</template>

<script setup lang='ts'>
import {ref,reactive} from 'vue'

let list = reactive<{arr:string[]}>({
  arr:[]
})

const add = ()=>{
  //list.push('EDG');
  //如果这里变成一个异步，这种情况下，控制台是可以看到有值输出的，但是视图没有任何变化，因为reactive是一个proxy代理对象，直接赋值的话会
  setTimeout(()=>{
    let res =['EDG','RNG','JDG'];
    list.arr=res;
    console.log(list)
  },2000)
}
</script>
```

**readonly**
- 把reactive的值变成一个只读的

**shallowRef**
- 浅层响应式

- weakMap
1. 键值只能是一个object类型的数据，并且weakMap键名所指向的而对象，不会被计入垃圾回收机制
2. 它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内
3. 因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存
4. 也就是说，一旦不被需要，weakMap里面的键名对象和所对应的键值会自动消失，不用手动删除引用

## toRef
- 只能修改响应式对象的值， 非响应式只有数据变化了，但是视图不会改变
- 应用场景：
- 可以将对象的某个属性包装成为一个响应式对象提供给外部使用，而不用暴露整个对象

## toRefs
- 源码，给对象的每一个属性，都加了toRef
- 应用场景：
- 解构赋值---使得解构之后的对象还是一个响应式的对象，这里和vue2有什么区别呢？？
```
<template>

 <div>
      {{ name }}------{{ age }}------{{ hobby }}
      <button @click.prevent="show">查看</button>
 </div>

</template>

<script setup lang='ts'>
import {ref,reactive,readonly,toRef} from 'vue'
const man = reactive({
  name:"apu",
  age:29,
  hobby:"movie"
})
const toRefs= <T extends object>(object:T)=>{
  const map:any = {};

  for(let key in object){
      map[key]=toRef(object,key)
  }

  return map;
}
let {name,age,hobby} = toRefs(man)
const show=()=>{
  name.value="taotao"
  console.log(name,age,hobby)
}
</script>
```
## toRaw
- 使一个响应式对象变成原始对象，不去进行响应

- Reflect可以保证上下文的一个正确

## 组件之间的传值
1. 父组件给子组件传值
- 没有使用ts的话，defineProps就是一个函数，里面接收一个对象
```
difineProps({
   title:{
      type:string,
      default:默认值
   }
})
```
这个值title是直接可以在模板里面进行使用的
- 使用ts的话就是什么---- 使用泛型，接收一个泛型，里面是一个对象，直接去定义需要的数据
```
difineProps<{
   title:string,
   arr:number[]
}>()
```
- 使用ts来定义默认值的时候需要用到   withDefaults(),接收两个参数，一个就是defineProps，另一个就是默认值，默认值需要一个函数来做一个返回，防止引用
```
withDefaults(difineProps<{
   title:string,
   arr:number[]
}>(),
   {arr:()=>[666]}
)
```

2. 子组件给父组件传值
- **使用defineEmits()**
- 在子组件上定义一个自定义事件
```
<button@click='send'>给父组件传值</button>
```
```
const emit = defineEmits(['on-click']);
const send = ()=>{
   emit('on-click',需要传递的值list)
}
```
- 父组件来进行接收
```
<Child @on-click="getSth">我是子组件</Child>
```
```
const getSth = (list)=>{
   console.log(list)
}
```
这里的list就是接收到的子组件传的值

- 使用ts的话就是这样的
```
const emit = difieEmits<
{
   (e:'on-click',参数name:string):void
}
>()
const send = ()=>{
   emit('on-click',"我是子组件传递给父组件的值")
}
```

3. 给父组件暴露一些方法属性等
- defineExpose
