const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

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
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, "less-loader"],
      },
      /*
        语法检查： eslint-loader  eslint
          注意：只检查自己写的源代码，第三方的库是不用检查的
          设置检查规则：
            package.json中eslintConfig中设置~
              "eslintConfig": {
                "extends": "airbnb-base"
              }
            airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint
      */
      /*
        正常来讲，一个文件只能被一个loader处理。
        当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
          先执行eslint 在执行babel
      */
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
      /*
        js兼容性处理：babel-loader @babel/core 
          1. 基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法，如promise高级语法不能转换
          2. 全部js兼容性处理 --> @babel/polyfill  
            问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
          3. 需要做兼容性处理的就做：按需加载  --> core-js
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
        },
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
  plugins: [
    //打包css成单独文件
    new MiniCssExtractPlugin({
      filename: "css/built.css",
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
  ],
  // 生产环境下会自动压缩js代码
  mode: "production",
};
