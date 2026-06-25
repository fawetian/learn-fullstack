my-first-react-app/
├── public/              # 静态资源（直接复制到构建输出）
│   └── vite.svg         # Vite Logo
├── src/                 # 源码主目录（重点！）
│   ├── assets/          # 图片等资源
│   │   └── react.svg
│   ├── App.jsx          # 主组件（应用入口）
│   ├── main.jsx         # 入口文件（挂载根组件）
│   ├── index.css        # 全局样式
│   └── vite-env.d.ts    # TypeScript 声明（JS 项目可忽略）
├── .gitignore
├── index.html           # HTML 入口模板
├── package.json         # 依赖和脚本
├── vite.config.js       # Vite 配置文件（目前为空，可自定义）
└── README.md