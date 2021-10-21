# React

`1.用于构建用户界面的JavaScript库(只关注于视图)`

`2.由Facebook开源`

---

## 相关 js 库

1. reac.js：React 核心库
2. react-dom.js：提供操作 Dom 的 React 扩展库
3. babel.min.js：解析 JSX 语法代码转为 JS 代码的库

---

## JSX

- JavaScript XML
- React.createElement(component, props, child)的语法糖
- 用来创建虚拟 Dom
- 语法规则
  1. 定义虚拟 Dom 时，不要写引号
  2. 标签中混入 JS 表达式时要用{}
  3. 样式的类名不要用 class，要用 className
  4. 内联样式，要用 style={{key:value}}形式，样式属性 key 使用小驼峰形式
  5. 只有一个根标签
  6. 标签必须闭合
  7. 标签首字母
     - 若为小写字母开头，则将该标签转为 html 中的同名元素，若 html 中无该标签对应的同名元素，则报错
     - 若大写字母开头，react 就去渲染对应的组件，若组件没有定义，则报错
- ReactDOM.render(VDOM, document.getElementById('root'))

---

## 类组件

- 构造函数中

1. 类中的构造器 construct 不是必须写的，要对实例进行一些初始化的操作，如添加指定属性时才写
2. 如果 A 类继承了 B 类，且 A 类中写了构造器，那么 A 类构造器中的 super 是必须要调用的
3. construct 中的 this 指向`实例对象`
4. 构造器是否接受 props，是否传递给 super，取决于：是否希望构造器中通过 this 访问 props

- 类中

5. 类中所定义的方法，都是放在了类的`原型对象`上，供实例去使用，但是 React 中类组件由 React 去实例化，类中的方法几乎不会由实例调用，一般由虚拟 DOM 直接调用，this 指向就不是实例对象了，所以需要进行 bind 绑定
6. 类中用=赋值的属性在`实例对象`上,函数表达式在`原型`上，赋值 static 静态变量在`类本身`上

```
class A extends React.Component{

    state = {} //实例上

    //对标签属性进行类型、必填性的限制
    static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number,
        speak: PropTypes.func,
    } //类本身上

    //指定默认标签属性值
    static defaultProps = {
        age: 18
    }

    change = () => {} //实例上

    render(){} //原型上
}
```

7. 类中的函数自动开启严格模式，this 指向 undefined
8. render 方法中的 this 为组件实例对象，因为由组件实例调用

---

## 函数组件

- `this为undefined，因为babel编译为严格模式`
- 只能操作 props, 通过参数形式

---

## 组件的三大核心属性

1. state
2. props
3. refs

### refs

1. 字符串形式的 ref

   - `已不建议使用，将来会废弃`

   - `由于它无法知道this，所以需要React去跟踪当前渲染的组件。这使得React变得比较慢`

   - `string类型的refs写法在函数组件中会让ref被放置在父DOM中，而不是父组件实例中`

```
<input ref="input1" />
```

2. 回调形式的 ref

   - `内联式每次刷新控件会调用两次，先传null，再传dom;`

   - `class类绑定式则不会多次调用`

```
<input ref={(c) => {this.input1 = c}}/>
或
setTextInputRef = c => {
    this.textInput = c
}
<input ref={this.setTextInputRef}/>
```

3. createRef 创建 ref 容器

   - `React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点，该容器是“专人专用”的`

```
myRef = React.createRef()
<input ref={this.myRef}>
```

---

## 事件处理

1. 通过 onXxx 属性指定事件处理函数（注意大小写）
   - React 使用的是自定义（合成）事件，而不是使用的原生 DOM 事件 —— 为了更好的兼容性
   - React 中的事件是通过事件委托方式处理的（委托给组件最外层的元素） —— 为了高效
2. 通过 event.target 得到发生事件的 DOM 元素对象 —— 不要过度使用 ref

---

## 生命周期

### 定义

1. 组件从创建到死亡它会经历一些特定的阶段
2. React 组件中包含一系列勾子函数（生命周期回调函数），会在特定的时刻调用
3. 我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作

