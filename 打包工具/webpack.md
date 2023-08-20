npm打包工具
js es模块化

在浏览器中使用模块化面临两个问题：
- 当我们习惯在node中编写代码的方式后，再回到前端编写html、css、js这些东西的时候会感觉到各种不便，比如：因为浏览器的兼容性问题，不能放心使用模块化规范即使使用也会面临模块过多时的加载问题
- 解决：希望有一个工具能对我们的代码进行打包，将多个模块打包成一个文件。这样一来既解决了兼容性的问题，又解决了模块过多的问题

-构建工具的作用：通过构建工具可以将使用ESm规范编写的代码装欢为旧的js语法,这样使得所有的浏览器都可以支持代码

- webpack
1. 初始化 `yarn initial -y` -> package.json
2. 安装依赖 webpack、webpack-cli
3. 在项目中创建src目录，然后编写代码（index.js）表示入口文件（ ）
4. 执行yarn webpack 打包项目 ---- 打包完成后项目的目录里面会多一个dist文件夹  
5. src里面的是在前端运行的，src以外的是在node运行的 



> 当script写在head了里面的时候，需要使用defer 异步加载script脚本

4. yarn add -D webpack webpack-cli  -D的意思是开发依赖，区分一下是否在项目中要用到（即区分一下项目要用的还是项目开发的时候要用的？）
"devDependencies"：{
    "webpack":"^5.75.0",
    "webpack-cli":"^5.0.0"
}

只有会执行的代码才会打包进来

``` javascript
const path = require("path")
module.exports = {
     mode:"production", //production是生产模式（上线用） development是开发模式
     entry:"", // 用来指定打包时的主文件，默认 ./src/index.js
     output:{
        path: path.resolve(__dirname,"dist"), //指定打包目录,必须要绝对路径 
        filename:"bundle.js", //打包后的文件名
        clean:true //是否自动清空dist文件下的代码
     }, // 用来配置代码打包后的地址
}
```
webpack默认情况下，只会处理js文件，如果我们希望它可以处理其他类型的文件，则为其引入loader
- 以css为例：
- - 使用css-loader可以处理js中的样式,将css转成js代码打包进去
- - 使用步骤：
- - 1. 安装:yarn add css-loader -D
- - 2. 配置：
```javascript
module:{
    rules:[
        {
            test:/\.css$/i, //匹配.css结尾的文件
            use:["css-loader","style-loader"]
        },
        {
            test:/\.(jpg|png)$/i,
            type:"asset/resource" //图片直接资源类型的数据，可以通过指定type来处理
        }
    ]
}
```
- - style-loader使转换之后的css在页面中生效

打包图片则引入对应的图片loader，在rules加入规则






- vite


