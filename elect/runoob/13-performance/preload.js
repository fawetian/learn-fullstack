/**
 * 13-performance - 预加载脚本：性能监控 API
 */

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('perfAPI', {
  // process.memoryUsage() 返回内存使用统计：
  // - rss: 常驻内存大小
  // - heapTotal: V8 堆总大小
  // - heapUsed: V8 堆已使用大小
  // - external: C++ 对象使用的内存
  memory: () => process.memoryUsage()
});
