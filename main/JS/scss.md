# css 预处理

## 变量声明

```scss
$nav-color: #f90 nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}
```

## 嵌套 CSS 规则

```scss
#content {
  article {
    h1 {
      color: #333;
    }
    p {
      margin-bottom: 1.4em;
    }
  }
  aside {
    background-color: #eee;
  }
}
// 编译后
#content article h1 {
  color: #333;
}
#content article p {
  margin-bottom: 1.4em;
}
#content aside {
  background-color: #eee;
}
```

## 父选择器的标识符&

```scss
article a {
  color: blue;
  &:hover {
    color: red;
  }
}
// 编译后
article a {
  color: blue;
}
article a:hover {
  color: red;
}
```

## 群组选择器的嵌套

```scss
.container h1,
.container h2,
.container h3 {
  margin-bottom: 0.8em;
}
.container {
  h1,
  h2,
  h3 {
    margin-bottom: 0.8em;
  }
}
```

## 子组合选择器和同层组合选择器： > 、 + 和 ~

```scss
article {
  ~ article {
    border-top: 1px dashed #ccc;
  }

  > section {
    background: #eee;
  }
  dl > {
    dt {
      color: #333;
    }
    dd {
      color: #555;
    }
  }
  nav + & {
    margin-top: 0;
  }
}
// 编译后
article ~ article {
  border-top: 1px dashed #ccc;
}
article > section {
  background: #eee;
}
article dl > dt {
  color: #333;
}
article dl > dd {
  color: #555;
}
nav + article {
  margin-top: 0;
}
```

## 嵌套属性

```scss
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}
// 编译后
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
```

## 嵌套导入

```scss
.blue-part {
  @import "blue-theme";
}
```

## 混合器

```scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}

// 最终生成：

.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

## 给混合器传参

```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:visited {
    color: $visited;
  }
}
a {
  @include link-colors(blue, red, green);
}
// scss 最终生成的是：
a {
  color: blue;
}
a:hover {
  color: red;
}
a:visited {
  color: green;
}
```

## 使用选择器继承来精简 css 通过选择器继承继承样式

```scss
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
// 编译后
.seriousError {
  border: 1px solid red;
  background-color: #fdd;
  border-width: 3px;
}
```
