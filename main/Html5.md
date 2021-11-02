# HTML5

## H5 新增控件

1. color - 颜色选择控件
2. date、time - 日期时间选择控件
3. email - 电子邮件输入控件
4. file - 文件选择控件
5. number - 数组输入控件
6. range - 拖拽条
7. search - 搜索框
8. url - 网址输入控件
9. dataList - 可以为输入框提供一些备选项，当输入内容与备选项相同时，显示智能感应

```
例：
<input type="text" id="province-list">
<datalist id="province-list">
    <options value="辽宁">
</datalist>
```

## 区块标签

1. <section> - 文档区域，语义比div大
2. <artical> - 文档的核心文章内容，会被搜索引擎主要抓取
3. <aside> - 文档的非必要相关内容，比如广告等
4. <nav> - 导航条
5. <header> - 页头
6. <main> - 网页核心部分
7. <footer> - 页脚

---

## 基本控件

```
单行文本框:
<input type="text">
密码框:
<input type="password">
多行文本:
<textarea rows="" cols=""></textarea>
按钮:
<input type="button"> 等同于 <button></button> 普通按钮
<input type="reset"> 重置按钮
<input type="submit"> 提交按钮
单选:
<input type="radio">
复选:
<input type="checkbox">
标签:
<label>
    <input type="radio">男
</label>
HTMl4时代:
<input type="radio" id="nan">
<label for="nan">男</label>
下拉菜单:
<select>
    <option value="">支付宝</option>
    <option value="">微信</option>
</select>
```

## SEO

`（Search Engine Optimization 搜索引擎优化）`

- 利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名，让网站在搜索引擎的结果中占据领先地位，获得品牌收益
- h1 不能使用太多次

```html
<meta name="Keywords" content="前端" />
<meta name="Description" content="前端知识点" />
```

## Dtd：文档类型声明。

## 字符集：

- UTF-8 全，一个文字 3 个字节，
- GB2312（GBK）不那么全，一个文字两个字节

## 转义符：

- &lt 小与，
- &gt 大于，
- &nbsp 空格不会被折叠，
- &copy 版权符

## ReadOnly 和 Disabled

- ReadOnly 和 Disabled 的作用是使用户不能够改变表单域中的内容
- 区别:
  1.  ReadOnly 只针对 input，textarea 有效，Disabled 对所有表单元素有效，包括 select，radio，checkbox，button 等
  2.  表单元素 disabled 后，表单以 POST 或 GET 提交的话，这个元素的值不会被传递出去，而 ReadOnly 会
