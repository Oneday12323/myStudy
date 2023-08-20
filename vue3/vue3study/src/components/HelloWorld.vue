<script setup lang="ts">
import { ref,reactive,shallowReactive} from 'vue'

defineProps<{ msg: string }>()

const count = ref(0);
const Arr=['A','B','C','D'];
let person = reactive<number[]>([]);
Arr.splice(2,0,'DDD')

const animal = shallowReactive({
  ans:1,
  family:{
    one:5
  }
})


const add = ()=>{
  const arr = [1,2,3];
  if(arr.length<4){
    person.push(...arr);
  }
  animal.ans=2;
  animal.family.one++;
}
const form = reactive({
  name:'啊噗',
  age:18
})
const submit=()=>{
  console.log(form)
}

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>

  <div :key="item" v-for="(item) in Arr">
  {{ item }}
  </div>
  <div>
    <button type="button" @click="add">添加</button>
  {{ person }}
  {{ animal.ans }}
  {{ animal.family.one }}
  </div>
  <div>
        <form>
          <input v-model="form.name" type="text">
          <br>
          <input v-model="form.age" type="text">
          <br>
          <button @click.prevent="submit">提交</button>
        </form>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
