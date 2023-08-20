## 用vue实现分页
1. 在Vue组件中定义数据，包括请求到的数据列表、当前页码、每页数据条数、总页数等信息。
```
data() {
  return {
    list: [], // 数据列表
    currentPage: 1, // 当前页码
    pageSize: 10, // 每页数据条数
    totalPage: 0 // 总页数
  }
}
```
2. 在Vue组件中定义方法loadData用于请求数据，该方法根据当前页码和每页数据条数向后端请求数据，并更新数据列表和总页数等信息。
```
methods: {
  async loadData() {
    try {
      const res = await axios.get('/api/data', {
        params: {
          page: this.currentPage,
          pageSize: this.pageSize
        }
      })
      this.list = res.data.list
      this.totalPage = res.data.totalPage
    } catch (error) {
      console.error(error)
    }
  }
}
```
3. 在Vue组件中使用watch属性监听当前页码和每页数据条数的变化，当发生变化时重新请求数据。
```
watch: {
  currentPage: {
    handler() {
      this.loadData()
    }
  },
  pageSize: {
    handler() {
      this.loadData()
    }
  }
}
```
4. 在Vue组件中使用v-for指令遍历数据列表，渲染数据。
```
<template>
  <ul>
    <li v-for="item in list" :key="item.id">{{ item.title }}</li>
  </ul>
</template>
```
5. 在Vue组件中定义方法changePage用于切换页码，该方法根据传入的页码参数更新当前页码，并重新请求数据。
```
methods: {
  changePage(page) {
    this.currentPage = page
  }
}
```
6. 在Vue组件中使用v-pagination组件实现分页导航，该组件可以根据总页数和当前页码自动生成分页导航按钮，并可以触发changePage方法更新当前页码。
```
<template>
  <div>
    <ul>
      <li v-for="page in totalPage" :key="page" @click="changePage(page)">{{ page }}</li>
    </ul>
  </div>
</template>
```
- 通过以上步骤，我们就可以使用Vue实现一个简单的分页请求功能。当用户点击分页导航按钮时，组件会根据当前页码和每页数据条数向后端请求数据，并渲染页面。