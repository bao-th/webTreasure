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

### 作用域

- JS 中函数本身的作用域在声明的地方，与在哪个地方调用，没有关系

### 执行上下文

- (execute context) EC
- 理解：代码执行的环境
- 时机：代码正式执行之前会进入到执行环境
- 工作：

  1.  创建一个变量对象：
      - 变量
      - 函数及函数的参数
      - 全局：window
      - 局部：抽象的但确实存在
  2.  确认 this 的指向
      - 全局：this ---> window
      - 局部：this ---> 调用其的对象
  3.  创建作用域链
      - 父级作用域链 + 当前的变量对象
  4.  扩展：

      ```
      ECObj = {
        变量对象：{变量，函数，函数的形参}
        scopeChain：父级作用域链 + 当前的变量对象，
        this：{window || 调用其的对象}
      }
      ```

### 闭包 closure（闭合的数据包）

1. 理解
   - 什么是闭包?
     1. 密闭的容器，类似于 set，map 容器，存储数据的
     2. 闭包是一个对象，存放数据的格式：key：value
   - 形成的条件：
     1. 函数嵌套
     2. 内部函数引用外部函数的局部变量
   - 优点：
     1. 延长外部函数局部变量的生命周期
   - 缺点：
     1. 容易造成内存泄漏
   - 注意点：
     1. 合理使用闭包
     2. 用完闭包要及时清除（销毁）
2. 个人理解：
   - 常用方式：一个函数中返回一个函数
   - 定义：因为垃圾回收机制不会破坏基本语法规则，所以父函数中被子函数引用的变量、及子函数都不会回收，全局作用域又引用不到这些数据，所以这些数据就形成一个闭合的数据包

### 回调函数

- 一个函数作为参数，传递给另一个函数，另一个函数执行完后，再执行传递进来的函数，这个过程叫做回调，传递的函数叫做回调函数

1. 同步回调
   - 理解：立即执行，完全执行完了才结束，不会放入回调队列
   - 例子：数组遍历相关的回调函数、Promise 的 executor 函数
2. 异步回调
   - 理解：不会立即执行，会放入回调队列中将来执行
   - 例子：定时器回调、ajax 回调、Promise 的成功|失败的回调

### 节流与防抖

1. 节流函数：一个函数执行一次后，只有大于设定的执行周期后才会执行第二次

   - 有个需要频繁触发函数，处于性能角度，在规定时间内，只让函数触发的第一次生效，后面不生效
   - 屏幕滚动事件

   ```js
   /**
    * @param fn 要被节流的函数
    * @param delay 规定的时间
    */
   function throttle(fn, delay) {
     //记录上一次函数触发的时间
     var lastTime = 0;
     return function () {
       var nowTime = Date.now();
       if (nowTime - lastTime > delay) {
         //修正this指向
         fn.call(this);
         //同步时间
         lastTime = nowTime;
       }
     };
   }
   ```

2. 防抖函数

   - 一个需要频繁触发的函数，在规定时间内，只让最后一次生效，前面的不生效
   - 连续点击、输入事件

   ```js
   function debounce(fn, delay) {
     //记录上一次延时器
     let timer = null;
     return function () {
       //清除上一次延时器
       clearTimeout(timer);
       //重新设置新的延时器
       timer = setTimeout(function () {
         fn.apply(this);
       }, delay);
     };
   }
   ```

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
2. 宏队列：用来保存待执行的宏任务（回调），比如：`定时器回调/DOM事件回调/ajax回调/requestAnimationFrame`
   - 第一个宏任务队列只有一个任务：执行主线程的 js 代码
   - 宏任务队列可以有多个
3. 微队列：用来保存待执行的微任务（回调），比如：`new Promise().then(回调)/MutationObserver回调/process nextTick`
   - 只有一个微任务队列
   - 在上一个宏任务队列执行完毕后如果有微任务队列就会执行微任务队列中的所有任务
4. JS 执行时会区别这 2 个队列
   - JS 引擎首先必须先执行所有的初始化同步任务代码
   - 每次准备取出第一个宏任务执行前，都要将所有的微任务一个一个取出来执行

---

## nodejs 的事件轮询机制

- 借助 libuv 库实现
- 概括事件轮询机制，分为 6 个阶段：

1. timers 定时器阶段
   - 计时和执行到点的定时器回调函数
2. pending callbacks
   - 某些系统操作（例如 TCP 错误类型）的回调函数
3. idle prepare
   - 准备工作
4. poll 轮询阶段 （轮询队列）
   - 如果轮询队列不为空，依次同步取出轮询队列中第一个回调函数执行，直到轮询队列为空或者达到系统最大的限制
   - 如果轮询队列为空
     - 如果之前设置过 setImmediate 函数
       - 直接进入下一个 check 阶段
     - 如果之前没有设置过 setImmediate 函数
       - 在当前 poll 阶段等待
         - 直到轮询队列添加回调函数，就去第一个情况执行
         - 如果定时器到点了，也会去下一个阶段
5. check 阶段
   - 执行 setImmediate 设置的回调函数
6. close callbacks 关闭阶段
   - 执行 close 事件回调函数

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

## DOM、BOM

1. DOM

- Document Object Model，文档对象模型
- DOM 是为了操作文档出现的 API，document 是其的一个对象
- DOM 和文档有关，这里的文档指的是网页，也就是 html 文档。DOM 和浏览器无关，他关注的是网页本身的内容。

2. BOM

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
  3. cookie 的使用

  ```js
  // 1.Cookie 的名称（Name）和值（Value）
  // 最重要的两个属性，创建 Cookie 时必须填写，其它属性可以使用默认值

  // Cookie 的名称或值如果包含非英文字母，则写入时需要使用 encodeURIComponent() 编码，读取时使用 decodeURIComponent() 解码
  // document.cookie = `username=${encodeURIComponent('张三')}`;
  // document.cookie = `${encodeURIComponent('用户名')}=${encodeURIComponent(
  //   '张三'
  // )}`;

  // 一般名称使用英文字母，不要用中文，值可以用中文，但是要编码

  // 2.失效（到期）时间
  // 对于失效的 Cookie，会被浏览器清除
  // 如果没有设置失效（到期）时间，这样的 Cookie 称为会话 Cookie
  // 它存在内存中，当会话结束，也就是浏览器关闭时，Cookie 消失

  // 想长时间存在，设置 Expires 或 Max-Age
  // expires
  // 值为 Date 类型
  // document.cookie = `username=alex; expires=${new Date(
  //   '2100-1-01 00:00:00'
  // )}`;

  // max-age
  // 值为数字，表示当前时间 + 多少秒后过期，单位是秒
  // document.cookie = 'username=alex; max-age=5';
  // document.cookie = `username=alex; max-age=${24 * 3600 * 30}`;

  // 如果 max-age 的值是 0 或负数，则 Cookie 会被删除
  // document.cookie = 'username=alex';
  // document.cookie = 'username=alex; max-age=0';
  // document.cookie = 'username=alex; max-age=-1';

  // 3.Domain 域
  // Domain 限定了访问 Cookie 的范围（不同域名）

  // 使用 JS 只能读写当前域或父域的 Cookie，无法读写其他域的 Cookie
  // document.cookie = 'username=alex; domain=www.imooc.com';

  // www.imooc.com m.imooc.com 当前域
  // 父域：.imooc.com

  // 4.Path 路径
  // Path 限定了访问 Cookie 的范围（同一个域名下）

  // 使用 JS 只能读写当前路径和上级路径的 Cookie，无法读写下级路径的 Cookie
  // document.cookie = 'username=alex; path=/course/list';
  // document.cookie = 'username=alex; path=/1.Cookie/';

  // 当 Name、Domain、Path 这 3 个字段都相同的时候，才是同一个 Cookie

  // 5.HttpOnly
  // 设置了 HttpOnly 属性的 Cookie 不能通过 JS 去访问

  // 6.Secure 安全标志
  // Secure 限定了只有在使用了 https 而不是 http 的情况下才可以发送给服务端

  // Domain、Path、Secure 都要满足条件，还不能过期的 Cookie 才能随着请求发送到服务器端

  // 1.前后端都可以创建 Cookie

  // 2.Cookie 有数量限制
  // 每个域名下的 Cookie 数量有限

  // 当超过单个域名限制之后，再设置 Cookie，浏览器就会清除以前设置的 Cookie

  // 3.Cookie 有大小限制
  // 每个 Cookie 的存储容量很小，最多只有 4KB 左右
  ```

  4. localStorage 的基本用法

  ```js
  // localStorage 存储的键和值只能是字符串类型
  // 不同的域名是不能共用 localStorage 的
  // IE7及以下版本不支持 localStorage，IE8 开始支持
  // setItem()
  localStorage.setItem("username", "alex");
  localStorage.setItem("username", "zs");
  localStorage.setItem("age", 18);
  localStorage.setItem("sex", "male");

  // length
  console.log(localStorage.length);

  // getItem()
  console.log(localStorage.getItem("username"));
  console.log(localStorage.getItem("age"));
  // 获取不存在的返回 null
  console.log(localStorage.getItem("name"));
  // removeItem()
  localStorage.removeItem("username");
  localStorage.removeItem("age");
  // 删除不存在的 key，不报错
  localStorage.removeItem("name");
  // clear()
  localStorage.clear();
  ```

## 一个页面从输入 url 到页面加载显示完成，发生了什么？

1. 浏览器通过 DNS 将 域名 地址解析为 ip(如果有缓存直接返回缓存，否则递归解析)
   - 浏览器 DNS 缓存
   - 系统 DNS 缓存
   - 路由器 DNS 缓存
   - 网络运营商 DNS 缓存
   - 递归搜索：blog.baidu.com
     - .com 域名下查找 DNS
     - .baidu 域名下查找 DNS
     - blog 域名下查找 DNS
     - 出错了
2. 通过 DNS 解析得到了目标服务器的 ip 地址后，与服务器建立 TCP 连接。

   - ip 协议：选择传输路线，负责找到
   - tcp 协议：三次握手，分片，可靠传输，重新发送的机制
     - 第一次握手，由浏览器发起，告诉服务器我要发送请求了
     - 第二次握手，由服务器发起，告诉浏览器我我准备接受了，你赶紧发送吧
     - 第三次握手，由浏览器发起，告诉服务器我马上就发了，准备接受吧

3. 发送请求
   - 浏览器通过 http 协议发送请求(增加 http 的报文信息)头 体 行
4. 接收响应
   - 服务器接收请求后，查库，读文件，拼接好返回的 http 响应
5. 渲染页面
   解析 html 为 dom，解析 css 为 css-tree，最终生成 render-tree 阻塞渲染
   - 遇见 html 标记，浏览器调用 HTML 解析器解析成 Token 并构建成 dom 树
   - 遇见 style/link 标记，浏览器调用 css 解析器，处理 css 标记并构建 cssom 树
   - 遇见 script 标记，调用 JavaScript 解析器，处理 script 代码（绑定事件，修改 dom 树/cssom 树）
   - 将 dom 树和 cssom 树合并成一个渲染树
   - 根据渲染树来计算布局，计算每个节点的几何信息（布局）
   - 将各个节点颜色绘制到屏幕上（渲染）
   - 注意：
     这步 5 个步骤不一定按照顺序执行，如果 dom 树或 cssom 树被修改了，可能会执行多次布局和渲染，
     往往实际页面中，这些步骤都会执行多次的。
6. 断开连接，TCP 四次挥手
   - 第一次挥手，由浏览器发起的，发送给服务器，我东西发送完了（请求报文），你准备关闭吧
   - 第二次挥手，由服务器发起的，发送给浏览器，我东西接受完了（请求报文），我准备关闭了，你也准备吧
   - 第三次挥手，由浏览器发起的，发送给浏览器，我东西发送完了（响应报文），你准备关闭吧
   - 第四次挥手，由浏览器发起的，发送给服务器，我东西接受完了（响应报文），我准备关闭了，你也准备吧

## 如何解决跨域

### 一. JSONP

1. JSONP 是什么

JSONP(JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，只支持 get 请求。

2. JSONP 怎么工作的？

在网页有一些标签天生具有跨域能力，比如：img link iframe script。JSONP 就是利用 script 标签的跨域能力来发送请求的。

3. JSONP 的使用

```js
//1.动态的创建一个 script 标签
var script = document.createElement("script");

//2.设置 script 的 src，设置回调函数
script.src = "http://localhost:3000/testAJAX?callback=abc";
function abc(data) {
  alert(data.name);
}

//3.将 script 添加到 body 中
document.body.appendChild(script);

//4.服务器中路由的处理
router.get("/testAJAX", function (req, res) {
  console.log("收到请求");
  var callback = req.query.callback;
  var obj = { name: "孙悟空", age: 18 };
  res.send(callback + "(" + JSON.stringify(obj) + ")");
});
```

4. jQuery 中的 JSONP

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <body>
    <button id="btn">按钮</button>
    <ul id="list"></ul>
    <script type="text/javascript" src="./jquery-1.12.3.js"></script>
    <script type="text/javascript">
      window.onload = function () {
        var btn = document.getElementById("btn");
        btn.onclick = function () {
          $.getJSON(
            "http://api.douban.com/v2/movie/in_theaters?callback=?", //callback=?固定写法
            function (data) {
              console.log(data);
              //获取所有的电影的条目
              var subjects = data.subjects;
              //遍历电影条目
              for (var i = 0; i < subjects.length; i++) {
                $("#list").append(
                  "<li>" +
                    subjects[i].title +
                    "<br />" +
                    '<img src="' +
                    subjects[i].images.large +
                    '" >' +
                    "</li>"
                );
              }
            }
          );
        };
      };
    </script>
  </body>
</html>
```

### 二. CORS

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

1. CORS 是什么？

   CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持 get 和 post 请求。跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源

2. CORS 怎么工作的？

   CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。

3. CORS 的使用
   ```js
   //主要是服务器端的设置：
   router.get("/testAJAX", function (req, res) {
     //通过 res 来设置响应头，来允许跨域请求
     //res.set("Access-Control-Allow-Origin","http://127.0.0.1:3000");
     //Access-Control-Allow 访问控制允许
     res.set("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Headers", "*"); //允许自定义头部
     res.setHeader("Access-Control-Allow-Method", "*"); //允许所有请求方法
     res.send("testAJAX 返回的响应");
   });
   ```

```

```
