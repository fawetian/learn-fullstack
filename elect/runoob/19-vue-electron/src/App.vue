<template>
  <div id="app" style="padding: 20px; font-family: sans-serif;">
    <h1>Vue + Electron</h1>
    <p>状态: {{ status }}</p>
    <IpcDemo />
  </div>
</template>

<script>
/**
 * Vue 根组件 - 演示与 Electron 的集成
 * 
 * 在 Vue 组件中通过 window.ipcAPI 调用 Electron 功能。
 * 注意：Vue 组件不直接 import electron，保持浏览器兼容性。
 */

import IpcDemo from './components/IpcDemo.vue';

export default {
  name: 'App',
  components: { IpcDemo },
  data() {
    return { status: '加载中...' };
  },
  async mounted() {
    // 组件挂载时测试 Electron 连接
    if (window.ipcAPI) {
      const res = await window.ipcAPI.ping();
      this.status = 'Electron 连接成功: ' + res;
    } else {
      this.status = '浏览器环境（无 Electron）';
    }
  }
};
</script>
