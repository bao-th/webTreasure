# JavaScript

`Brendan Eich（布兰登·艾奇） Netscape美国专注于做浏览器的公司，1995年发明JavaScript，前身liveScript`

## 运行阶段

1. 编译阶段
   - 基本语法规则校验、如果有错，直接报错，且停止运行
   - 声明变量或函数
2. 执行阶段
   - 执行代码，赋值、运算、函数的调用

---

## 运算符

1. 逻辑运算符

   - 逻辑运算的优先级是：非 → 与 → 或
   - 运算顺序：非运算 → 数学运算 → 关系运算 → 逻辑运算

---

## 函数

### 高阶函数

1. 若 A 函数，接收的参数是一个函数，那么 A 就可以称之为高阶函数。
2. 若 A 函数，调用的返回值依然是一个函数，那么 A 就可以称之为高阶函数。

`常见的高阶函数有：Promise、setTimeout、arr.map()等等`

### 函数的柯里化

`通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式`

### 纯函数

1. 一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)
2. 必须遵守以下一些约束
   - 不得改写参数数据
   - 不会产生任何副作用，例如网络请求，输入和输出设备
   - 不能调用 Date.now()或者 Math.random()等不纯的方法
3. redux 的 reducer 函数必须是一个纯函数

### 函数声明与变量声明的匿名函数

1. 区别：
   - 函数声明可以提前，可以先调用后声明，变量声明的为 undefined
   - 关键字声明的函数，在一定的条件下会比，变量声明的匿名函数更加占用内存

### 语法规则

1. JS 中函数可以作为值使用，是一个基本的语法规则
2. JS 中函数本身的作用域在声明的地方，与在哪个地方调用，没有关系

### 闭包（闭合的数据包）

- 产生条件：一个函数中返回一个函数
- 定义：因为垃圾回收机制不会破坏基本语法规则，所以父函数中被子函数引用的变量、及子函数都不会回收，全局作用域又引用不到这些数据，所以这些数据就形成一个闭合的数据包

### 回调函数

- 一个函数作为参数，传递给另一个函数，另一个函数执行完后，再执行传递进来的函数，这个过程叫做回调，传递的函数叫做回调函数

1. 同步回调
   - 理解：立即执行，完全执行完了才结束，不会放入回调队列
   - 例子：数组遍历相关的回调函数、Promise 的 executor 函数
2. 异步回调
   - 理解：不会立即执行，会放入回调队列中将来执行
   - 例子：定时器回调、ajax 回调、Promise 的成功|失败的回调

---

## JS 中的错误(Error)和错误处理

1. 错误的类型
   - Error：所有错误的夫类型
   - ReferenceError：引用的变量不存在
   - TypeError：数据类型不正确的错误
   - RangeError：数据值不在其所允许的范围内
   - SyntaxError：语法错误
2. 错误处理
   - 捕获错误：try ... catch
   - 抛出错误：throw error
3. 错误对象
   - message 属性：错误相关信息
   - stack 属性：函数调用栈记录信息

---

## JS 异步之宏队列与微队列

1. JS 中用来存储待执行回调函数的队列包含 2 个不同特定的队列
2. 宏队列：用来保存待执行的宏任务（回调），比如：`定时器回调/DOM事件回调/ajax回调`
3. 微队列：用来保存待执行的微任务（回调），比如：`promise回调/MutationObserver回调`
4. JS 执行时会区别这 2 个队列
   - JS 引擎首先必须先执行所有的初始化同步任务代码
   - 每次准备取出第一个宏任务执行前，都要将所有的微任务一个一个取出来执行

---

## 事件的传播

- 先从外到内（捕获阶段 capturing phase），然后再从内到外（冒泡阶段 Bubbling phase）
- 注意事项;
  - 最内部元素不再区分捕获和冒泡阶段，会先执行写在前面的监听，然后执行后写的监听
  - 如果给元素设置相同的两个或多个同名事件，则 DOM0 级写法后面写的会覆盖先写的；而 DOM2 级会按顺序执行

```js
// DOM0 级事件监听：只能监听冒泡阶段
oBox.onclick = function () {};
// DOM2级事件监听：
oBox.addEventListener(
  "click",
  function () {
    //这是事件处理函数
  },
  true
); // true监听捕获阶段，false监听冒泡阶段
```

