
# node_modules 里是什么？

## 问题

`node_modules` 里是什么？

## 回答

`node_modules` 是 npm/yarn/pnpm 等包管理器存放项目依赖的目录，里面主要是：

1. **已安装的包代码**
   - 每个依赖一个子目录，例如 `node_modules/express/`、`node_modules/lodash/`。
   - 子目录里通常包含该包的源码、`package.json`、README、类型声明等。

2. **包的元数据**
   - 每个包目录下的 `package.json` 定义了该包自己的名称、版本、入口文件、依赖等信息。

3. **子依赖（嵌套依赖）**
   - 某些情况下，一个包会把它的依赖放在自己的 `node_modules` 子目录下，例如 `node_modules/foo/node_modules/bar/`。
   - npm 会尽量扁平化，但遇到版本冲突时就会嵌套存放。

4. **`.bin` 目录**
   - `node_modules/.bin/` 存放了各包提供的可执行命令（CLI）的软链接或启动脚本，例如 `eslint`、`webpack`。
   - 这样运行 `npx eslint` 或 npm scripts 时就能找到对应命令。

5. **缓存与构建产物（视包而定）**
   - 一些包含原生模块的包（如 `node-sass`、`sharp`）会在安装时编译，生成二进制文件。
   - 有些包还会存放下载的预编译二进制文件或中间构建结果。

### 补充说明

- `node_modules` 不应该提交到版本控制（通常在 `.gitignore` 中忽略）。
- 只要保留 `package.json` 和 `package-lock.json`，就可以通过 `npm install` 重新生成 `node_modules`。
- 目录通常很大，包含大量小文件，因此删除或复制都可能比较慢。

# Node 是什么？

## 问题

Node 是什么？

## 回答

通常所说的 **Node** 指的是 **Node.js**，是一个基于 Chrome V8 引擎的 JavaScript 运行时环境。

### 核心定位

- **让 JavaScript 可以脱离浏览器运行**：在 Node.js 出现之前，JavaScript 主要在浏览器里运行；Node.js 把它带到了服务器端和命令行。
- **事件驱动、非阻塞 I/O**：采用单线程事件循环模型，擅长处理高并发、I/O 密集型任务，如 Web 服务器、API 接口、实时通信等。

### 主要组成

1. **V8 引擎**
   - Google 开发的高性能 JavaScript 引擎，负责把 JS 代码编译成机器码执行。

2. **libuv**
   - 提供跨平台的异步 I/O 能力，包括事件循环、线程池、文件系统、网络等底层能力。

3. **核心模块（内置 API）**
   - `fs`：文件系统操作。
   - `http`/`https`：创建 Web 服务器。
   - `path`：路径处理。
   - `events`：事件触发器。
   - `stream`：流式数据处理。
   - `crypto`：加密哈希等。
   - `child_process`：创建子进程。

4. **npm（Node Package Manager）**
   - Node.js 默认自带的包管理器，用于安装、管理和发布第三方模块。

### 常见用途

- 构建 Web 后端服务（Express、Koa、NestJS 等框架）。
- 开发命令行工具（CLI）。
- 前端工程化（Webpack、Vite、Babel、ESLint 等都运行在 Node.js 上）。
- 脚本自动化、爬虫、微服务、Serverless 等。

### Node 与 npm 的关系

- **Node.js 是运行环境**，让 JavaScript 代码可以执行。
- **npm 是包管理工具**，依附于 Node.js，用来管理项目依赖。
- 安装 Node.js 时，通常会自动附带 npm。

# Node 的包管理机制是什么样的？

## 问题

Node 的包管理机制是什么样的？

## 回答

Node 的包管理机制主要由 **npm（Node Package Manager）** 实现，核心目标是：声明依赖、解析版本、下载安装、隔离复用。以下是关键机制：

### 1. 项目级依赖声明：`package.json`

每个 Node 项目通过 `package.json` 声明自己是什么包、依赖什么包：

- `name` / `version`：当前包的名称和版本。
- `dependencies`：运行时依赖，项目运行必需。
- `devDependencies`：开发时依赖，如测试框架、构建工具，生产环境通常不安装。
- `peerDependencies`：宿主依赖，声明"我期望由使用方提供某个包"（如插件期望宿主框架）。
- `optionalDependencies`：可选依赖，安装失败不会导致整体安装失败。
- `scripts`：自定义命令脚本，如 `npm run build`。

### 2. 版本管理与语义化版本（semver）

版本号格式为 `MAJOR.MINOR.PATCH`：

- `MAJOR`：不兼容的 API 修改。
- `MINOR`：向下兼容的功能新增。
- `PATCH`：向下兼容的问题修复。

`package.json` 中常用版本范围：

- `^1.2.3`：兼容 1.x.x，允许 MINOR 和 PATCH 更新（即 `>=1.2.3 <2.0.0`）。
- `~1.2.3`：兼容 1.2.x（即 `>=1.2.3 <1.3.0`）。
- `1.2.3`：精确版本。
- `*` / `>=` / `<` 等：更宽泛或更严格的约束。

