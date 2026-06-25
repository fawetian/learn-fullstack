{
  // 保存时自动格式化
  "editor.formatOnSave": true,
  // 默认使用 Prettier 格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // ESLint 自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },

  // JSX/TSX 文件也应用 Prettier
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // 显示行号、缩进指南
  "editor.rulers": [80],
  "editor.guides.indentation": true
}