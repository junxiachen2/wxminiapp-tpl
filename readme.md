### 小程序模板
使用了 [miniapp-cli](https://www.npmjs.com/package/miniapp-cli)

`````
├── config.json     //配置文件,可忽略
├── dist            //编译后文件目录
│   ├── app.js
│   ├── app.json
│   ├── app.wxss
│   ├── pages
│   │   ├── index
│   │   │   ├── index.js
│   │   │   ├── index.wxml
│   │   │   └── index.wxss
│   │   └── permission
│   │       ├── permission.js
│   │       ├── permission.json
│   │       ├── permission.wxml
│   │       └── permission.wxss
│   ├── project.config.json
│   └── utils
│       ├── api.js
│       ├── runtime.js
│       ├── util.js
│       └── wechat.js
├── package.json
├── readme.md
└── src             //开发文件目录
    ├── app.js
    ├── app.json
    ├── app.wxss
    ├── pages
    │   ├── index
    │   │   ├── index.js
    │   │   ├── index.scss
    │   │   └── index.wxml
    │   └── permission
    │       ├── permission.js
    │       ├── permission.json
    │       ├── permission.scss
    │       └── permission.wxml
    ├── project.config.json
    └── utils
        ├── api.js
        ├── runtime.js
        ├── util.js
        └── wechat.js
`````