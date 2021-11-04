class A extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * 初始化阶段
   */
  // 挂载前
  componentWillMount() { }
  // 渲染
  render() {
    return (
      <div>
        <button></button>
      </div>
    );
  }
  // 挂载后
  componentDidMount() { }

  // 将接收参数
  componentWillReceiveProps(props) { } //父组件render触发
  // 是否可以更新
  shouldComponentUpdate() { // setState()触发
    return true || false;
  }
  //更新前
  componentWillUpdate() { } // forceUpdate()触发
  // 渲染
  render() { }
  // 更新后
  componentDidUpdate()

  // 卸载前
  componentWillUnmount()
}


function fun(a, b) {
  console.log(Array.prototype.slice.apply(arguments));
}
fun(1, 2);

[1, 2, 3].reduce((total, item, index, arr) => {
  console.log(total);
  return total *= item;
}, 10)


// 节流
function throttle(fn, delay) {
  let lastTime = 0
  return function () {
    let now = Date.now()
    if (now - lastTime > delay) {
      fn.call(this)
      lastTime = now
    }
  }
}
// 防抖
function debounce(fn, delay) {
  let timer;
  clearTimeout(timer);
  return function () {
    timer = setTimeout(() => {
      fn.call(this)
    }, delay);
  }
}


let obj1 = { a: 1 }
let obj2 = { b: 1 }
let obj3 = Object.assign(obj1, obj2)
console.log(obj1);
console.log(obj2);
console.log(obj3);



console.log([2, 32, 423, 0, 1].sort((a, b) => {
  return b - a;
}));