<template>
  <div class="ipc-demo" style="margin-top: 20px; padding: 15px; background: #f5f7fa; border-radius: 8px;">
    <h3>IPC 演示</h3>
    <button @click="openFile" style="padding: 10px 20px; cursor: pointer;">选择文件</button>
    <p v-if="filePath">选中文件: {{ filePath }}</p>
  </div>
</template>

<script>
/**
 * IPC 演示组件 - 封装 IPC 调用
 * 
 * 注意：在 Vue 组件中检查 window.ipcAPI 是否存在，
 * 这样组件在浏览器中也能运行（只是功能不可用）。
 */

export default {
  name: 'IpcDemo',
  data() {
    return { filePath: '' };
  },
  methods: {
    async openFile() {
      if (!window.ipcAPI) {
        alert('Electron 环境不可用');
        return;
      }
      const path = await window.ipcAPI.openFile();
      if (path) this.filePath = path;
    }
  }
};
</script>
