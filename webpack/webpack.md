# webpack

import (静态模块)形成依赖 ，chunk 代码块 ---> 编译为浏览器认识的(打包) ---> 输出 bundle

## 1.1 webpack 是什么

webpack 是一种前端资源构建工具，一个静态模块打包器(module bundler)。
在 webpack 看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理。
它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)。

## 1.2 webpack 五个核心概念

### 1.2.1 Entry

入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

### 1.2.2 Output

输出(Output)指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

### 1.2.3 Loader

Loader 让 webpack 能 够 去 处 理 那 些 非 JavaScript 文 件 (webpack 自 身 只 理 解
JavaScript)

### 1.2.4 Plugins

插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，
一直到重新定义环境中的变量等。

### 1.2.5 Mode

模式(Mode)指示 webpack 使用相应模式的配置

1. development

   - 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
   - 能让代码本地调试运行的环境

2. production

   - 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。
   - 能让代码优化上线运行的环境
   - 在开发配置功能上多一个功能，压缩代码。

## 2.1 初始化配置

1. 初始化 package.json

   - 输入指令:

     npm ini

2. 下载并安装 webpack

   - 输入指令:

     npm install webpack webpack-cli -g

     npm install webpack webpack-cli -D

3. 结论

   - webpack 能够编译打包 js 和 json 文件。
   - 能将 es6 的模块化语法转换成浏览器能识别的语法。
   - 能压缩代码。

4. 问题

   - 不能编译打包 css、img 等文件。
   - 不能将 js 的 es6 基本语法转化为 es5 以下语法

---

# webpack 性能优化

- 开发环境性能优化
- 生产环境性能优化

## 开发环境性能优化

- 优化打包构建速度

  - HMR

    ```js
    /*
    HMR: hot module replacement 热模块替换 / 模块热替换
       作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
          极大提升构建速度
    
          样式文件：可以使用HMR功能：因为style-loader内部实现了~
          js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
          注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。
          html文件: 默认不能使用HMR功能.同时会导致问题：html文件不能热更新了~ （不用做HMR功能）
          解决：修改entry入口，将html文件引入
    */
    if (module.hot) {
      // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
      module.hot.accept("./print.js", function () {
        // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
        // 会执行后面的回调函数
        print();
      });
    }
    ```

- 优化代码调试

  - source-map

  ```js
  //source-map开发环境
  devtool: "eval-source-map || eval-cheap-module-souce-map",
  //source-map生产环境
  devtool: "source-map || cheap-module-souce-map"
  ```

## 生产环境性能优化

- 优化打包构建速度

  - oneOf
  - babel 缓存

    ```js
    /*
    缓存：
      babel 缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
    */
    ```

  - 多进程打包

    ```js
    /*
    开启多进程打包。
    进程启动大概为 600ms，进程通信也有开销。
    只有工作消耗时间比较长，才需要多进程打包
     {
         loader: 'thread-loader',
         options: {
            workers: 2 // 进程 2 个
         }
     }
    */
    ```

  - externals

    ```js
    /*
    让某些库不打包，通过cdn引入
    注：需现在index.html中引入cdn
    externals: {
      // 拒绝jQuery被打包进来
      jquery: "jQuery",
    },
    */
    ```

  - dll

  ```js
  /*
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
   当你运行 webpack 时，默认查找 webpack.config.js 配置文件
   需求：需要运行 webpack.dll.js 文件
     --> webpack --config webpack.dll.js
  */
  ```

- 优化代码运行的性能

  - 缓存(hash-chunkhash-contenthash)

    ```js
    /*
    文件资源缓存
    hash: 每次wepack构建时会生成一个唯一的hash值。
       问题: 因为js和css同时使用一个hash值。
       如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
    chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
       问题: js和css的hash值还是一样的
       因为css是在js中被引入的，所以同属于一个chunk
    contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样
    --> 让代码上线运行缓存更好使用
    */
    ```

  - tree shaking

    ```js
    /*
    tree shaking：去除无用代码
       前提：1. 必须使用ES6模块化  2. 开启production环境
       作用: 减少代码体积
    
       在package.json中配置
          "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
          问题：可能会把css / @babel/polyfill （副作用）文件干掉
          "sideEffects": ["*.css", "*.less"]
    */
    ```

  - code split

    ```js
    /*
    code split
       1. 可以将node_modules中代码单独打包一个chunk最终输出
       2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
      optimization: {
         splitChunks: {
            chunks: "all",
         },
      },
    */
    ```

- 懒加载/预加载

  ```js
  /*
   懒加载~：当文件需要使用时才加载~
   预加载 prefetch：会在使用之前，提前加载js文件
   正常加载可以认为是并行加载（同一时间加载多个文件）
   预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
   */
  //import(/* webpackChunkName: 'test', webpackPrefetch: true */ "./test").then(
  //   ({ mul }) => {
  //         console.log(mul(4, 5));
  //         }
  //);
  ```

- pwa
