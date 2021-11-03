# HTTP

HTTP（hypertext transport protocol）协议【超文本传输协议】，协议详细规定了浏览器和万维网服务器之间互相通信的规则。

## 请求报文

```
行      POST /s?ie=utf-8 HTTP/1.1
头      Host: XXX.com
        Cookie: name=guigu
        Content-type: application/x-www-form-urlencoded
        User-Agent: chrom 83
空行
体      username=admin&password=admin
```

## 响应报文

```
行      HTTP/1.1 200 ok
头      Content-type: text/html;charset=utf-8
        Content-length: 2048
        Content-encoding: gzip
空行
体      <html>
            <head>
            </head>
            <body>
                <h1>XXX</h1>
            </body>
        </html>
```

---

# 原生 AJAX

`Asynchronous JavaScript And XML，异步的JS和XML`

## 简介

1. 通过 AJAX 可以在浏览器中向服务器发送异步请求，最大的优势：`无刷新获取数据`。
2. AJAX 不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。

## XML 简介

- 可扩展标记语言。
- 被设计用来传输和存储数据。
- XML 和 HTML 类似，不同的是 HTML 中都是预定义标签，而 XML 中没有预定义标签，全都是自定义标签，用来表示一些数据。

```xml
<student>
    <name>孙悟空</name>
    <age>18</age>
    <gender>男</gender>
</student>
```

## AJAX 特点

### 优点

1. 可以无需刷新页面与服务器端进行通信
2. 允许你根据用户事件来更新部分页面数据

### 缺点

1. 没有浏览器历史，不能回退
2. 存在跨域限制（同源）
3. SEO 不友好

## AJAX 的使用

### 核心对象

XMLHttpRequest，AJAX 的所有操作都是通过该对象进行的。

### 使用步骤

```js
1. 创建 XMLHttpRequest 对象
  var xhr = new XMLHttpRequest();
2. 设置请求信息
  xhr.open(method, url);
  //可以设置请求头，一般不设置
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
3. 发送请求
  xhr.send(body); //get 请求不传 body 参数，只有 post 请求使用
4. 接收响应
  //xhr.responseXML 接收 xml 格式的响应数据
  //xhr.responseText 接收文本格式的响应数据
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) var text = xhr.responseText;
      console.log(text);
    }
  };
```

### 解决 IE 缓存问题

- 问题：在一些浏览器中(IE),由于缓存机制的存在，ajax 只会发送的第一次请求，剩余多次请求不会在发送给浏览器而是直接加载缓存中的数据。
- 解决方式：浏览器的缓存是根据 url 地址来记录的，所以我们只需要修改 url 地址即可避免缓存问题

```
xhr.open("get","/testAJAX?t="+Date.now());
```

## API

- XMLHttpRequest()：创建 XHR 对象的构造函数
- status：响应状态码值，如 200、404
- statusText：响应状态文本，如 ’ok‘、‘not found’
- readyState：标识请求状态的只读属性 0-1-2-3-4
  - 0: 表示 XMLHttpRequest 实例已经生成，但是 open()方法还没有被调用
  - 1: 表示 send()方法还没有被调用，仍然可以使用 setRequestHeader()，设定 HTTP 请求的头信息
  - 2: 表示 send()方法已经执行，并且头信息和状态码已经收到
  - 3: 表示正在接收服务器传来的 body 部分的数据
  - 4: 表示服务器数据已经完全接收，或者本次接收已经失败了
- onreadystatechange：绑定 readyState 改变的监听
- responseType：指定响应数据类型，如果是 ‘json’，得到响应后自动解析响应
- response：响应体数据，类型取决于 responseType 的指定
- timeout：指定请求超时时间，默认为 0 代表没有限制
- ontimeout：绑定超时的监听
- onerror：绑定请求网络错误的监听
- open()：初始化一个请求，参数为：(method, url[, async])
- send(data)：发送请求
- abort()：中断请求 （发出到返回之间）
- getResponseHeader(name)：获取指定名称的响应头值
- getAllResponseHeaders()：获取所有响应头组成的字符串
- setRequestHeader(name, value)：设置请求头

---

# jQuery 中的 AJAX

## get 请求

```
$.get(url,[data],[callback],[type])

- url:请求的 URL 地址
- data:请求携带的参数
- callback:载入成功时回调函数
- type:设置返回内容格式，xml, html, script, json, text, _default
```

## post 请求

```
$.post(url,[data],[callback],[type])

- url:请求的 URL 地址
- data:请求携带的参数
- callback:载入成功时回调函数
- type:设置返回内容格式，xml, html, script, json, text, _default
```

## 通用方法

```
$.ajax({
    //url
    url:'http:127.0.0.1:8000/jquery-server',
    //参数
    data:{
       a:100,
       b:200
    },
    //请求类型
    type:'GET',
    //响应体结果
    datatype:'json',
    //成功回调
    success:function(data){
        console.log(data)
    },
    //超时时间
    timeout:2000,
    //失败回调
    error:function(){
        console.log('出错啦')
    }
    //请求头信息
    headers:{
        c:300,
        d:400
    }
})
```

---

# Axios 中的 AJAX

## get 请求

```js
axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.get('/axios-server',{
    params:{}
    headers:{}
}).then(value=>{
    console.log(value)
})

```

## post 请求

```js
axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.post('/axios-server',
//请求体
{
    username:'admin',
    password:'admin'
},
//其他配置
{
    //url参数
    params:{id:200,vip:9}
    //请求头
    headers:{}
}).then(value=>{
    console.log(value)
})

```

## 通用方法

```js
axios.defaults.baseURL = "http://127.0.0.1:8000";
axios({
  method: "POST",
  url: "/axios-server",
  //url参数
  params: {
    vip: 10,
    level: 30,
  },
  headers: {
    a: 100,
    b: 200,
  },
  //请求体参数
  data: {
    username: "admin",
    password: "admin",
  },
}).then((response) => {
  //响应状态码
  console.log(response.status);
  //响应状态字符串
  console.log(response.statusText);
  //响应头信息
  console.log(response.headers);
  //响应体
  console.log(response.data);
  //配置
  console.log(response.config);
  //请求
  console.log(response.request);
});
```

---

# Fetch 中的 AJAX

## get 请求

```js
fetch("http://127.0.0.1:8000/fetch-server?vip=10", {
  method: "POST",
  headers: { name: "xxx" },
  body: "username=admin&password=admin",
})
  .then((response) => {
    // return response.text();
    return response.json();
  })
  .then((response) => {
    console.log(response);
  });
```

---

# 跨域

## 同源策略

- 同源策略(Same-Origin Policy)最早由 Netscape 公司提出，是浏览器的一种安全策略。
- 同源： 协议、域名、端口号 必须完全相同。
- 违背同源策略就是跨域。

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
     res.set("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Headers", "*"); //允许自定义头部
     res.setHeader("Access-Control-Allow-Method", "*"); //允许所有请求方法
     res.send("testAJAX 返回的响应");
   });
   ```
