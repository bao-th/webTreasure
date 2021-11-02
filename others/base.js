// ! 红色的高亮注释
// ? 蓝色的高亮注释
// * 绿色的高亮注释
// todo 橙色的高亮注释
// // 灰色带删除线的注释
// 普通的注释

// todo 判断类型
typeof [] == 'object'
Object.prototype.toString.call(a) === '[object Function]'
Object.prototype.valueOf() // 返回对象的原始值
object instanceof constructor // 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

// todo 类数组转数组方法
[...类数组]
Array.from(类数组)
Array.prototype.slice.apply(arguments)

// todo 如何判断对象和数组
isArray() // es6语法
Object.prototype.toString.call() // 无兼容性问题

// todo 手写flatten
function flatten(arr) {
	let result = [];
	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			result = result.concat(flatten(arr[i]))
		} else {
			result.push(arr[i])
		}
	}
	return result;
}
console.log(flatten([1, [2, [3, 4]]]));

// todo 数组去重
console.log(Array.from(new Set([1, 1, 2, 2]), null/*类似map中对每个元素的处理 */))

// todo Reduce()方法
[65, 4, 12, 4].reduce((total, num, index, arr) => {
	//求和
	return total + num

}, 0 /** total初始值 */)

/**
 * todo 跨域 
 * 指通过js在不同的域之间进行数据传输或通信,只要协议、域名、端口有任何一个不同，都被当作是不同的域。
 * 1、如果是协议和端口造成的跨域问题“前台”是无能为力的； 
 * 2、在跨域问题上，域仅仅是通过“URL的首部”来识别而不会去尝试判断相同的ip地址对应着两个域或两个域是否在同一个ip上。
 */
// ? 1. jsonp: (利用script标签跨域)
// #（1）安全问题(请求代码中可能存在安全隐患)
// #（2）要确定jsonp请求是否失败并不容易
// ajax请求受同源策略影响，不允许进行跨域请求，而script标签src属性中的链接却可以访问跨域的js脚本，
// 利用这个特性，服务端不再返回JSON格式的数据，而是返回一段调用某个函数的js代码，在src中进行了调用，这样实现了跨域。
// ? 2. document.domain: 浏览器同源策略限制
// #（1）不能通过ajax的方法去请求不同源中的文档，像微服务架构这种，服务接口是独立的
// #（2）浏览器中不同域的框架之间是不能进行js的交互操作的
// ? 3. window.name（推荐）
// #1.window.name的值只能是字符串的形式，这个字符串的大小最大能允许2M左右甚至更大的一个容量，具体取决于不同的浏览器
// ? 4. window.postMessage('message', 'targetOrigin/*')
{/* <script>
	window.onmessage = function(e) {//注册message时间来接收消息
		e = e || event;            //获取时间对象
		alert(e.data);             //通过data属性来得到传送的消息
	}
	</script> */}
// ? 5. 使用跨域资源共享（CORS）来跨域
// Access-Control-Allow-Origin : '*'
// 一种跨域访问的机制，可以让AJAX实现跨域访问；CORS允许一个域上的网络应用向另一个域提交跨域AJAX请求。
// 服务器设置Access-Control-Allow-Origin HTTP响应头之后，浏览器将会允许跨域请求．
// 就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。
function creatCORS(method, url) {
	var xhr = new XMLHttpRequest();
	if ('widthCredentials' in xhr) {
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != 'undefined') {
		var xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null
	}
	return xhr;
}
var request = creatCORS('get', 'http://www.test.com');
if (request) {
	request.onload = function () {
		// ......
	};
	request.send();
}
// ? 6. 使用location.hash + iframe来跨域（不常用）
// ? 7. Web sockets
// web sockets： 是一种浏览器的API，它的目标是在一个单独的持久连接上提供全双工、双向通信。(同源策略对web sockets不适用)
// web sockets原理：在JS创建了web socket之后，会有一个HTTP请求发送到浏览器以发起连接。取得服务器响应后，建立的连接会使用HTTP升级从HTTP协议交换为web sockt协议
// ? 8. flash URLLoader
//flash有自己的一套安全策略，服务器可以通过crossdomain.xml文件来声明能被哪些域的SWF文件访问，SWF也可以通过API来确定自身能被哪些域的SWF加载。

// #1. 首先，修改域google.com上的crossdomain.xml(一般存放在根目录，如果没有需要手动创建) ，把baidu.com加入到白名单。 
// #2. 其次，通过Flash URLLoader发送HTTP请求 
// #3. 最后，通过Flash API把响应结果传递给JavaScript。
// #4. Flash URLLoader是一种很普遍的跨域解决方案，不过需要支持iOS的话，这个方案就不可行了。
// ? 9. Node正向代理，利用服务端不跨域的特性
// ? 10. nginx反向代理proxy_pass
// ? 11. img标签


// todo 前端性能调优
// ? 1.html压缩、css压缩、js的压缩和混乱和文件合并
// ? 2.非核心代码异步加载异步加载的方式，async和defer、动态脚本创建
// ? 3.利用浏览器缓存
// ? 4.使用CDN（通过将静态资源(例如javascript，css，图片等等）缓存到离用户很近的相同网络运营商的CDN节点上，
// ? 不但能提升用户的访问速度，还能节省服务器的带宽消耗，降低负载。）
// ? 5.预解析DNS

