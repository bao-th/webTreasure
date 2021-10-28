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
