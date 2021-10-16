# antd

`yarn add antd`

## antd 的按需引入+自定义主题

1. 安装依赖：
   - 按需引入：`yarn add react-app-rewired customize-cra babel-plugin-import`
     - react-app-rewired：一个对 create-react-app 进行自定义配置的社区解决方案
     - babel-plugin-import：是一个用于按需加载组件代码和样式的 babel 插件
   - 自定义主题：`less less loader`
2. 修改 package.json

```
···
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject",// 暴露配置
}
···
```

3. 根目录下创建 config-overrides.js

```
<!-- 配置具体的修改规则 -->
const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(

    <!-- 按需加载 -->
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'(按需加载) || true(自定义主题)
    }),

    <!-- 自定义主题 -->
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {'@primary-color': 'green'},
        }
    }),
);
```

4. 备注：不用在组件里亲自引入样式了，即：import 'antd/dist/antd.css'应该删掉