## 继承

- ES6:在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例。先继承父类的属性和方法，在创建 this；
- ES5：直接就有 this，后在将继承的父类的属性和方法修改到 this 上；

## 垃圾回收机制

- 垃圾回收机制就是间歇的不定期的寻找到不再使用的变量，并释放掉它们所指向的内存; 主要为了以防内存泄漏，
- (内存泄漏: 当已经不需要某块内存时这块内存还存在着),
- JS 有两种变量: 全局变量和在函数中产生的局部变量。
  局部变量的生命周期在函数执行过后就结束了，此时便可将它引用的内存释放(即垃圾回收);但全局变量生命周期会持续到浏览器关闭页面。

- JS 执行环境中的垃圾回收器有两种方式：

1. 标记清除（mark and sweep）

   垃圾收集器给内存中的所有变量都加上标记，然后去掉环境中的变量以及被环境中的变量引用的变量的标记。在此之后再被加上的标记的变量即为需要回收的变量，因为环境中的变量已经无法访问到这些变量。

2. 用计数(reference counting)

   引用计数(reference counting): 这种方式常常会引起内存泄漏，低版本的 IE 使用这种方式。机制就是跟踪一个值的引用次数，当声明一个变量并将一个引用类型赋值给该变量时该值引用次数加 1，当这个变量指向其他一个时该值的引用次数便减一。当该值引用次数为 0 时就会被回收。

## DOM、BOM：

1. DOM：

- Document Object Model，文档对象模型
- DOM 是为了操作文档出现的 API，document 是其的一个对象
- DOM 和文档有关，这里的文档指的是网页，也就是 html 文档。DOM 和浏览器无关，他关注的是网页本身的内容。

2. BOM：

- Browser Object Model，浏览器对象模型
- BOM 是为了操作浏览器出现的 API，window 是其的一个对象
- window 对象既为 javascript 访问浏览器提供 API，同时在 ECMAScript 中充当 Global 对象

## href 与 src

1. href

- href 标识超文本引用，用在 link 和 a 等元素上，href 是引用和页面关联，是在当前元素和引用资源之间建立联系
- 若在文档中添加 href ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。
- 这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。

2. src

- src 表示引用资源，替换当前元素，用在 img，script，iframe 上，src 是页面内容不可缺少的一部分。
- 当浏览器解析到 src ，会暂停其他资源的下载和处理（图片不会暂停其他资源下载），直到将该资源加载、编译、执行完毕，
- 类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

## cookie、sessionStorage 和 localStorage 的区别

- 相同点：都存储在客户端
- 不同点：
  1. 存储大小：
     - cookie 数据大小不能超过 4k
     - sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大的多，可以达到 5M 或更大，就是为了解决 cookie 存储空间不足而诞生的
  2. 有限时间：
     - localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
     - sessionStorage 数据在当前浏览器窗口关闭后自动删除
     - cookie 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭
     - 数据与服务器之间的交互方式
     - cookie 的数据会自动的传递到服务器，服务器端也可以写 cookie 到客户端
     - sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存

## 一个页面从输入 url 到页面加载显示完成，发生了什么？

1. 浏览器通过 DNS 将 url 地址解析为 ip(如果有缓存直接返回缓存，否则递归解析)
2. 通过 DNS 解析得到了目标服务器的 ip 地址后，与服务器建立 TCP 连接。
   - ip 协议：选择传输路线，负责找到
   - tcp 协议：三次握手，分片，可靠传输，重新发送的机制
3. 浏览器通过 http 协议发送请求(增加 http 的报文信息)头 体 行
4. 服务器接收请求后，查库，读文件，拼接好返回的 http 响应
5. 浏览器收到 html，开始渲染
6. 解析 html 为 dom，解析 css 为 css-tree，最终生成 render-tree 阻塞渲染
7. 遍历渲染树开始布局，计算每个节点的位置大小信息
8. 将渲染树每个节点绘制到屏幕
9. 加载 js 文件，运行 js 脚本
10. relow(样式)和 repaint(位置)