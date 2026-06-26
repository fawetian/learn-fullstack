/**
 * ============================================================
 * 章节: Node.js 多进程
 * 文件: node/runoob/34-multiprocess/example_10.js
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 单线程事件循环 ≈ Go 的 runtime 调度器，但只有一个 OS 线程跑 JS
 * - 非阻塞 IO ≈ Go 的 netpoller + goroutine，IO 等待时不阻塞执行流
 * - 回调/Promise/async ≈ Go 的 goroutine + channel，异步结果通知方式不同
 * - CommonJS 模块 ≈ Go 的 package/import，require 像 import，module.exports 像暴露的接口
 * - EventEmitter ≈ Go 的 channel 广播或 sync.Cond，发布/订阅模式
 * ============================================================
 */

// pool/index.js

const { exec, spawn } = require('child_process');
const os = require('os');
const {  fork  } = require('child_process');




class ProcessPool {

  constructor({ file, size = Math.max(1, os.cpus().length - 1) } = {}) {

    this.file = file;

    this.size = size;

    this.idle = [];

    this.busy = new Map();  // worker -> taskId

    this.queue = [];

    for (let i = 0; i < size; i++) this._spawn();

  }



  _spawn() {

    const w = fork(this.file);

    w.on('message', (m) => {

      if (m?.type === 'done') {

        const cb = this.callbacks.get(m.id);

        if (cb) cb.resolve(m.result);

        this.callbacks.delete(m.id);

        this._markIdle(w);

        this._drain();

      }

    });

    w.on('exit', () => {

      // 自动补齐池子

      this.busy.delete(w);

      const idx = this.idle.indexOf(w);

      if (idx >= 0) this.idle.splice(idx, 1);

      this._spawn();

    });

    if (!this.callbacks) this.callbacks = new Map();

    this.idle.push(w);

  }



  _markIdle(w) {

    this.busy.delete(w);

    if (!this.idle.includes(w)) this.idle.push(w);

  }



  _acquire() {

    return this.idle.length ? this.idle.shift() : null;

  }



  _drain() {

    while (this.queue.length && this.idle.length) {

      const { id, payload, resolve, reject } = this.queue.shift();

      const w = this._acquire();

      this.busy.set(w, id);

      this.callbacks.set(id, { resolve, reject });

      w.send({ type: 'task', id, payload });

    }

  }



  runTask(payload) {

    const id = Math.random().toString(36).slice(2);

    return new Promise((resolve, reject) => {

      this.queue.push({ id, payload, resolve, reject });

      this._drain();

    });

  }



  close() {

    for (const w of this.idle) w.kill();

    for (const w of this.busy.keys()) w.kill();

  }

}