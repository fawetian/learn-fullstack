/**
 * Vue CLI 配置 + Electron Builder 配置
 * 
 * vue.config.js 是 Vue CLI 的配置文件，
 * pluginOptions.electronBuilder 是 electron-builder 的专用配置。
 * 
 * 关键配置：
 * - preload: 预加载脚本路径（相对于 src 目录）
 * - mainProcessFile: 主进程入口文件
 * - builderOptions: electron-builder 打包配置
 */

module.exports = {
  pluginOptions: {
    electronBuilder: {
      // 预加载脚本路径（相对于项目根目录）
      preload: 'preload.js',
      // 主进程入口
      mainProcessFile: 'src/electron/main.js',
      // 打包配置
      builderOptions: {
        appId: 'com.example.vue-electron',
        productName: 'Vue Electron App',
        directories: {
          output: 'dist_electron'
        }
      }
    }
  }
};
