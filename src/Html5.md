# HTML5
## H5新增控件
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