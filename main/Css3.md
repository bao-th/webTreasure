# CSS - ( cascading style sheet ，层叠式样式表 )
` CSS3是CSS的最新版本，增加了大量的样式、动画、3D特效和移动端特性等`

---
## 书写位置
* 内嵌式
```
<head>
    <style>
    </style>
</head>
```
* 外链式
```
//优点：多个html ，可以共用一个css
<link rel="stylesheet" href="css/css.css">
```
* 导入式（最不常用）
```
// 使用导入式引入的样式表，不会等待css文件加载完毕，而是会立即渲染HTML结构，所以页面会有几秒钟的“素面朝天”的时间
<style>
    @import url(css/css.css)
</style>
```
* 行内式
```
// 后台工程师经常使用，牺牲了批量设置样式的能录i
<h2 style="color:red;">二级标签</h2>
```
---
## 选择器
* 传统CSS2.1选择器
1. 标签选择器和i选择器
2. class选择器
3. 复合选择器
` " "：后代，".":交集，",": 并集 `
4. 伪类
` :link :visited :hover :active 按爱恨准则顺序 `
* CSS3新增选择器
1. 元素关系选择器 
`>:子，+:相邻兄弟，~:通用兄弟（之后所有同层级），IE7开始兼容`
2. 序号选择器
` :nth-child(2n+1),:nth-last-child(2n+1),:nth-of-type(),:nth-last-of-type() IE9,first-IE7`
3. 属性选择器
4. CSS3新增伪类
`:empty :focus :enabled :disabled :checked :root`
5. 伪元素
`::before ::after ::selection ::first-letter ::first::line IE8兼容单冒号:`
* 层叠性和选择器权重计算
---
## 原子类
在做网页项目前，可以将所有的常用字号、文字颜色、行高、外边距、内边距等都设置为单独的类
```
.fs12 {
    font-size: 12px;
}
.color-red {
    color: red;
}
```
---
## 权重
!important > id的个数 > class的个数 > 标签的个数
---
## 继承性
`文本相关属性普遍具有继承性`
`在继承的情况下，选择器权重计算失效，而是“就近原则”`
* color
* font- 开头的
* list- 开头的
* text- 开头的
* line- 开头的
----
## 盒模型
* margin的塌陷

`竖直方向的margin有塌陷现象：小的margin会塌陷到大的margin中，从而margin不叠加，只以大值为准`

---
## width、height
* 当块级元素（div、h系列、li等）没有设置width属性时，它将自动撑满，但这并不意味着width可以继承
* 盒子的height属性如果不设置，它将自动被其内容撑开，如果没有内容，则height默认是0
* img和表单元素是特殊的行内块，它们既能够设置宽度高度，也能够并排显示
---
## 定位
* 脱离标准文档流的方法：浮动、绝对定位、固定定位
* 绝对定位：绝对定位的盒子会以自己祖先元素中，离自己最近的拥有定位属性的盒子，当做基准点。这个盒子通常是相对定位的，所以这个性质也叫作“子绝父相”
---
## 浮动
1. 浮动使用要点：要浮动，并排的盒子都要设置浮动
2. 父盒子要有足够的宽度，否则子盒子会掉下去
3. 子盒子会按顺序进行贴靠，如果没有足够空间，则会寻找再前一个兄弟元素
4. 浮动的元素不再区分块级元素、行内元素，已经脱离了标准文档流，一律能够设置宽度和高度，即使它是span或者a标签等
---
## BFC规范
`BFC（BoxFormattingContext，块级格式化上下文）是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然`
* 创建BFC
1. 方法①：float的值不是none
2. 方法②：position的值不是static或者relative
3. 方法③：display的值是inline-block、flex或者inline-flex
4. 方法④：overflow:hidden;
* BFC其他作用
1. 可以取消盒子margin塌陷
2. 可以阻止元素被浮动元素覆盖
---
## 清楚浮动
`清除浮动：浮动一定要封闭到一个盒子中，否则就会对页面后续元素产生影响`
1. 父盒子形成BFC，此时最好的方法就是overflow:hidden属性
2. 给后面盒子设置clear:both属性，clear表示清楚浮动对自己的影响，both表示左右浮动都清除
3. :after伪元素为盒子添加最后一个子元素，并且给:after设置clear:both
4. 两个盒子之间隔一个clear:both的盒子
---
## div常见类名
1. 页头：header
2. logo：logo
3. 导航条：nav
4. 横幅：banner
5. 内容区域：content
6. 页脚：footer
---
## 盒子阴影
```
box-shadow：x偏移量 y偏移量 模糊量 阴影延展 颜色
box-shadow: 10px 20px 30px 40px rgba(0,0,0,.4)
box-shadow：inset(内阴影) x偏移量 y偏移量 模糊量 阴影延展 颜色 
box-shadow: 10px 20px 30px 40px rgba(0,0,0,.4), 10px 20px 30px 40px rgba(0,0,0,.4) // 多阴影
```
---
## 背景
```
1. background-image: url( images/bg1.jpg || http:// )
2. background-size: 100px 200px || auto //等比例 || contain //容纳盒子 || cover //撑满盒子
3. background-clip: border-box || padding-box || content-box
4. background-attachment: fixed || local || scroll(默认)
5. background-position: 100px 200px
// background: 颜色 背景图片 背景重复 背景位置
6. background: white url(images/archer.png) no-repeat center center

```
`CSS精灵：将多个小图标合并制作到一张图片上，使background-positio属性单独显示其中一个，这样的技术叫做CSS精灵技术，也叫作CSS雪碧图`

`CSS精灵可以减少HTTP请求数，加快网页显示速度。缺点也很明显：不方便测量、后期改动麻烦`

---
## 背景渐变
* 线性渐变
```
background-image: linear-gradient(渐变方向, 开始颜色, 中间色出现位置%, 结束颜色)
background-image: linear-gradient(to right || 45deg, blue, yellow 20%, red)
```
* 浏览器私有前缀

`Chrome: -webkit-`

`Firefox: -moz-` 

`IE、Edge: -ms-`

`欧朋: -o-`

* 径向渐变
```
background-image: radial-gradient(圆心坐标, 开始颜色，结束颜色)
background-image: radial-gradient(50% 50% , red, blue)
```
---
## 过渡
* 从IE10开始兼容，移动端兼容良好
* 动画细腻，内存开销小
```
transition: 属性 时长 变化速度曲线 延迟时间
transition: all 1s linear 0s
```
---
## 动画
* 动画的定义
```
@keyframes r {
    from {
        transform: rotate(0)
    }
    to {
        transform: rotate(360deg)
    }
}
@keyframes changeColor {
    0% {
        background-color:red;
    }
    20% {
        background-color:yellow;
    }
    40% {
        background-color:blue;
    }
    60% {
        background-color:green;
    }
    80% {
        background-color:purple;
    }
    100% {
        background-color:orange;
    }
}
```
* 动画的调用
```
animation: r 1s linear 0s 3(执行次数,infinite-永远执行) alternate(偶数次反向) forwards(停止在最后结束状态);
```