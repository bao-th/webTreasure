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

- JacaScript XML
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

   2. shouldComponentUpdate()

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
  shouldComponentUpdate() {           //是否可以更新
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

   2. shouldComponentUpdate()
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
  shouldComponentUpdate() {                        //是否可以更新
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

## 新增的勾子

1. getDerivedStateFromProps() //从 props 中获取派生的 state

   - `若state的值在任何时候都取决于props，那么可以使用这个勾子`
   - `静态方法，需加static`
   - `参数为props、state`
   - `返回状态对象或null，不可以返回undefined`

2. getSnapshotBeforeUpdate() //在更新前后去快照，

   - `参数：prevProps、prevState`
   - `任何返回值将作为参数传递给 componentDidUpdate()`
