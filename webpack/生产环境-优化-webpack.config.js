const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

/*
  oneOf
*/

/*
  缓存：
    babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
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

/*
  tree shaking：去除无用代码
    前提：1. 必须使用ES6模块化  2. 开启production环境
    作用: 减少代码体积

    在package.json中配置 
      "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
        问题：可能会把css / @babel/polyfill （副作用）文件干掉
      "sideEffects": ["*.css", "*.less"]
*/

/*
  code split
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
*/
// optimization: {
//     splitChunks: {
//       chunks: "all",
//     },
//   },

/*
  懒加载~：当文件需要使用时才加载~
  预加载 prefetch：会在使用之前，提前加载js文件
  正常加载可以认为是并行加载（同一时间加载多个文件）
  预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
*/
// import(/* webpackChunkName: 'test', webpackPrefetch: true */ "./test").then(
// ({ mul }) => {
//     console.log(mul(4, 5));
//     }
// );

/*
  PWA: 渐进式网络开发应用程序(离线可访问)
    workbox --> workbox-webpack-plugin
*/
// new WorkboxWebpackPlugin.GenerateSW({
//   /*
//       1. 帮助serviceworker快速启动
//       2. 删除旧的 serviceworker

//       生成一个 serviceworker 配置文件~
//     */
//   clientsClaim: true,
//   skipWaiting: true,
// });
/*
  1. eslint不认识 window、navigator全局变量
    解决：需要修改package.json中eslintConfig配置
      "env": {
        "browser": true // 支持浏览器端全局变量
      }
   2. sw代码必须运行在服务器上
      --> nodejs
      -->
        npm i serve -g
        serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
*/
// 注册serviceWorker
// 处理兼容性问题
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/service-worker.js")
//       .then(() => {
//         console.log("sw注册成功了~");
//       })
//       .catch(() => {
//         console.log("sw注册失败了~");
//       });
//   });
// }

/* 
  开启多进程打包。 
  进程启动大概为600ms，进程通信也有开销。
  只有工作消耗时间比较长，才需要多进程打包
*/
// {
//     loader: 'thread-loader',
//     options: {
//         workers: 2 // 进程2个
//     }
// },

/*
  externals：让某些库不打包，通过cdn引入
    注：需现在index.html中引入cdn
    externals: {
        // 拒绝jQuery被打包进来
        jquery: "jQuery",
    },
*/


// 设置nodejs环境变量
process.env.NODE_ENV = "production";

// 复用loader
const commonCssLoader = [
  // 创建style标签，将样式放入
  // 'style-loader',
  // 这个loader取代style-loader。作用：提取js中的css成单独文件
  MiniCssExtractPlugin.loader,
  "css-loader",
  /*
    css兼容性处理：postcss --> postcss-loader postcss-preset-env

    帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式

    "browserslist": {
        // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
        "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
        ],
        // 生产环境：默认是看生产环境
        "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
        ]
    }
 */
  // 使用loader的默认配置
  // 'postcss-loader',
  // 修改loader的配置
  {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => [require("postcss-preset-env")()],
    },
  },
];

module.exports = {
  // 单入口
  entry: "./src/js/index.js",
  // entry: {
  // // 多入口：有一个入口，最终输出就有一个bundle
  // index: "./src/js/index.js",
  // test: "./src/js/test.js",
  // },
  output: {
    // filename: "js/built.[contenthash:10].js",
    // [name]：取文件名
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        // 在package.json中eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node-modules/,
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
      {
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, "less-loader"],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              /* 
                开启多进程打包。 
                进程启动大概为600ms，进程通信也有开销。
                只有工作消耗时间比较长，才需要多进程打包
              */
              {
                loader: "thread-loader",
                options: {
                  workers: 2, // 进程2个
                },
              },
              {
                loader: "babel-loader",
                options: {
                  // 预设：指示babel做怎么样的兼容性处理
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        useBuiltIns: "usage", // 按需加载
                        corejs: { version: 3 }, // 指定core-js版本
                        targets: {
                          // 指定兼容性做到哪个版本浏览器
                          chrome: "60",
                          firefox: "50",
                          ie: "9",
                          safari: "10",
                          edge: "17",
                        },
                      },
                    ],
                  ],
                  // 开启babel缓存
                  // 第二次构建时，会读取之前的缓存
                  cacheDirectory: true,
                },
              },
            ],
          },
          {
            test: /\.(jpg|png|gif)/,
            loader: "url-loader",
            options: {
              limit: 8 * 1024,
              name: "[hash:10].[ext]",
              outputPath: "imgs",
              esModule: false,
            },
          },
          {
            test: /\.html$/,
            loader: "html-loader",
          },
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)/,
            loader: "file-loader",
            options: {
              outputPath: "media",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    //打包css成单独文件
    new MiniCssExtractPlugin({
      filename: "css/built.[contenthash:10].css",
    }),
    //压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // 压缩html代码
      minify: {
        collapseWhitespace: false, // 移除空格
        removeComments: false, // 移除注释
      },
    }),
    // dll
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, "dll/manifest.json"),
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, "dll/jquery.js"),
    }),
    // pwa
    new WorkboxWebpackPlugin.GenerateSW({
      /*
          1. 帮助serviceworker快速启动
          2. 删除旧的 serviceworker
  
          生成一个 serviceworker 配置文件~
        */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  /*
    code split
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  /*
   通过js代码，让某个文件被单独打包成一个chunk
   import动态导入语法：能将某个文件单独打包
  */
  // import(/* webpackChunkName: 'test' */'./test')
  // .then(({ mul, count }) => {
  //   // 文件加载成功~
  //   // eslint-disable-next-line
  //   console.log(mul(2, 5));
  // })
  // .catch(() => {
  //   // eslint-disable-next-line
  //   console.log('文件加载失败~');
  // });

  // 生产环境下会自动压缩js代码
  mode: "production",
  // externals
  externals: {
    // 拒绝jQuery被打包进来
    jquery: "jQuery",
  },
};
