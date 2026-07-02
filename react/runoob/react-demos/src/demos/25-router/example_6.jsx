/**
 * 章节: 路由
 * 来源: 25-router/example_6.jsx —— ⚠️ 依赖外部文件（./Home, ./About, ./Contact），属多文件项目片段，无法独立运行
 */
export const title = "路由 · example_6 (源码展示)";
export const sourceFile = "25-router/example_6.jsx";
export const isSourceOnly = true;
export const sourceCode = `/**
 * ============================================================
 * 章节: React 路由
 * 文件: react/runoob/25-router/example_6.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import React from 'react';

import ReactDOM from 'react-dom/client';

import {

  BrowserRouter as Router,

  Routes,

  Route,

  Link

} from 'react-router-dom';



import Home from './Home';

import About from './About';

import Contact from './Contact';

import Dashboard from './Dashboard';

import Profile from './Profile';

import Settings from './Settings';



const App = () => {

  return (

    <Router>

      <div>

        <nav>

          <ul>

            <li>

              <Link to="/">Home</Link>

            </li>

            <li>

              <Link to="/about">About</Link>

            </li>

            <li>

              <Link to="/contact">Contact</Link>

            </li>

            <li>

              <Link to="/dashboard">Dashboard</Link>

            </li>

          </ul>

        </nav>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/dashboard" element={<Dashboard />}>

            <Route path="profile" element={<Profile />} />

            <Route path="settings" element={<Settings />} />

          </Route>

        </Routes>

      </div>

    </Router>

  );

};



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);`;
export function mount() {}