### 三个阶段（旧-16 及以下）

1. 初始化阶段：由 ReactDOM.render()触发--初次渲染

   1. constructor()
   2. componentWillMount()
   3. render()
   4. componentDidMount() =====> 常用

      `一般在这个勾子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息`

2. 更新阶段：由组件内部 this.setState()或父组件重新 render 触发

   1. componentWillReceiveProps()

      `父组件触发，第一次不触发，只在更新阶段触发，componentWillReceiveNewProps`

   2. shouldComponentUpdate(nextProps,nextState)

      `setState()触发`

   3. componentWillUpdate()

      `forceUpdate()触发`

   4. render() =====> 必须使用的一个
   5. componentDidUpdate()

3. 卸载组件：由 ReactDOM.unmountComponentAtNode()触发

   1. componentWillUnmount() =====> 常用

      `一般在这个勾子中做一些收尾的事，例如：关闭定时器、取消订阅消息`

```
<!-- 例 -->
class A extends React.Component {
   /**
   * 初始化阶段
   */
  constructor(props) {     //构造函数
    super(props);
    this.state = {};
  }
  componentWillMount() {}  //挂载前
  render() {}              //渲染
  componentDidMount() {}   //挂载后

  /**
   * 更新阶段
   */
  componentWillReceiveProps(props) {} //将接收参数
  shouldComponentUpdate(nextProps,nextState) {           //是否可以更新
    return true || false;
  }
  componentWillUpdate(){}             //更新前
  render(){}                          //渲染
  componentDidUpdate()                //更新后

  /**
   * 卸载阶段
   */
  componentWillUnmount() //卸载前
}

```

### 三个阶段（新-17 及以上）

1. 初始化阶段：由 ReactDOM.render()触发--初次渲染

   1. constructor()
   2. getDerivedStateFromProps （UNSAFE_componentWillMount() --兼容--未来废弃）
   3. render()
   4. componentDidMount() =====> 常用

      `一般在这个勾子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息`

2. 更新阶段：由组件内部 this.setState()或父组件重新 render 触发或 forceUpdate()

   1. getDerivedStateFromProps（UNSAFE_componentWillReceiveProps() --兼容--未来废弃）

   2. shouldComponentUpdate(nextProps,nextState)
   3. （UNSAFE_componentWillUpdate() --兼容--未来废弃）
   4. render()
   5. componentDidUpdate()

3. 卸载组件：由 ReactDOM.unmountComponentAtNode()触发

   1. componentWillUnmount() =====> 常用

      `一般在这个勾子中做一些收尾的事，例如：关闭定时器、取消订阅消息`

```
<!-- 例 -->
class A extends React.Component {
   /**
   * 初始化阶段
   */
  constructor(props) {                            //构造函数
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(props, state) { //获取派生状态
    return props || null
  }
  render() {}                                     //渲染
  componentDidMount() {}                          //挂载后

  /**
   * 更新阶段
   */
  static getDerivedStateFromProps()                //获取派生状态
  shouldComponentUpdate(nextProps,nextState) {                        //是否可以更新
    return true || false;
  }
  render(){}                                       //渲染
  getSnapshotBeforeUpdate(prevProps, prevState){   //获取快照
    return this.refs.list.scrollHeight
  }
  componentDidUpdate(prevProps, prevState, height) //更新后，第三个参数为返回的快照

  /**
   * 卸载阶段
   */
  componentWillUnmount(){} //卸载前
}

```

### 重要的钩子

1. render：初始化渲染或更新渲染使用
2. componentDidMount：开启监听、发送 ajax 请求
3. componentWillUnmount：做一些收尾工作，如：清理定时器

### 即将废弃的勾子

1. componentWillMount()
2. componentWillReceiveProps()
3. componentWillUpdate()

   `现在使用会出现警告，下一大版本需要加上UNSAFE_前缀才能使用，以后可能会被彻底废弃，不建议使用`

### 新增的勾子

