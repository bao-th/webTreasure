# react-redux
## 理解
1. 一个react插件库
2. 专门用来简化react应用中使用redux
## react-redux将所有组件分为两大类
1. UI组件
- 只负责UI的呈现，不带有任何业务逻辑
- 通过props接收数据（一般数据和函数）
- 不使用任何Redux的API
- 一般保存在components文件夹下
2. 容器组件
- 负责管理数据和业务逻辑，不负责UI的呈现
- 使用Redux的API
- 一般保存在container文件夹下
## 相关API
1. Provider：让所有组件都可以得到state数据
```
<Provider store={store}>
    <App/>
</Provider>
```
2. connect：用于包装UI组件生成容器组件
```
import {connect} from 'react--redux'
connect(
    mapStatetoProps,
    mapDispatchToProps
)(Counter)
```
3. mapStatetoProps：将外部的数据（即state对象）转换为UI组件的标签属性
```
const mapStatetoProps = function(state){
    return {
        value: state
    }
}
```
4. mapDispatchToProps：将分发action的函数转换为UI组件的标签属性
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