### 3. 依赖树解析

npm 根据 `package.json` 中的版本范围，递归解析每个包的依赖，形成一棵依赖树：

- 根项目依赖 A，A 又依赖 B，B 又依赖 C，依次递归。
- 如果多个包依赖同一个包，npm 会尝试复用兼容版本。
- 当版本冲突无法调和时，会在需要的地方嵌套安装不同版本。

### 4. 安装策略：扁平化 + 嵌套兜底

npm v3 之前采用完全嵌套结构；npm v3 之后改为**尽量扁平化**：

- 尽量把所有依赖提升到 `node_modules` 根目录。
- 好处：减少重复安装、路径更短、便于查找。
- 当冲突时，将不兼容版本嵌套到使用它的包的 `node_modules` 下。

例如：

```text
node_modules/
├── lodash@4.17.21      ← 大部分代码用的版本
└── package-a/
    └── node_modules/
        └── lodash@3.10.1  ← package-a 必须用旧版
```

### 5. 版本锁定：`package-lock.json`

为了确保"相同输入产生相同输出"，npm 会生成 `package-lock.json`：

- 记录实际安装的精确版本、下载地址、完整性哈希（integrity）。
- 多人协作时保证大家的 `node_modules` 一致。
- `npm ci` 会严格按 `package-lock.json` 安装，速度更快、行为更可预测。

### 6. 本地缓存

下载过的包会存到本地缓存（默认 `~/.npm/_cacache`）：

- 再次安装时优先从缓存读取，避免重复下载。
- 可用 `npm cache clean --force` 清理。

### 7. 包的作用域（Scoped Packages）

- 公有/私有组织包以 `@` 开头，如 `@babel/core`、`@company/internal-tool`。
- 作用域包可以区分命名空间，避免名称冲突，也便于私有发布。

### 8. 发布与 registry

- npm 默认从 https://registry.npmjs.org/ 下载包。
- 开发者可以通过 `npm publish` 把包发布到 registry。
- 企业可搭建私有 registry（如 Verdaccio、Nexus）。

### 9. 生命周期脚本

安装和执行过程中会触发脚本：

- `preinstall`、`install`、`postinstall`：安装阶段。
- `prepare`：安装前/打包前准备。
- `prepublishOnly`：发布前执行。

### 10. 其他包管理器

虽然 npm 是 Node 默认工具，但生态中也有替代方案：

- **Yarn**：更快的解析和安装，早期解决了 npm 的性能和一致性问题。
- **pnpm**：使用硬链接和符号链接，显著节省磁盘空间，依赖结构更严格。
- **Bun**：新兴的 JavaScript 运行时兼包管理器，强调速度。

# npx 命令是什么？

## 问题

`npx` 命令是什么？

## 回答

`npx` 是 npm 从 5.2.0 版本开始内置的一个命令行工具，全称是 **Node Package eXecute**。它的主要作用是**执行 Node 包中的可执行文件（CLI 命令）**，无需先全局安装该包。

### 核心用途

1. **执行本地已安装的命令**
   - 例如项目中已安装 `eslint`，可以直接运行：
     ```bash
     npx eslint src/
     ```
   - 它会自动到 `node_modules/.bin/` 中查找对应的命令。

2. **临时执行未安装的命令**
   - 如果本地或全局没有安装该包，`npx` 会先临时下载安装、执行命令、执行完后再删除：
     ```bash
     npx create-react-app my-app
     ```
   - 避免为了用一次而全局安装，节省磁盘空间，也避免版本冲突。

3. **执行指定版本的命令**
   - 可以明确指定要使用的包版本：
     ```bash
     npx eslint@7 src/
     ```

4. **执行 Gist / GitHub 仓库中的脚本**
   - `npx` 还支持直接运行远程代码，例如：
     ```bash
     npx github:username/repo
     ```

### 与 `npm` 的区别

| 命令 | 作用 |
|------|------|
| `npm install` | 安装包到 `node_modules`，不直接执行 |
| `npx` | 执行包中的命令，可临时下载并运行 |

### 使用示例

```bash
# 本地没有 create-react-app 时，临时下载并创建项目
npx create-react-app my-app

# 执行项目本地安装的 webpack
npx webpack --config webpack.config.js

# 指定版本运行 eslint
npx eslint@8 --version

# 执行 npm scripts 中的命令时，npm 会自动查找 node_modules/.bin，
# 所以 scripts 里通常直接写 "eslint src/"，不需要写 npx
```

### 注意事项

- `npx` 默认会优先使用本地 `node_modules/.bin` 中的命令，找不到才会临时下载。
- 临时下载的包会放在 npm 缓存中，执行完成后通常会被清理。
- 在企业内网或受限环境下，临时下载可能失败，这时建议先本地安装再执行。