1. getDerivedStateFromProps() //从 props 中获取派生的 state

   - `若state的值在任何时候都取决于props，那么可以使用这个勾子`
   - `静态方法，需加static`
   - `参数为props、state`
   - `返回状态对象或null，不可以返回undefined`

2. getSnapshotBeforeUpdate() //在更新前后去快照，

   - `参数：prevProps、prevState`
   - `任何返回值将作为参数传递给 componentDidUpdate()`

---

## Diff

1. 虚拟 DOM 中 key 的作用：
   - 简单的说：key 是虚拟 DOM 对象的标识，在更新显示时 key 起着极其重要的作用。
   - 详细的说：当状态中的数据发生变化时，react 会根据【新数据】生成【新的虚拟 DOM】，随后 react 进行【新虚拟 DOM】与【旧虚拟 DOM】的 diff 比较，比较规则如下：
     - key 相同：
       1. 若虚拟 DOM 中内容没变，直接使用之前的真实 DOM
       2. 若虚拟 DOM 中内容变了，则生成新的真实 DOM，随后替换掉页面中之前的真是 DOM
     - key 不同：
       根据数据创建新的真实 DOM，随后渲染到页面
2. 用 index 作为 key 可能会引发的问题
   - 若对数据进行：逆序添加、逆序删除等破坏顺序操作：会产生没有必要的真实 DOM 更新 ==> 界面效果没问题，但效率低
   - 如果结构中还包含输入类 DOM：会产生错误 DOM 更新 ==> 界面有问题
   - 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用 index 作为 key 是没有问题的

---

## react 脚手架

1. npm i -g create-react-app
2. create-react-app hello-react
3. cd hello-react
4. npm start

```
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- %PUBLIC_URL%代表public文件夹的路径 -->
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <!-- 开启理想视口，用于做移动端网页的适配 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- 用于配置浏览器页签+地址栏的颜色（仅支持安卓手机浏览器） -->
    <meta name="theme-color" content="red" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <!-- 用于指定网页添加到手机主屏幕后的图标 -->
    <link rel="app-touch-icon" href="%PUBLIC_URL%/logo192.ico" />
    <!-- 应用加壳时的配置文件 -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <!-- 若浏览器不支持js则展示标签中的内容 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

```

---

## 样式模块化

1. 样式文件名：index.module.css
2. 引入：import hello from './index.module.css'
3. className={hello.title}

---

## 插件

`ES7 React/Redux/GraphQL/`

---

## 脚手架配置代理

### 方法一

在 package.json 中追加如下配置

```
"proxy":"http://localhost:5000"
```

- 说明：
  1. 优点：配置简单，前端请求资源时可以不加任何前缀。
  2. 缺点：不能配置多个代理。
  3. 工作方式：上述方式配置代理，当请求了 3000 不存在的资源时，那么该请求会转发给 5000（优先匹配前端资源）。

### 方法二

1. 在 src 下创建配置文件：src/setupProxy.js

2. 编写 setupProxy.js 配置具体代理规则：

```
const proxy = require('http-proxy-middleware')

module.exports = function(app){
   app.use(
      proxy('/api1', {//api1是需要转发的请求（所有带/api1前缀的请求都会转发给5000）
         target: 'http://localhost:5000', //配置转发目标地址（能返回数据的服务器地址）
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
            changeOrigin为true时，服务器收到的请求头中的host为：localhost:5000
            changeOrigin为false时，服务器收到的请求头中的host为：localhost:3000
            changeOrigin默认为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1':''} //去除请求前缀，保证交给后台服务器的是正常请求地址（必须配置）
      }),
      proxy('/api2', {
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2':''}
      })
   )
}
```

- 说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。

---

## 消息订阅-发布机制

1. 工具库：PubSubJS
2. 下载：npm install pubsub-js --save
3. 使用：
   - import PubSub from 'pubsub-js'//引入
   - PubSub.subscribe('delete', function(data){})//订阅
   - PubSub.publish('delete', data)//发布消息

### 注意：

1. 先订阅，再发布（理解：有一种隔空对话的感觉）
2. 适用于任意组件间通信
3. 要在组件的 componentWillUnmount 中取消订阅

