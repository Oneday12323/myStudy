## 当用户输搜索关键词时候，页面实时展示匹配结果
### **用原生js实现**
- 当用户输入搜索关键词时，可以通过监听输入框的input事件，获取用户输入的关键词，并通过AJAX请求后端接口获取匹配结果，最后将结果展示在页面上。在实现过程中可以考虑使用防抖和节流等技术，以避免频繁发送请求导致性能问题。把上述功能用vue实现
```
<input type="text" id="search-input" placeholder="请输入搜索关键词">

<ul id="search-results"></ul>

<script>
  const searchInput = document.getElementById('search-input')
  const searchResults = document.getElementById('search-results')

  let searchTerm = ''
  let timerId = null

  function fetchData() {
    // 发送 AJAX 请求获取匹配结果
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const results = JSON.parse(xhr.responseText)
        renderResults(results)
      }
    }
    xhr.open('GET', `/api/search?q=${searchTerm}`)
    xhr.send()
  }

  function renderResults(results) {
    // 清空搜索结果列表
    searchResults.innerHTML = ''

    if (results.length) {
      // 如果有匹配结果，则动态创建 li 元素并添加到搜索结果列表中
      results.forEach(result => {
        const li = document.createElement('li')
        li.innerText = result.name
        searchResults.appendChild(li)
      })
    } else {
      // 如果没有匹配结果，则显示提示信息
      const li = document.createElement('li')
      li.innerText = '没有找到匹配结果'
      searchResults.appendChild(li)
    }
  }

  function handleInput() {
    // 获取用户输入的关键词
    searchTerm = searchInput.value.trim()

    // 如果搜索关键词为空，则清空搜索结果列表
    if (!searchTerm) {
      searchResults.innerHTML = ''
      return
    }

    // 使用防抖技术，等待用户停止输入一段时间之后再发送请求
    clearTimeout(timerId)
    timerId = setTimeout(fetchData, 300)
  }

  // 监听输入框的 input 事件
  searchInput.addEventListener('input', handleInput)
</script>
```
- 在这个示例代码中，我们使用了 XMLHttpRequest 对象来发送 AJAX 请求获取匹配结果，并使用 JSON.parse() 方法将响应数据解析为 JavaScript 对象。在 renderResults 函数中，我们动态创建 li 元素并将匹配结果添加到搜索结果列表中。

- 在 handleInput 函数中，我们获取用户输入的关键词，并使用防抖技术等待用户停止输入一段时间之后再发送请求。如果搜索关键词为空，则清空搜索结果列表。

- 最后，我们通过监听输入框的 input 事件来触发 handleInput 函数，并将搜索结果动态展示在页面上。

### **用vue实现**
```
<template>
  <div>
    <input type="text" v-model="searchTerm" @input="handleInput" placeholder="请输入搜索关键词">
    <ul v-if="searchResults.length">
      <li v-for="result in searchResults" :key="result.id">{{ result.name }}</li>
    </ul>
  </div>
</template>

<script>
import { debounce, throttle } from 'lodash'

export default {
  data() {
    return {
      searchTerm: '',
      searchResults: []
    }
  },
  methods: {
    async fetchData() {
      // 发送 AJAX 请求获取匹配结果
      const response = await fetch(`/api/search?q=${this.searchTerm}`)
      const results = await response.json()
      this.searchResults = results
    },
    // 使用防抖技术，等待用户停止输入一段时间之后再发送请求
    handleInput: debounce(function() {
      this.fetchData()
    }, 300),
    // 使用节流技术，限制发送请求的频率
    handleInput: throttle(function() {
      this.fetchData()
    }, 1000)
  }
}
</script>
```
- 在这个示例代码中，我们使用了 lodash 库中的 debounce 和 throttle 方法来实现防抖和节流功能。handleInput 方法使用了防抖技术，等待用户停止输入 300 毫秒之后再发送请求。同时，handleInput 方法也使用了节流技术，限制发送请求的频率为每秒 1 次。

- 当用户在输入框中输入关键词时，会触发 handleInput 方法。该方法会使用 fetch 方法发送 AJAX 请求获取匹配结果，并将结果存储在 searchResults 数组中。页面上会根据 searchResults 数组中的结果动态展示匹配结果。

- 在模板中，我们使用 v-if 指令来判断是否有匹配结果，如果有则展示匹配结果列表。我们使用 v-for 指令来遍历 searchResults 数组，并使用 :key 属性来设置每个匹配结果的唯一标识。
在这个示例代码中，我们使用了 lodash 库中的 debounce 和 throttle 方法来实现防抖和节流功能。handleInput 方法使用了防抖技术，等待用户停止输入 300 毫秒之后再发送请求。同时，handleInput 方法也使用了节流技术，限制发送请求的频率为每秒 1 次。