// todo 跨浏览器、跨终端
// ! 一.CSS兼容
// ? 1.不同浏览器的标签默认的margin和padding不同，引入reset.css样式重置浏览器默认样式
// ? 2.css3新属性，加浏览器前缀兼容早期浏览器:
//  -moz- : // ! 火狐浏览器
//  -webkit- : // ! Safari(苹果), 谷歌浏览器等使用Webkit引擎的浏览器 
//  -o- : // ! Opera浏览器(早期)
//  -ms- : // ! IE 
// ? 3.超链接访问过后hover和active样式就不出现的问题：
//  改变CSS属性的排列顺序: L-V-H-A
//  <style type="text/css">
// 		a:link {}
// 		a:visited {}
// 		a:hover {}
// 		a:active {}
//  </style>
// ? 4.css hack解决浏览器兼容性
//  background-color:yellow0; // ! 0 是留给ie8的
//  +background-color:pink;   // ! + ie7定了；
//  _background-color:orange; // ! _专门留给神奇的ie6；
// ! 二.JS兼容
// ? 1.事件绑定：如果浏览器不支持 addEventListener()方法, 你可以使用 attachEvent()方法替代
// var x = document.getElementById("myBtn");
// if (x.addEventListener) {   // ! 所有主流浏览器，ie9+
// 	x.addEventListener("click", myFunction);
// } else if (x.attachEvent) {      // ! IE 8 及更早 IE 版本
// 	x.attachEvent("onclick", myFunction);
// }
// ? 2.event事件对象问题
// document.onclick=function(ev){// ! 谷歌火狐的写法，IE9以上支持，往下不支持；
// 	var e=ev;
// 	console.log(e);
// }
// document.onclick=function(){// ! 谷歌和IE支持，火狐不支持；
// 	var e=event;
// 	console.log(e);
// }
// document.onclick=function(ev){// ! 兼容写法；
// 	var e=ev||window.event;
// 	var mouseX=e.clientX;//鼠标X轴的坐标
// 	var mouseY=e.clientY;//鼠标Y轴的坐标
// }
// ? 3.event.srcElement(事件源对象)问题：IE： event对象有srcElement属性，但是没有target属性；Firefox: event对象有target属性，但是没有srcElement属性。
// srcObj = event.srcElement?event.srcElement:event.target;
// ? 4.阻止事件冒泡传播：
// document.onclick=function(e){
//     var e=e||window.event;
//     if (e.stopPropagation) {
//         e.stopPropagation();// ! W3C标准
//     }else{
//         e.cancelBubble=true;// ! IE....
//     }
// }