---

## Fetch

`关注分离的设计思想`

1. fetch：原生函数，不再使用 XmlHttpRequest 对象提交 ajax 请求
2. 老版本浏览器可能不支持

```
fetch(url).then(function(response){
   return response.json()
}).then(function(data){
   console.log(data)
}).catch(function(err){
   console.log('err',err)
})
<!-- 或 -->
try {
   const response = await fetch(`/api/search/use2?q=${keyWord}`)
   const data = await response.json()
   console.log(data)
} catch (error) {
   console.log('请求出错', error)
}
```

---

## 打包项目

`本地启动一个服务器，运行打包后的项目`

```
npm run build
npm i serve -g
serve build
```

---

# React 扩展

## setState

### setState 更新状态的 2 种方法

1. setState(stateChange,[callback]) ---- 对象式的 setState
   - stateChange 为状态改变对象（该对象可以体现出状态的更改）
   - callback 是可选的回调函数，它在状态更新完毕，界面也更新后（render 调用后）才被调用
2. setState(updater,[callback]) ---- 函数式的 setState
   - updater 为返回 stateChange 对象的函数
   - updater 可以接收到 state 和 props
   - callback 是可选的回调函数，它在状态更新完毕，界面也更新后（render 调用后）才被调用
   ```
   this.setState(state=>({count:state.count+1}))
   ```
3. 总结：
   - 对象式的 setState 是函数式的 setState 的简写方式（语法糖）
   - 使用原则：
     - 如果新状态不依赖于原来的状态 ===> 使用对象方式
     - 如果新状态依赖于原来的状态 ===> 使用函数方式
     - 如果需要在 setState()执行后获取最新的状态数据，要在第二个 callback 函数中使用

---

## lazyLoad

### 路由组件的 lazyLoad

```js
//1.通过React的lazy函数配合import函数动态加载路由组件 ===> 路由组件代码会被分开打包
const Login = lazy(()=>import('@/pages/Login'))
//2.通过<Suspence>指定在加载得到路由打包文件前显示一个loading界面
<Suspence fallback={<h1>loading...</h1>}>
   <Switch>
      <Route path="/xxx" component={Xxxx}/>
      <Redirect to="/login"/>
   </Switch>
</Suspence>
```

---

## Hooks

1. React Hook/Hooks 是什么?
   - Hook 是 React 16.8.0 版本增加的新特性/新语法
   - 可以让你在函数组件中使用 state 以及其他的 React 特性
2. 三个常用的 Hook
   - State Hook: React.useState()
   - Effect Hook: React.useEffect()
   - Ref Hook: React.useRef()
3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

4. Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明:
        useEffect(() => {
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行

(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount()
```

5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.XXX()一样
```

---

## Fragment

### 使用

    //只能key和children两个属性
    <Fragment key='1' children={}><Fragment>
    <></>

### 作用

> 可以不用必须有一个真实的 DOM 根标签了

---

## Context

### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

### 使用

```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()

2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>

3) 后代组件读取数据：

	//第一种方式:仅适用于类组件
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据

	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

### 注意

    在应用开发中一般不用context, 一般都它的封装react插件

---

## 组件优化

### Component 的 2 个问题

> 1. 只要执行 setState(),即使不改变状态数据, 组件也会重新 render()
>
> 2. 只当前组件重新 render(), 就会自动重新 render 子组件 ==> 效率低

### 效率高的做法

> 只有当组件的 state 或 props 数据发生改变时才重新 render()

### 原因

> Component 中的 shouldComponentUpdate()总是返回 true

### 解决

    办法1:
    	重写shouldComponentUpdate()方法
    	比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
    办法2:
    	使用PureComponent
    	PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
    	注意:
    		只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false
    		不要直接修改state数据, 而是要产生新数据
    项目中一般使用PureComponent来优化
```
shouldComponentUpdate(nextProps,nextState){
   console.log(this.props,this.state); //目前的props和state
   console.log(nextProps,nextState); //接下要变化的目标props，目标state
   return !this.props.carName === nextProps.carName
}
```
