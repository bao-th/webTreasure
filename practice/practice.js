class A extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * 初始化阶段
   */
  // 挂载前
  componentWillMount() {}
  // 渲染
  render() {
    return (
      <div>
        <button></button>
      </div>
    );
  }
  // 挂载后
  componentDidMount() {}

  // 将接收参数
  componentWillReceiveProps(props) {} //父组件render触发
  // 是否可以更新
  shouldComponentUpdate() { // setState()触发
    return true || false;
  }
  //更新前
  componentWillUpdate(){} // forceUpdate()触发
  // 渲染
  render(){}
  // 更新后
  componentDidUpdate()

  // 卸载前
  componentWillUnmount()
}