// ? 5.阻止事件默认行为：
//js阻止默认事件   一般阻止a链接href，form表单submit提交
// document.onclick=function(e){
// 	var e=e||window.event;
// 	if (e.preventDefault) {
// 		e.preventDefault();// ! W3C标准
// 	}else{
// 		e.returnValue='false';// ! IE..
// 	}
// }
// ? 6.ajax兼容问题：在IE6以前不是用XMLHttpRequest创建的，所以我们要兼容ie6以前的浏览器要判断他有没有XMLHttpRequest()
// <script>
window.onload = function () {
	var oBtn = document.getElementById('btn');
	oBtn.onclick = function () {
		//1.创建ajax对象
		// ! 只支持非IE6浏览器
		var oAjax = null;
		if (window.XMLHttpRequest) {
			oAjax = new XMLHttpRequest();
			// ! alert(new XMLHttpRequest());
		} else {
			// ! 只支持IE6浏览器
			oAjax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		//2.连接服务器, 这里加个时间参数, 每次访问地址都不一样, 浏览器就不用浏览器里的缓冲了,
		//但服务器那端是不解析这个时间的
		oAjax.open("get", "a.txt?t=" + new Date().getTime(), true);
		//3.发送
		oAjax.send(null);
		//4.接受信息
		oAjax.onreadystatechange = function () {
			//浏览器与服务器之间的交互,进行到哪一步了,当等于4的时候,代表读取完成了
			if (oAjax.readyState == 4) {
				//状态码,只有等于200,代表接受完成,并且成功了
				if (oAjax.status == 200) {
					alert("成功" + oAjax.responseText);
				} else {
					alert("失败");
				}
			}
		};

	};
};
// </script>

// todo 响应式网页设计
//响应式布局是为了在开发中网站适应不同分辨率 不同设备的下提供的方法
// ? 1.百分比布局
// ? 2.利用媒体查询（css3新增特性 @media）
// @media screen and(max-width: 960px){
// 	body{
// 		background-color:#FF6699
// 	}
// }
// 栅格布局：'./grid.css','./grid-flex.css'
// ! 媒体查询的缺点也很明显，如果在浏览器大小改变时，需要改变的样式太多，那么多套样式代码会很繁琐
// ? 3.rem 响应式布局
window.onresize = setRemUnit
setRemUnit()
function setRemUnit() {
	console.log('1111');
	var docEl = document.documentElement;
	var viewWidth = docEl.clientWidth;
	docEl.style.fontSize = viewWidth / 375 * 20 + 'px'   //1rem = 20px
}
// rem单位无论嵌套层级如何，都只相对于浏览器的根元素（HTML元素）的font-size
// ! 也就是说css样式和js代码有一定的耦合性。且必须将改变font-size的代码放在css样式之前
// ? 4.视口单位：vw vh 响应式布局
// vw、vh、vmin(vw和vh中的较小值)、vmax(vw和vh中的较大值)
// ? 5.利用弹性盒子 Flex 布局

// todo css预处理
// ? 变量声明
// $nav-color: #F90
// nav {
// 	$width: 100px;
// 	width: $width;
// 	color: $nav-color
// }
// ? 嵌套CSS规则
// #content {
// 	article {
// 	  h1 { color: #333 }
// 	  p { margin-bottom: 1.4em }
// 	}
// 	aside { background-color: #EEE }
//  }
//  // 编译后
//  #content article h1 { color: #333 }
//  #content article p { margin-bottom: 1.4em }
//  #content aside { background-color: #EEE }
// ? 父选择器的标识符&
// article a {
// 	color: blue;
// 	&:hover { color: red }
//  }
//  // 编译后
//  article a { color: blue }
//  article a:hover { color: red }]
// ? 群组选择器的嵌套
// .container h1, .container h2, .container h3 { margin-bottom: .8em }
// .container {
//     h1, h2, h3 { margin-bottom: .8em }
// }
// ? 子组合选择器和同层组合选择器：>、+和~
// article {
// 	~ article { border-top: 1px dashed #ccc }
// 	> section { background: #eee }
// 	dl > {
// 	  dt { color: #333 }
// 	  dd { color: #555 }
// 	}
// 	nav + & { margin-top: 0 }
//   }
//   // 编译后
//   article ~ article { border-top: 1px dashed #ccc }
//   article > footer { background: #eee }
//   article dl > dt { color: #333 }
//   article dl > dd { color: #555 }
//   nav + article { margin-top: 0 }
// ? 嵌套属性
// nav {
// 	border: {
// 	style: solid;
// 	width: 1px;
// 	color: #ccc;
// 	}
// }
//   // 编译后
// nav {
// 	border-style: solid;
// 	border-width: 1px;
// 	border-color: #ccc;
// }
// ? 嵌套导入
// .blue-part { @import 'blue-theme' }
// ? 混合器
// @mixin rounded-corners {
// 	-moz-border-radius: 5px;
// 	-webkit-border-radius: 5px;
// 	border-radius: 5px;
// }
// .notice {
// 	background-color: green;
// 	border: 2px solid #00aa00;
// 	@include rounded-corners;
// }
//   //scss最终生成：
//  .notice {
// 	background-color: green;
// 	border: 2px solid #00aa00;
// 	-moz-border-radius: 5px;
// 	-webkit-border-radius: 5px;
// 	border-radius: 5px;
// }
// ? 给混合器传参
// @mixin link-colors ($normal, $hover, $visited) {
//     color: $normal;
//     &:hover { color: $hover ;}
//     &:visited { color: $visited; }
// }
// a {
//     @include link-colors(blue, red, green)
// }
// // scss最终生成的是：
// a { color: blue; }
// a:hover { color: red; }
// a:visited { color: green; }
// ? 使用选择器继承来精简css
//通过选择器继承继承样式
// .error {
// 	border: 1px solid red;
// 	background-color: #fdd;
//   }
// .seriousError {
// 	@extend .error;
// 	border-width: 3px;
//   }
//   // 编译后
// .seriousError {
// 	border: 1px solid red;
// 	background-color: #fdd;
// 	border-width: 3px;
//   }
// todo webgl/threejs
// todo RESTful （Representational State Transfer，表现层状态转化）
// 就是目前最流行的一种互联网软件架构。它结构清晰、符合标准、易于理解、扩展方便，所以正得到越来越多网站的采用。
// 如果一个架构符合REST原则，就称它为RESTful架构。
// REST的名称"表现层状态转化"中，省略了主语。"表现层"其实指的是"资源"（Resources）的"表现层"。
// HTTP协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。



// todo 数组分割
splice(index, howmany, item1, /* ..., */ itwmX) // 改变原数组，从数组中添加/删除项目，然后返回被删除的项目
slice(start, end) // 不改变原数组，返回含有分割元素的数组, 默认：start:0, end:length
concat() // 不改变原数组,返回新数组，浅拷贝
join() // 默认以','拼接成字符串
// todo 字符串操作
concat()
slice(start, end) //负数时全部倒数
substring(start, end) // 负数全部为0,可以按从小到大颠倒
substr(start, length) // 第一个负数倒数，第二个负数为0
// 全都不改变原字符串

match() // 正则查找
search() // 正则查找
replace() // 正则替换
split(分隔符, 数组长度) // 分割字符串为数组
// var colorText = "red,blue,green,yellow";
// var colors1 = colorText.split(","); //["red", "blue", "green", "yellow"]
// var colors2 = colorText.split(",", 2); //["red", "blue"]
// var colors3 = colorText.split(/[^\,]+/); //["", ",", ",", ",", ""]

// todo 对象原型、构造函数、proto
obj = {
	__proto__: null // -- > 创建该对象的构造函数的原型prototype，存放引用
}
__proto__ => constructor => prototype

var a = new Object.create(null)//啥都没有的对象



// todo 备忘录
// ? 1. Dtd：文档类型声明。
// ? 2.字符集：UTF-8全，一个文字3个字节，GB2312（GBK）不那么全，一个文字两个字节
// ? 3.SEO搜索引擎配置项：title，meta标签，describtion，keywords，h1不能使用太多次
// ? 4.转义符：&lt小与，&gt大于，&nbsp空格不会被折叠，&copy版权符
// ? 5.<a href target='blank' title=""></a>
// ? 6.css 内嵌式，外链式<link rel="" href="">，行内式，导入式@import url(css/css.css)页面加载完才会加载样式
// ? 7.css2.1 选择器：标签选择器，id选择器，类选择器，复合选择器：后代选择器（空格），交集选择器（. ），并集选择器（, ）
// ? 8.css3新增选择器：元素关系选择器：子选择器（>），相邻兄弟选择器（+），通用兄弟选择器（~），序号选择器，属性选择器（img alt），新增伪类： :empty，:focus，:enabled，:disabled，
// ? :checked，:root，伪元素： ::before，after，selection，first-letter，first-line
// ? 优先级：!important > 行内式 > id选择器 > 类选择器、属性选择器、伪类选择器 > 标签选择器、关系选择器、伪元素选择器 > 通配符选择器* > 

// ? 1.margin：上下塌陷
// ? 2.float：脱离文档流，不区分行块，可设置宽高，按顺序向前一位贴靠
// ? 3.BFC：块级格式化上下文，创建方法：float不是none，position不是relative和static，display是inline-block，flex，inline-flex，overflow：hidden；可以阻止margin塌陷，可以阻止元素被浮动元素遮挡
// ? 4.清除浮动：overflow：hidden，clear:both; margin无用，::after{content:'',clear:both,display:block}，隔一个带clear：both的div
// ? 5.脱离文档流，可设置宽高，绝对定位，子绝父相

// ? CSS
// ? 2D、3D变形：旋转rotate、位移translate、缩放scale、斜切skew、变换原点transform-origin、透视强度(景深，眼睛到舞台的距离)perspective:300px
// transform: rotateX(90deg) translateZ(100px);
/* 设置变形类型，保留它内部的3D效果 */
/* 这个盒子又是舞台，又是演员，这个box整体带着里面的p旋转 */
// transform-style: preserve-3d;
// ? 动画 animation
// animation: r 1s linear 0s infinite次数 alternate偶数次反向 forwards停止在最后结束状态
// ? 定义动画
// @keyframes r {
// 	from {

// 	}
// 	to {

// 	}
或者
// 	0% {

// 	}
// 	100% {

// 	}
// }
// ? 过渡transition:什么属性/all 动画时长s 变化速度曲线 延迟时间s
// 变化速度曲线：linear匀速、ease、ease-in、ease-out、ease-in-out、贝塞尔曲线cubic-bezier(0.1, 0.7, 1.0, 0.1)

// ? 函数
// ! 局部变量会“遮蔽”全局变量
// ! 变量声明会提前，函数声明也会提前，函数表达式不能提升，函数比变量声明优先提升
// ! 不加var将定义全局变量
函数声明
function fun() { }

function addCount() {
	var count = 0
	return function () {
		count = count + 1
		console.log(count);
	}
}
var fun1 = addCount()
var fun2 = addCount()
fun1()
fun2()
fun2()
fun1()

函数表达式
var fun = function () { }
// ! arguments：实参列表，类数组对象，不能调用数组的方法
// ! 作用域链：在函数嵌套中，变量会从内到外逐层寻找
// ! 闭包closure：是函数本身和该函数声明时所处的环境状态的组合
// 函数能够“记忆住”其定义时所处的环境，即使函数不在其定义的环境中被调用，也能访问定义时所处环境的变量。
// 每次创建函数时都会创建闭包
// 记忆性：当闭包产生时，函数所处环境的状态会始终保持在内存中，不会在外层函数调用后被自动清除。
// 模拟私有变量
// ! 注意点：内存泄漏
// ! 立即执行函数IIFE(立即调用函数表达式)：
// (function () {         
// 	statements
// })()

// +function () {
// 	statements
// }()

// -function () {
// 	statements
// }()

// ? 事件的传播
// 先从外到内（捕获阶段capturing phase），然后再从内到外（冒泡阶段Bubbling phase）
// DOM0级事件监听：只能监听冒泡阶段
oBox.onclick = function () { };
// DOM2级事件监听：
oBox.addEventListener('click', function () {
	//这是事件处理函数
}, true);// true监听捕获阶段，false监听冒泡阶段
注意事项
// 最内部元素不再区分捕获和冒泡阶段，会先执行写在前面的监听，然后执行后写的监听
// 如果给元素设置相同的两个或多个同名事件，则DOM0级写法后面写的会覆盖先写的；而DOM2级会按顺序执行

// todo sort()函数
// a:靠前项,b:靠后项
// 返回任意正数,交换位置；否则返回负数
[1, 2, 3, 4, 5].sort(function (a, b) {
	if (a > b) {
		return 1;
	} else {
		return -1;
	}
})


// ? 数据类型
// undefined进行任何运算结果都是NaN

// todo
let x = {
	profile: {
		name: '浪里行舟',
		age: '18'
	}
}
console.log(x?.profile?.age)


// todo Dom 事件代理
document.getElementById("father-id").onclick = function (event) {
	event = event || window.event
	let target = event.target || event.srcElement
	if (target.nodeName.toLowerCase() === "xxx") {
		//事件内容
	}
}

// todo 运算符
// 在关系运算符中，null，undefined会被Number()强制转换成数字类型；
null >= 0  //true，Number(null)==0
undefined >= 0  //false，Number(undefined)==NaN

// 在相等运算符中，null，undefined则不会转化为数字类型，而是经过特殊处理后转化为false
// （当然，除了与自身对比，或者是null与undefined对比，即都为true）
null == 0  //false
undefined == 0  //false

// todo 有道笔记
parseInt(string, radix)
// ? radix：进制基数，2~36之间，小于2或大于36都返回NaN，string小于10时，string大于等于基数radix，返回NaN
// ? 先看string是否在进制范围内，如果存在不在范围内的字符去掉后，在计算进制
// ? 如果 string 以 "0x" 开头，parseInt() 会把 string 的其余部分解析为十六进制的整数
// 例：
parseInt('25', 8); //21
//'25'分为2和5，然后和8比较，均比8小
//计算:2和5的索引分别为 1，0。计算方法为2乘以8的1次方加上5乘以8的0次方
//计算公式：2*8^1+5*8^0=21
parseInt('292', 8); //2
//'292'分为2和9，然后和8比较，当大于等于8时后面的数字（包含自己）截去，所以从9开始截去，只剩2
//计算:2的索引为 0。计算方法为2乘以8的0次方
//计算公式：2*8^0=2
parseInt('9', 8)
//当第一个数就比参数大时，返回NAN

// todo 2. map循环
// ? arr.map(callback: (value: T, index: number, array: T[]) => U, thisArg?:any)
// todo 3. Set、WeakSet、Map、WeakMap
// todo Set：类似数组；
// ? 无重复数据；
// ? 本身为一个构造函数，new Set()；
// ? Set中的值不会发生类型转换，判断类似于精确相等运算符（===）；
// ? 主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身；
// ? 俩个{}也不相等；
// ? key value 相等
// todo 操作：
// ? Set.prototype.size：返回Set实例的成员总数
// ? Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
// ? Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// ? Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
// ? Set.prototype.clear()：清除所有成员，没有返回值。
// todo 遍历：
// ? Set.prototype.keys()：返回键名的遍历器
// ? Set.prototype.values()：返回键值的遍历器
// ? Set.prototype.entries()：返回键值对的遍历器
// ? Set.prototype.forEach()：使用回调函数遍历每个成员
// todo 用处：
// ? 数组去重
// todo WeakSet：类似Set
// ? 无重复数据，数据只能为对象；
// ? 对象为弱引用，即垃圾回收机制不考虑该对象的引用，对象在外部消失，WeakSet内部也会消失；
// ? 由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历；
// ? 没有size方法，不能遍历；
// todo 操作：
// ? add(value)：添加某个值，返回 Set 结构本身。
// ? delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// ? has(value)：返回一个布尔值，表示该值是否为Set的成员。
// todo 用处：
// ? 储存Dom节点;
// todo Map：
// ? Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键；
// ? “键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键；
// ? Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现；
// ? 可转为Json，可以跟多种数据格式转换；
// todo 操作：
// ? Map.prototype.size：返回Map实例的成员总数
// ? Map.prototype.set(key,value)：添加某个值，返回 Map 结构本身。
// ? Map.prototype.get(key)：添加某个值，返回 key 对应键值。
// ? Map.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// ? Map.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
// ? Map.prototype.clear()：清除所有成员，没有返回值。
// todo 遍历：
// ? Map.prototype.keys()：返回键名的遍历器
// ? Map.prototype.values()：返回键值的遍历器
// ? Map.prototype.entries()：返回键值对的遍历器
// ? Map.prototype.forEach()：使用回调函数遍历每个成员
// todo WeakMap：
// ? WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名；
// ? WeakMap的键名所指向的对象，不计入垃圾回收机制；
// todo 用处：
// ? 如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap；
// ? 一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除；
// ? WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用；
// todo 操作：
// ? 只有四个方法可用：get()、set()、has()、delete()；
// ? 不能遍历循环，无size；

// todo 4. 继承
// ? ES6：
// ? ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。 
// ? 先继承父类的属性和方法，在创建this；
// ? ES5：
// ? 直接就有this，后在将继承的父类的属性和方法修改到this上；

// todo 5.Array.flat()、Array.flatMap()
// ? flat(深度)：用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响
// ? flat(Infinity)：不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数；
// ? flatMap()：只能展开一层数组，先执行map，再flat；

// todo 6.Array.from()
// ? ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ? ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
Array.from({ length: 3 }); // [ undefined, undefined, undefined ] ,扩展运算符...算不了
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

// todo 7.引用类型在比较运算符时候,隐式转换会调用本类型toString或valueOf方法
var a = {
	i: 1,
	toString() {
		return a.i++;
	}
}
if (a == 1 && a == 2 && a == 3) {
	console.log(1);
}
或
let a = [1, 2, 3];
a.toString = a.shift;
console.log(a.shift)
if (a == 1 && a == 2 && a == 3) {
	console.log(1);
}

// todo 8.event loop
// ? nodejs的event loop分为6个阶段，它们会按照顺序反复运行，分别如下：
// timers：执行setTimeout() 和 setInterval()中到期的callback。
// I/O callbacks：上一轮循环中有少数的I/Ocallback会被延迟到这一轮的这一阶段执行
// idle, prepare：队列的移动，仅内部使用
// poll：最为重要的阶段，执行I/O callback，在适当的条件下会阻塞在这个阶段
// check：执行setImmediate的callback
// close callbacks：执行close事件的callback，例如socket.on("close",func)

// 同一个上下文下，MicroTask会比MacroTask先运行
// 然后浏览器按照一个MacroTask任务，所有MicroTask的顺序运行，Node按照六个阶段的顺序运行，并在每个阶段后面都会运行MicroTask队列
// 同个MicroTask队列下process.tick()会优于Promise
// nextTick并不在这些阶段中执行，它在每个阶段之后都会执行，nextTick队列优先级高于同一轮事件循环中其他microtask队列
// ? 浏览器事件循环
// 常见的macrotask有：
// run <script>（同步的代码执行）
// setTimeout
// setInterval
// setImmediate (Node环境中)
// requestAnimationFrame
// I/O
// UI rendering

// 常见的microtask有：
// process.nextTick (Node环境中)
// Promise callback
// Object.observe (基本上已经废弃)
// MutationObserver


// todo 垃圾回收机制
// ? 垃圾回收机制就是间歇的不定期的寻找到不再使用的变量，并释放掉它们所指向的内存; 主要为了以防内存泄漏，
// ?(内存泄漏: 当已经不需要某块内存时这块内存还存在着),

// ? JS有两种变量: 全局变量和在函数中产生的局部变量。
// 局部变量的生命周期在函数执行过后就结束了，
// ? 此时便可将它引用的内存释放(即垃圾回收);
// 但全局变量生命周期会持续到浏览器关闭页面。

// ? JS执行环境中的垃圾回收器有两种方式：
// ? 标记清除（mark and sweep）、
// ? 引用计数(reference counting) 。

// ? 标记清除: 垃圾收集器给内存中的所有变量都加上标记，
// 然后去掉环境中的变量以及被环境中的变量引用的变量的标记。
// 在此之后再被加上的标记的变量即为需要回收的变量，
// 因为环境中的变量已经无法访问到这些变量。

// ? 引用计数(reference counting): 这种方式常常会引起内存泄漏，
// 低版本的IE使用这种方式。机制就是跟踪一个值的引用次数，
// 当声明一个变量并将一个引用类型赋值给该变量时该值引用次数加1，
// 当这个变量指向其他一个时该值的引用次数便减一。
// 当该值引用次数为0时就会被回收。

// todo DOM、BOM：
// ? DOM：
// Document Object Model，文档对象模型
// DOM 是为了操作文档出现的 API，document 是其的一个对象
// DOM和文档有关，这里的文档指的是网页，也就是html文档。DOM和浏览器无关，他关注的是网页本身的内容。

// ? BOM：
// Browser Object Model，浏览器对象模型
// BOM 是为了操作浏览器出现的 API，window 是其的一个对象
// window 对象既为 javascript 访问浏览器提供API，同时在 ECMAScript 中充当 Global 对象

// todo href与src
// ? href
// href标识超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系
// 若在文档中添加href ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。
// 这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。

// ? src
// src表示引用资源，替换当前元素，用在img，script，iframe上，src是页面内容不可缺少的一部分。
// 当浏览器解析到src ，会暂停其他资源的下载和处理（图片不会暂停其他资源下载），直到将该资源加载、编译、执行完毕，
// 类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。


// todo 一个页面从输入url到页面加载显示完成，发生了什么？
// ? 1.浏览器通过DNS将url地址解析为ip(如果有缓存直接返回缓存，否则递归解析)
// ? 2.通过DNS解析得到了目标服务器的ip地址后，与服务器建立TCP连接。
// ?     - ip协议：选择传输路线，负责找到
// ?     - tcp协议：三次握手，分片，可靠传输，重新发送的机制
// ? 3.浏览器通过http协议发送请求(增加http的报文信息)头 体 行
// ? 4.服务器接收请求后，查库，读文件，拼接好返回的http响应
// ? 5.浏览器收到html，开始渲染
// ? 6.解析html为dom，解析css为css-tree，最终生成render-tree阻塞渲染
// ? 7.遍历渲染树开始布局，计算每个节点的位置大小信息
// ? 8.将渲染树每个节点绘制到屏幕
// ? 9.加载js文件，运行js脚本
// ? 10.relow(样式)和repaint(位置)

// todo cookie、sessionStorage和localStorage的区别
// ? - 相同点：都存储在客户端
// ? - 不同点：
// ?- 存储大小：
//    - cookie数据大小不能超过4k
//    - sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大的多，可以达到5M或更大，就是为了解决cookie存储空间不足而诞生的
// ?- 有限时间：
//    - localStorage存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
//    - sessionStorage数据在当前浏览器窗口关闭后自动删除
//    - cookie设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
// ?- 数据与服务器之间的交互方式
//    - cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端
//    - sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存


// todo React
// ! 什么是React？
// ? React：是一个网页UI框架，通过组件化的方式解决视图层开发复用的问题，本质是一个组件化框架
// ? 设计思路：声明式：直观与组合
// ? 		  组件化：视图的拆分与模块的复用，高内聚低耦合
// ?		  通用性：一次学习，随处编写，比如React Native，React360，主要靠虚拟Dom实现，使得适用范围变广，web、Native、VR、Shell应用
// ? 缺点：作为一个视图层框架，没有提供完整一揽子解决方案，而是交给了社区解决自己提供解决方案。
// ! 为什么用JSX？
// ? JSX：是一个JavaScript的语法扩展，结构类似XML，主要用于声明React元素，并不强制使用，更像是React.createElement的一种语法糖。
// ? 对比：React团队认为模板不应该是开发过程中的关注点，因为引入了模板语法、模板指令等概念；
// ?      其次是模板字符串，编写的结构会造成多次内部嵌套，使整个结构变得复杂，并且优化代码提示也会变得困难重重；
// ?      最后是 JXON，同样因为代码提示困难的原因而被放弃。
// ? 所以 React 最后选用了 JSX，因为 JSX 与其设计思想贴合，不需要引入过多新的概念，对编辑器的代码提示也极为友好。
// ! 生命周期？
// ? 挂载阶段：
// ? constructor：初始化state与绑定函数；不要引入业务逻辑，逐渐被类属性的写法取代
// ? getDerivedStateFromProps：在props变化时更新state；注意事项：props传入时就会调用，反模式：复制prop到state、在props变化后修改state
//  UNSAFE_componentWillMount：过去用于网络请求或绑定函数；废弃，异步渲染机制下，可能会被多次调用
// ? render：执行渲染；不要setState
// ? componentDidMount：发起网络请求或绑定事件
// ? 更新阶段：
//  UNSAFE_componentWillReceiveProps：与getDerivedStateFromProps一致；弃用，性能问题
// ? getDerivedStateFromProps：
// ? shouldComponentUpdate：通过返回true或false来确定是否需要触发新的渲染，性能优化；PurComponent的实现原理，仅在 props 与 state 进行浅比较后，确认有变更时才会触发重新渲染
//  UNSAFE_componentWillUpdate：执行更新前操作；废弃，异步渲染机制下，可能会被暂停执行
// ? render：
// ? getSnapshotBeforeUpdate：返回一个数据，作为componentDidUpdate的第三个参数传入；可在DOM更新执行某些运算，不可setState
// ? componentDidUpdate：视图更新后执行操作；谨慎使用setState，避免死循环
// ? 卸载阶段：
// ? componentWillUnmount：执行解除事件绑定，取消定时器等请理操作

// ? 错位边界
// static getDerivedStateFromError(error) {
// 更新 state 使下一次渲染能够显示降级后的 UI
// 	return { hasError: true };
// }
// componentDidCatch(error, errorInfo) {
// 你同样可以将错误日志上报给服务器
// 	logErrorToMyService(error, errorInfo);
// }

// todo 搭建react框架
// ? webpack、webpack-dev-server、babel-core、babel-loader、babel-preset-es2015、babel-preset-react、babel-preset-stage-0
// ? webpack:
// 安装：npm install --save-dev webpack@3
// 配置文件：webpack.dev.config.js 
// 执行命令：webpack --config webpack.dev.config.js
// ? 使用webpack-dev-server来配置启动WEB服务器
// 安装：npm install webpack-dev-server@2 --save-dev
// webpack.dev.config.js 中增加配置
devServer: {
	// CLI ONLY的需要在命令行中配置
	contentBase: path.join(__dirname, './dist')
	color 				//（CLI only） console中打印彩色日志
	historyApiFallback  // 任意的404响应都被替代为index.html。
	host 				// 指定一个host, 默认是localhost。如果你希望服务器外部可以访问，指定如下：host: "0.0.0.0"。比如你用手机通过IP访问。
	hot 				// 启用Webpack的模块热替换特性。关于热模块替换。1.放在cli中，刷新页面，不会保留react中的state，所以需要react-hot-loader@next
	port 				// 配置要监听的端口。默认就是我们现在使用的8080端口。
	proxy 				// 代理。比如在 localhost: 3000 上有后端服务的话，你可以这样启用代理：
	// proxy: {
	// 	"/api": "http://localhost:3000"
	// }
	progress			//（CLI only） 将编译进度输出到控制台。
}

// 执行命令：webpack-dev-server --config webpack.dev.config.js

// ? babel：
// babel-core 调用Babel的API进行转码
// babel-loader
// babel-preset-es2015 用于解析 ES6
// babel-preset-react 用于解析 JSX
// babel-preset-stage-0 用于解析 ES7 提案
// 安装：npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0
// 配置文件：.babelrc


// ES Module 的浏览器兼容性问题
// 模块文件过多导致频繁发送网络请求问题
// 资源文件模块化的问题


// todo 循环遍历
// ? for、forEach、for ...of
// 三者都是基本的由左到右遍历数组
// forEach 无法跳出循环；for 和 for ..of 可以使用 break 或者 continue 跳过或中断。
// for ...of 直接访问的是实际元素。for 遍历数组索引，forEach 回调函数参数更丰富，元素、索引、原数组都可以获取。
// for ...of 与 for 如果数组中存在空元素，同样会执行。
// ? some、every
// 二者都是用来做数组条件判断的，都是返回一个布尔值
// 二者都可以被中断
// some 若某一元素满足条件，返回 true，循环中断；所有元素不满足条件，返回 false。
// every 与 some 相反，若有益元素不满足条件，返回 false，循环中断；所有元素满足条件，返回 true。
// ? filter、map
// 二者都是生成一个新数组，都不会改变原数组（不包括遍历对象数组是，在回调函数中操作元素对象）
// 二者都会跳过空元素。有兴趣的同学可以自己打印一下
// map 会将回调函数的返回值组成一个新数组，数组长度与原数组一致。
// filter 会将符合回调函数条件的元素组成一个新数组，数组长度与原数组不同。
// map 生成的新数组元素是可自定义。
// filter 生成的新数组元素不可自定义，与对应原数组元素一致。
// find、findIndex
// ? find、findIndex
// 二者都是用来查找数组元素。
// find 方法返回数组中满足 callback 函数的第一个元素的值。如果不存在返回 undefined。
// findIndex 它返回数组中找到的元素的索引，而不是其值，如果不存在返回 -1。
// ? reduce、reduceRight
// 第一个参数是回调函数（callback） ，第二个参数是初始值（initialValue）
// 回调函数接收四个参数：
// accumulator：MDN 上解释为累计器，但我觉得不恰当，按我的理解它应该是截至当前元素，之前所有的数组元素被回调函数处理累计的结果。
// current：当前被执行的数组元素。
// currentIndex: 当前被执行的数组元素索引。
// sourceArray：原数组，也就是调用 reduce 方法的数组。
// 如果不传入初始值，reduce 方法会从索引 1 开始执行回调函数，如果传入初始值，将从索引 0 开始、并从初始值的基础上累计执行回调。

// ? 对象遍历
// ? for in
// for in 的循环顺序，参考【JavaScript 权威指南】（第七版）6.6.1。

// 先列出名字为非负整数的字符串属性，按照数值顺序从最小到最大。这条规则意味着数组和类数组对象的属性会按照顺序被枚举。
// 在列出类数组索引的所有属性之后，在列出所有剩下的字符串名字（包括看起来像整负数或浮点数的名字）的属性。这些属性按照它们添加到对象的先后顺序列出。对于在对象字面量中定义的属性，按照他们在字面量中出现的顺序列出。
// 最后，名字为符号对象的属性按照它们添加到对象的先后顺序列出。
// ? Object.keys
// ? Object.values
// ? Object.entries
// ? Object.getOwnPropertyNames

// todo eval()与new Function()
// ? eval(): 参数可以为局部变量
// ? new Function(): 参数为全局变量

// todo web应用
前端
ajax, ws, ws----> 服务器(应用)----> 缓存 / 数据库
express
接受req，处理res


// ? JavaScript
// todo 对象
Object.assign(obj1, obj2) // 会改变obj1
Object.entries({}) // 对象转迭代 ，返回[[], []]
Object.fromEntries([[], []])  // 迭代转对象 ，与上面相反操作
new Map([[], []]) // 转Map

let a = {}
// 定义属性
Object.defineProperty(a, 'a', {
	value: 1,
	enumerable: false // 是否可枚举
})
// 冻结
Object.freeze(a)
或者
Object.preventExtensions(a)
a.a = 1
console.log(a); // {}
// 判断是否冻结
Object.isFrozen(a) // true/false


// todo 运算符
// ^: 异或运算
let a = 1, b = 2
a ^ a == 0
a ^ 0 == a
// 满足交换律、结合律m 
a ^ b ^ a == b ^ a ^ a == b ^ (a ^ a) == b ^ 0 == b

// ? HTML
// todo ReadOnly和Disabled
// ReadOnly和Disabled的作用是使用户不能够改变表单域中的内容
// 区别:
// 1.ReadOnly只针对input，textarea有效，Disabled对所有表单元素有效，包括select，radio，checkbox，button等
// 2.表单元素disabled后，表单以POST或GET提交的话，这个元素的值不会被传递出去，而ReadOnly会
