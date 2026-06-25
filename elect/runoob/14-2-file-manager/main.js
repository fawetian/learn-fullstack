/**
 * 14-2-file-manager - 项目二：文件管理器（主进程）
 *
 * 本文件实现文件管理器的主进程，核心功能：
 * 1. 目录树构建：递归读取目录结构，使用 fs.promises 异步避免阻塞
 * 2. 文件操作：新建、删除、重命名、移动（拖拽）
 * 3. 路径处理：path.join 跨平台拼接，path.dirname 获取父目录
 * 4. 拖拽支持：处理渲染进程拖拽文件后的移动操作
 *
 * 性能优化要点：
 * - fs.promises.readdir / stat 替代同步版本，防止大目录阻塞事件循环
 * - 使用 Promise.all 并行读取子目录，加速目录树构建
 * - 错误处理：访问权限不足时优雅返回错误信息而非崩溃
 */

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs').promises;   // 使用 Promise 版本的 fs，非阻塞
const fss = require('fs');            // 同步版本用于个别需要同步的场景
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100, height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => { createWindow(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });

// ==================== IPC：选择根目录 ====================

/**
 * IPC: select-root - 打开对话框选择要浏览的根目录
 *
 * dialog.showOpenDialog 配合 properties: ['openDirectory'] 只选目录。
 */
ipcMain.handle('select-root', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  return result.canceled ? null : result.filePaths[0];
});

// ==================== IPC：构建目录树 ====================

/**
 * IPC: build-tree - 递归构建目录树
 *
 * 使用 fs.promises.readdir + stat 异步读取，避免大目录阻塞。
 * 通过 withFileTypes: true 一次性获取文件类型（是文件还是目录），
 * 无需额外调用 stat 判断。
 *
 * 对于目录类型条目，递归调用 buildTreeNode 构建子树。
 * 使用 Promise.all 并行处理所有子目录，加速构建。
 */
ipcMain.handle('build-tree', async (event, dirPath) => {
  try {
    const tree = await buildTreeNode(dirPath);
    return tree;
  } catch (e) {
    return { error: e.message };
  }
});

async function buildTreeNode(dirPath) {
  const name = path.basename(dirPath);
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  // 只保留目录项用于树形展示（文件在右侧列表展示）
  const dirs = entries.filter(e => e.isDirectory());

  // 并行递归构建子目录树
  const children = await Promise.all(
    dirs.map(async d => {
      const childPath = path.join(dirPath, d.name);
      try {
        return await buildTreeNode(childPath);
      } catch (e) {
        // 权限不足等错误：返回空节点，不中断整个树
        return { name: d.name, path: childPath, error: true };
      }
    })
  );

  return {
    name,
    path: dirPath,
    children: children.filter(c => !c.error)
  };
}

// ==================== IPC：读取文件列表 ====================

/**
 * IPC: list-files - 读取指定目录的文件列表（含文件和目录）
 *
 * 返回数组，每项包含 name、isDirectory、size、mtime（修改时间）。
 * 使用 fs.promises.stat 异步获取文件详细信息。
 */
ipcMain.handle('list-files', async (event, dirPath) => {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async e => {
        const filePath = path.join(dirPath, e.name);
        const stat = await fs.stat(filePath);
        return {
          name: e.name,
          path: filePath,
          isDirectory: e.isDirectory(),
          size: stat.size,
          mtime: stat.mtime.getTime()
        };
      })
    );
    return files;
  } catch (e) {
    return { error: e.message };
  }
});

// ==================== IPC：文件操作 ====================

/**
 * IPC: create-file - 在指定目录下新建文件
 *
 * 使用 fs.promises.writeFile 写入空内容创建文件。
 */
ipcMain.handle('create-file', async (event, dirPath, filename) => {
  try {
    const filePath = path.join(dirPath, filename);
    await fs.writeFile(filePath, '');
    return { success: true, path: filePath };
  } catch (e) {
    return { error: e.message };
  }
});

/**
 * IPC: create-dir - 在指定目录下新建子目录
 */
ipcMain.handle('create-dir', async (event, dirPath, dirname) => {
  try {
    const newPath = path.join(dirPath, dirname);
    await fs.mkdir(newPath);
    return { success: true, path: newPath };
  } catch (e) {
    return { error: e.message };
  }
});

/**
 * IPC: delete-file - 删除文件或目录
 *
 * 如果是目录，使用 fs.promises.rmdir（只能删空目录）或递归删除。
 * 这里简化：只删除文件，目录删除用 delete-dir。
 */
ipcMain.handle('delete-file', async (event, filePath) => {
  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      // 递归删除目录（Node 16+ 可用 fs.promises.rm with recursive）
      await fs.rm(filePath, { recursive: true, force: true });
    } else {
      await fs.unlink(filePath);
    }
    return { success: true };
  } catch (e) {
    return { error: e.message };
  }
});

/**
 * IPC: rename-file - 重命名文件或目录
 *
 * 使用 fs.promises.rename，底层是系统级的原子重命名。
 */
ipcMain.handle('rename-file', async (event, oldPath, newName) => {
  try {
    const parent = path.dirname(oldPath);
    const newPath = path.join(parent, newName);
    await fs.rename(oldPath, newPath);
    return { success: true, newPath };
  } catch (e) {
    return { error: e.message };
  }
});

/**
 * IPC: move-file - 拖拽移动文件/目录到目标目录
 *
 * 使用 fs.promises.rename 跨目录移动（同分区是原子操作，
 * 跨分区会自动复制+删除）。
 */
ipcMain.handle('move-file', async (event, sourcePath, targetDir) => {
  try {
    const name = path.basename(sourcePath);
    const targetPath = path.join(targetDir, name);
    await fs.rename(sourcePath, targetPath);
    return { success: true, targetPath };
  } catch (e) {
    return { error: e.message };
  }
});

/**
 * IPC: read-file-content - 读取文件内容（用于查看文本文件）
 */
ipcMain.handle('read-file-content', async (event, filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return { content };
  } catch (e) {
    return { error: e.message };
  }
});
