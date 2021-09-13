# CSS - ( cascading style sheet ，层叠式样式表 )
` CSS3是CSS的最新版本，增加了大量的样式、动画、3D特效和移动端特性等`

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
## 权重
!important > id的个数 > class的个数 > 标签的个数