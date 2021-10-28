/*
  webpack.config.js  webpack的配置文件
    作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）
    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。
  
  开发环境配置：能让代码运行
    运行项目指令：
      webpack 会将打包结果输出出去
      npx webpack-dev-server 只会在内存中编译打包，没有输出
*/

// resolve用来拼接绝对路径的方法
const { resolve } = require("path"); //node内置核心模块，用来处理路径问题
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 入口起点
  entry: "./src/js/index.js",
  // 输出
  output: {
    filename: "js/built.js", // 输出文件名
    // 输出路径
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, "build"),
  },
  // loader的配置
  module: {
    rules: [
      //处理样式资源
      {
        // 匹配哪些文件
        test: /\.less$/,
        // 使用哪些loader进行处理
        use: [
          "style-loader",
          "css-loader",
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          "less-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          "style-loader",
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          "css-loader",
        ],
      },
      //处理图片资源
      //问题：默认处理不了html中img图片
      {
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader
        // 下载 url-loader file-loader
        loader: "url-loader",
        options: {
          // 图片大小小于8kb，就会被base64处理
          // 优点: 减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 给图片进行重命名
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原来扩展名
          name: "[hash:10].[ext]",
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          outputPath: "imgs", //分类目录
        },
      },
      //处理html中图片资源
      {
        test: /\.html/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: "html-loader",
      },
      //处理其他资源
      {
        exclude: /\.(html|js|css|less|jpg|png|gif)/, // 排除
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media", //分类目录
        },
      },
    ],
  },
  // plugins的配置
  plugins: [
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: "./src/index.html",
    }),
  ],
  //模式
  mode: "development", // 开发模式
  // mode: 'production'

  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, "build"),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
};
