## 路由

`npm install --save react-router-dom`

### 一. 什么是路由？

1. 一个路由就是一个映射关系(key:value)
2. key 为路径，value 可能是 function 或 component

### 二. 路由分类

1. 后端路由：
   - 理解：value 是 function，用来处理客户端提交的请求
   - 注册路由：router.get(path,function(req,res))
   - 工作过程：当 node 接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据
2. 前端路由：
   - 浏览器端路由，value 是 component，用于展示页面内容。
   - 注册路由：`<Route path="/test" component={Test}>`
   - 工作过程：当浏览器的 path 变为/test 时，当前路由组件就会变为 Test 组件

### 三. 基本使用

1. 明确好界面中的导航区、展示区
2. 导航区的 a 标签改为 Link 标签`<Link to="/xxx">Demo</Link>`
3. 展示区写 Route 标签进行路径的匹配`<Route path="/xxx" component={Demo} />`
4. `<App>`的最外侧包裹了一个`<BrowserRouter>或<HashRouter>`

```
<script type="text/javascript">
   let history = History.createBrowserHistory()//方法一，直接使用H5推出的history身上的API
   //let history = History.createHashHistory()// 方法二。hash值（锚点）
   function push(path) {
      history.push(path)
      return false
   }
   function replace(path) {
      history.replace(path)
   }
   function back() {
      history.goBack()
   }
   function forward() {
      history.goForward()
   }
</script>
```

### 四. 路由组件与一般组件

1. 写法不同：
   - 一般组件：`<Demo/>`
   - 路由组件：`<Route path="/demo" component={Demo}/>`
2. 存放位置不同：
   - 一般组件：components 文件夹
   - 路由组件：pages 文件夹
3. 接收到的 props 不同：
   - 一般组件：组件标签中传递了什么，就能接收到什么
   - 路由组件：接收到三个固定的属性
   ```
      history:
         go: f go(n)
         goBack: f goBack()
         goForward: f goForward()
         push: f push(path,state)
         replace: f replace(path,state)
      location：
         pathname: "/about"
         search: ""
         state: undefined
      match:
         params: {}
         path: "/about"
         url: "/about"
   ```

### 五. NavLink 与封装 NavLink

1. NavLink 可以实现路由链接得高亮，通过 activeClassName 指定样式名
2. 标签体内容是一个特殊的标签属性(children)
3. 通过 this.props.children 可以获取标签体内容

### 六. Switch 的使用

1. 通常情况下，path 和 component 是一一对应的关系
2. Switch 可以提高路由匹配效率(单一匹配)

### 七. 解决多级路径刷新页面样式丢失的问题

1. public/index.html 中引入样式时不写 ./ 写 / (常用)
2. public/index.html 中引入样式时不写 ./ 写 %PUBLIC_URL% (常用)
3. 使用 HashRouter

### 八. 路由的严格匹配与模糊匹配

1.  默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
2.  开启严格匹配，`<Route exact={true} path="/about" component={About} />`
3.  严格匹配不要随便开启，需要时再开，有些时候开启会导致无法继续匹配二级路由

### 九. Redirect 的使用

1.  一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到 Redirect 指定的路由
2.  具体编码：
    ```
    <Switch>
       <Route path="/about" component={About} />
       <Route path="/home" component={Home} />
       <Redirect to="about" />
    </Switch>
    ```

### 十. 嵌套路由

1.  注册子路由时要写上父路由的 path 值
2.  路由的匹配是按照注册路由的顺序进行的

### 十一. 向路由组件传递参数

1.  params 参数
    - 路由链接(携带参数)：`<Link to='/demo/test/tom/18'>详情</Link>`
    - 注册路由(声明接收)：`<Route path="/demo/test/:name/:age" component={Test}/>`
    - 接收参数：this.props.match.params
