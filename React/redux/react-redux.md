# react-redux

## 理解

1. 一个 react 插件库
2. 专门用来简化 react 应用中使用 redux

---

## react-redux 将所有组件分为两大类

1. UI 组件

- 只负责 UI 的呈现，不带有任何业务逻辑
- 通过 props 接收数据（一般数据和函数）
- 不使用任何 Redux 的 API
- 一般保存在 components 文件夹下

2. 容器组件

- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 使用 Redux 的 API
- 一般保存在 container 文件夹下

---

## 相关 API

1. Provider：让所有组件都可以得到 state 数据

```
<Provider store={store}>
    <App/>
</Provider>
```

2. connect：用于包装 UI 组件生成容器组件

```
import {connect} from 'react--redux'
connect(
    mapStatetoProps,
    mapDispatchToProps
)(Counter)
```

3. mapStatetoProps：将外部的数据（即 state 对象）转换为 UI 组件的标签属性

```
const mapStatetoProps = function(state){
    return {
        value: state
    }
}
```

4. mapDispatchToProps：将分发 action 的函数转换为 UI 组件的标签属性

```
const mapDispatchToProps = function(){
    return (dispatch)=>{
        return {
            jia: dispatch(action)
        }
    }
}
<!-- 或 -->
const mapDispatchToProps = {
    jia: dispatch(action)
}
```
