## BFC
### 为什么会有BFC？作用？
BFC是“块级格式化上下文”的缩写，是Web页面布局的一种CSS渲染模式。BFC的作用是在一个块级元素内部创建一个独立的渲染区域，使得该块级元素的布局不会受到外部元素的影响，同时可以解决一些常见的布局问题。

需要BFC的原因包括：

清除浮动：当一个块级元素包含浮动元素时，会发生高度坍塌，即该块级元素的高度为0。通过将该块级元素设为BFC，可以清除浮动影响并让该块级元素自适应高度。

避免外边距重叠：当两个相邻的块级元素都有外边距时，它们的外边距可能会发生重叠，导致视觉上的不美观。通过将其中一个块级元素设为BFC，可以避免外边距重叠问题。

创建多栏布局：通过将一个块级元素设为BFC，并在该块级元素内部使用float属性和宽度设定，可以实现多栏布局。

避免元素被浮动元素覆盖：当一个块级元素的子元素浮动时，可能会导致该块级元素的高度塌陷，从而被浮动元素覆盖。通过将该块级元素设为BFC，可以让它重新建立自己的渲染上下文，避免被浮动元素覆盖。

总之，BFC可以让我们更好地控制页面布局，解决一些常见的布局问题，提高页面的可靠性和可维护性。

需要BFC的原因包括：<br/>

**1. 清除浮动**
```
<div style="border:1px solid black">
    <div style="float:left;width:50px;height:50px;background-color:red"></div>
    <div style="float:left;width:50px;height:50px;background-color:blue"></div>
    <div style="clear:both"></div> <!-- 清除浮动 -->
</div>
```
- 在上面的例子中，两个浮动元素没有被父元素的边框包裹，且父元素的高度为0。为了清除浮动，我们可以在父元素末尾添加一个空的div元素，并将其设置为clear:both，使得该元素在浮动元素下面显示，从而清除浮动影响。但是，这种做法需要添加额外的空元素，不太优雅。使用BFC可以更方便地清除浮动，只需将父元素设置为overflow:hidden或overflow:auto即可
```
<div style="border:1px solid black;overflow:hidden">
  <div style="float:left;width:50px;height:50px;background-color:red"></div>
  <div style="float:left;width:50px;height:50px;background-color:blue"></div>
</div>
```
上面的例子可能不太好理解
看下面这个例子：
```
<div class="parent">
    <div class="child-float"></div>
</div>

<style>
        <!-- 父盒子设置了overflow:hidden形成了一个BFC，这样可以让父盒子自适应子盒子的高度 -->
        .parent{
            overflow: hidden;
            background-color: greenyellow;
        }
        .child-float{
            float: left;
            background-color: red;
            height: 100px;
            width: 100px;
        }
        
</style>
```

**2. 避免外边距重叠**
例如，假设我们有两个相邻的块级元素，它们都有外边距。如果我们想要避免它们之间的外边距重叠，可以将其中一个元素设置为BFC。示例代码如下：
```
<div class="box1"></div>
<div class="box2"></div>

/* CSS */
.box1 {
  margin-bottom: 20px;
  overflow: hidden; /* 设置BFC */
}
.box2 {
  margin-top: 30px;
}
```

**3. 创建多栏布局**
例如，假设我们想要在一个父元素内创建两列布局，其中一列宽度固定，另一列宽度自适应。我们可以将父元素设置为BFC，并在其中使用float属性和宽度设定来实现多栏布局。示例代码如下：
```
<div class="parent">
  <div class="left"></div>
  <div class="right"></div>
</div>

/* CSS */
.parent {
  overflow: hidden; /* 设置BFC */
}
.left {
  float: left;
  width: 200px;
}
.right {
  margin-left: 200px; /* 左侧列宽度200px */
}
```

**4. 避免元素被浮动元素覆盖**
例如，假设我们有一个父元素和一个子元素，子元素被设置为浮动元素。如果我们想要避免父元素被子元素覆盖，可以将父元素设置为BFC。示例代码如下：
```
<div class="parent">
  <div class="child"></div>
</div>

/* CSS */
.parent {
  overflow: hidden; /* 设置BFC */
}
.child {
  float: left;
  width: 200px;
  height: 200px;
}
```

## css塌陷有几种情况？


## 