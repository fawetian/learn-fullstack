1. 状态改变
   ↓
2. 生成新的虚拟 DOM 树
   ↓
3. 与旧虚拟 DOM 树进行对比（Diffing）
   ↓
4. 计算出最小差异（Reconciliation）
   ↓
5. 只更新真实 DOM 中变化的部分