# redux
## redux是什么
1. redux是一个专门用于做状态管理的JS库（不是react插件库）
2. 它可以用在react，angular，vue等项目中，但基本与react配合使用
3. 作用：集中式管理react应用中多个组件共享的状态
## 什么情况下使用redux
1. 某个组件的状态，需要让其他组件可以随时拿到（共享）
2. 一个组件需要改变另一个组件的状态（通信）
3. 总体原则：能不用就不用，如果不用比较吃力才考虑使用
## 工作流程
React component -> Action Creator -> Dispatch(action={type:'',data:''}) -> Store(previousState,action) -> Reducer(return newState)
## 三个核心概念
### action
1. 动作对象
2. 包含2个属性：
    - type：标识属性，值为字符串，唯一，必要属性
    - data：数据属性，值类型任意，可选属性
3. 例子：{ type:'ADD_STUDENT',data:{name:'tom',age:18} }
### reducer
1. 用于初始化状态、加工状态
2. 加工时，根据旧的state和action，产生新的state的`纯函数`。
### store
1. 将state、action、reducer联系在一起的对象
2. 如何得到此对象？
    - import {createStore} from 'redux'
    - import reducer from './reducers'
    - const store = createStore(reducer)
3. 此对象的功能
    - getState()：得到state
    - dispatch(action)：分发action，触发reducer调用，产生新的state
    - subscribe(listener)：注册监听，当产生了新的state时，自动调用
### applyMiddleware()
`作用：应用上基于redux的中间件(插件库)`
### combineReducers()
`作用：合并多个reducer函数`
### redux异步编程
#### 理解
1. redux默认是不能进行异步处理的
2. 某些时候应用中需要在redux中执行异步任务(ajax,定时器)
#### 使用异步中间件
`npm install --save redux-thunk`

## 使用redux调试工具
1. 安装chrome浏览器插件-Redux DevTools
2. npm install --save-dev redux-devtools-extension