# vue 脚手架

## 脚手架文件结构

    ├── node_modules
    ├── public
    │   ├── favicon.ico: 页签图标
    │   └── index.html: 主页面
    ├── src
    │   ├── assets: 存放静态资源
    │   │   └── logo.png
    │   │── component: 存放组件
    │   │   └── HelloWorld.vue
    │   │── App.vue: 汇总所有组件
    │   │── main.js: 入口文件
    ├── .gitignore: git版本管制忽略的配置
    ├── babel.config.js: babel的配置文件
    ├── package.json: 应用包配置文件
    ├── README.md: 应用描述文件
    ├── package-lock.json：包版本控制文件

## 关于不同版本的 Vue

1. vue.js 与 vue.runtime.xxx.js 的区别：
   1. vue.js 是完整版的 Vue，包含：核心功能 + 模板解析器。
   2. vue.runtime.xxx.js 是运行版的 Vue，只包含：核心功能；没有模板解析器。
2. 因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 这个配置项，需要使用 render 函数接收到的 createElement 函数去指定具体内容。

```js
new Vue({
  //render函数完成了这个功能：将App组件放入容器中
  render: (h) => h(App),
  // render:q=> q('h1','你好啊')
}).$mount("#app");
// 或
// new Vue({
//   el: "#app",
//   template: `<h1>你好啊</h1>`,
//   components: { App },
// });
```

## vue.config.js 配置文件

1. 使用 vue inspect > output.js 可以查看到 Vue 脚手架的默认配置。
2. 使用 vue.config.js 可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh
