# React
`1.用于构建用户界面的JavaScript库(只关注于视图)`

`2.由Facebook开源`

---
## 相关js库
1. reac.js：React核心库
2. react-dom.js：提供操作Dom的React扩展库
3. babel.min.js：解析JSX语法代码转为JS代码的库
---
## JSX
* JacaScript XML
* React.createElement(component, props, child)的语法糖
* 用来创建虚拟Dom
* 语法规则
  1. 定义虚拟Dom时，不要写引号
  2. 标签中混入JS表达式时要用{}
  3. 样式的类名不要用class，要用className
  4. 内联样式，要用style={{key:value}}形式，样式属性key使用小驼峰形式
  5. 只有一个根标签
  6. 标签必须闭合
  7. 标签首字母
        * 若为小写字母开头，则将该标签转为html中的同名元素，若html中无该标签对应的同名元素，则报错
        * 若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错
* ReactDOM.render(VDOM, document.getElementById('root'))
---
## 类组件
* 构造函数中
1. 类中的构造器construct不是必须写的，要对实例进行一些初始化的操作，如添加指定属性时才写
2. 如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须要调用的
3. construct中的this指向`实例对象`
4. 构造器是否接受props，是否传递给super，取决于：是否希望构造器中通过this访问props
* 类中
5. 类中所定义的方法，都是放在了类的`原型对象`上，供实例去使用，但是React中类组件由React去实例化，类中的方法几乎不会由实例调用，一般由虚拟DOM直接调用，this指向就不是实例对象了，所以需要进行bind绑定
6. 类中用=赋值的属性在`实例对象`上,函数表达式在`原型`上，赋值static静态变量在`类本身`上
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
7. 类中的函数自动开启严格模式，this指向undefined
8. render方法中的this为组件实例对象，因为由组件实例调用
---
## 函数组件
* `this为undefined，因为babel编译为严格模式`
* 只能操作props, 通过参数形式
---
## 组件的三大核心属性
1. state
2. props
3. refs
