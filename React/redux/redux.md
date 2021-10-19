# redux

## redux 是什么

1. redux 是一个专门用于做状态管理的 JS 库（不是 react 插件库）
2. 它可以用在 react，angular，vue 等项目中，但基本与 react 配合使用
3. 作用：集中式管理 react 应用中多个组件共享的状态

---

## 什么情况下使用 redux

1. 某个组件的状态，需要让其他组件可以随时拿到（共享）
2. 一个组件需要改变另一个组件的状态（通信）
3. 总体原则：能不用就不用，如果不用比较吃力才考虑使用

---

## 工作流程

React component -> Action Creator -> Dispatch(action={type:'',data:''}) -> Store(previousState,action) -> Reducer(return newState)

---

## 三个核心概念

### action

`本质是一个对象`

1. 动作对象
2. 包含 2 个属性：
   - type：标识属性，值为字符串，唯一，必要属性
   - data：数据属性，值类型任意，可选属性
3. 例子：{ type:'ADD_STUDENT',data:{name:'tom',age:18} }

### reducer

`本质是一个函数`

1. 用于初始化状态、加工状态
2. 加工时，根据旧的 state 和 action，产生新的 state 的`纯函数`。

### store

1. 将 state、action、reducer 联系在一起的对象
2. 如何得到此对象？
   - import {createStore} from 'redux'
   - import reducer from './reducers'
   - const store = createStore(reducer)
3. 此对象的功能
   - getState()：得到 state
   - dispatch(action)：分发 action，触发 reducer 调用，产生新的 state
   - subscribe(listener)：注册监听，当产生了新的 state 时，自动调用

---

## applyMiddleware()

`作用：应用上基于redux的中间件(插件库)`

---

## combineReducers()

`作用：合并多个reducer函数`

---

## redux 异步编程

### 理解

1. redux 默认是不能进行异步处理的
2. 某些时候应用中需要在 redux 中执行异步任务(ajax,定时器)

### 使用异步中间件

`npm install --save redux-thunk`

1. 具体编码：
   1).yarn add redux-thunk，并配置在 store 中
   2).创建 action 的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
   3).异步任务有结果后，分发一个同步的 action 去真正操作数据。
   ```
   export const createIncrementAsyncAction = (data, time) => {
    return (dispatch) => { //store调用时会自动传入dispatch
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        }, time);
    }
   }
   ```

---

## 使用 redux 调试工具

1. 安装 chrome 浏览器插件-Redux DevTools
2. npm install --save-dev redux-devtools-extension

```
import {composWithDevtools} from 'redux-devtools-extension'
createStore(allReducer,composWithDevtools(applyMiddleware(thunk)))
```

---