2.  search 参数
    - 路由链接(携带参数)：`<Link to='/demo/test?name=tom&age=18'>详情</Link>`
    - 注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`
    - 接收参数：this.props.location.search
    - 备注：获取到的 search 是 urlencoded 编码字符串，需要借助 querystring 解析`qs.parse(search.slice(1))`
3.  state 参数
    - 路由链接(携带参数)：`<Link to={{pathname:'/demo/test',state:{name:tom,age:18}}}>详情</Link>`
    - 注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`
    - 接收参数：this.props.location.state
    - 备注：刷新也能保留住参数

### 十二. 编程式路由导航

- 借助 this.props.history 对象上的 API 对操作路由跳转、前进、后退
  - this.props.history.push()
  - this.props.history.replace()
  - this.props.history.goBack()
  - this.props.history.goForward()
  - this.props.history.go()

### 十三. withRouter

- 可以加工一般组件，让一般组件具备路由组件所特有的 API
- 返回值是一个新组件

```
<!-- 例 -->
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

export default withRouter(Header)
```

### 十四. BrowserRouter 与 HashRouter 的区别

1.  底层原理一样：
    - BrowserRouter 使用的是 H5 的 history API，不兼容 IE9 及以下版本。
    - HashRouter 使用的是 URL 的哈希值。
2.  url 表现形式不一样：
    - BrowserRouter 的路径中没有#，例如：localhost:3000/demo/test
    - HashRouter 的路径包含#，例如：localhost:3000/#/demo/test
3.  刷新后对路由 state 参数的影响
    - BrowserRouter 没有任何影响，因为 state 保存在 history 对象中。
    - `HashRouter刷新后会导致路由state参数的丢失。`
4.  备注：HashRouter 可以用于解决一些路径错误相关的问题。

---

## 代码展示

```
<BrowserRouter>
   <!-- 路由链接 -->
   <div>
      <Link to="/xxx">Demo</Link>
      <NavLink activeClassName="active(默认)" to="/about">About</NavLink>

      <!-- 传递params参数 -->
      <Link to=`/home/message/detail/1/title1`>title1</Link>
      <!-- 传递search参数 -->
      <Link to=`/home/message/detail/?id=1&title=title1`>title1</Link>
      <!-- 传递state参数 -->
      <Link to={{pathname:'home/message/detail',state:{id:'1',title:'title1'}}}>title1</Link>
   </div>

   <!-- 注册路由 -->
   <div>
      <Switch>
         <Route extract path="/xxx" component={Demo} />
         <Route path="/about" component={About} />

         <!-- 声明接收params参数 -->
         <Route path="/home/message/detail/:id/:title" component={Detail} />
         <!-- search参数无需声明接收，正常注册路由即可 -->
         <Route path="/home/message/detail" component={Detail} />
         <!-- state参数无需声明接收，正常注册路由即可 -->
         <Route path="/home/message/detail" component={Detail} />

        <!-- 重定向 -->
         <Redirect to="about" />
      </Switch>
   </div>
</BrowserRouter>

<!-- 编程式路由 -->
<script>
   <!-- 替换 -->
   this.props.history.replace('/home/message/detail/1/title1')
   this.props.history.replace('/home/message/detail/?id=1&title=title1')
   this.props.history.replace('home/message/detail',{id:'1',title:'title1'})

   <!-- 压栈 -->
   this.props.history.push('/home/message/detail/1/title1')
   this.props.history.push('/home/message/detail/?id=1&title=title1')
   this.props.history.push('home/message/detail',{id:'1',title:'title1'})

   this.props.history.goBack()
   <!-- 等同 -->
   this.props.history.go(-1)

   this.props.history.goForward()
   <!-- 等同 -->
   this.props.history.go(1)
</script>

<!-- 路由组件 -->
import qs from 'querystring'

class Detail extends React.Component {
   render(){
      <!-- 接收params参数 -->
      const {id,title} = this.props.match.params

      <!-- 接收是search参数 -->
      const {search} = this.props.location
      const {di,title} = qs.parse(search.slice(1))

      <!-- 接收state参数 -->
      const {id,title} = this.props.location.state || {}
   }
}
```
