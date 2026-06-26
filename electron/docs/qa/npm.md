# npm install 时发生了什么？

## 问题

`npm install` 的时候发生了什么？

## 回答

执行 `npm install` 时，npm 大致会经历以下阶段：

1. **读取配置**
   - 解析 `package.json`、`.npmrc`、`package-lock.json`（或 `npm-shrinkwrap.json`）等文件。
   - 读取 registry 地址、代理、缓存目录等配置。

2. **构建依赖树**
   - 根据 `package.json` 中的 `dependencies` 和 `devDependencies`，递归解析每个包的版本范围。
   - 如果有 `package-lock.json`，优先按锁定版本解析，保证可复现性；如果没有，则按 semver 范围解析最新兼容版本。

3. **版本协商与冲突处理**
   - 当不同包依赖同一包的不同版本时，npm 会尽量复用兼容版本，必要时在 `node_modules` 中嵌套安装多个版本（npm v3+ 的扁平化 + 嵌套兜底策略）。

4. **下载包**
   - 先查本地缓存（`~/.npm/_cacache`），命中则直接复用。
   - 未命中时从配置的 registry（默认 https://registry.npmjs.org/）下载 tarball。

5. **解压与安装到 `node_modules`**
   - 将下载的 tarball 解压到 `node_modules/<package>` 目录。
   - 执行生命周期脚本：`preinstall`、`install`、`postinstall`、`prepare` 等。

6. **生成/更新 lock 文件**
   - 如果 `--package-lock` 启用，会生成或更新 `package-lock.json`，记录实际安装的精确版本、下载地址和完整性校验值。

7. **审计（可选）**
   - 默认会运行 `npm audit`，检查已安装依赖中的已知安全漏洞。

### 补充说明

- 若 `node_modules` 已存在且 `package-lock.json` 没变，npm 会跳过大部分工作，速度较快。
- 删掉 `node_modules` 后再执行 `npm install`，会按 `package-lock.json` 重新安装。
- 若 `package.json` 和 `package-lock.json` 不一致，可能触发 lock 文件更新。
