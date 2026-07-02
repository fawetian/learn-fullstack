/**
 * 章节: React Props（属性）
 * 来源: 15-props/example_10.jsx（形状A | class）
 * 由 scripts/convert.mjs 自动生成 —— 可直接编辑本文件调整。
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// 把本 demo 渲染进 DemoRunner 提供的容器
export function mount(container) {
  // === 沙箱：让原代码 document.getElementById('root'/'example'/...) 都指向本容器 ===
  const _origGetById = document.getElementById.bind(document);
  document.getElementById = () => container;
  const _roots = [];
  const ReactDOM = {
    createRoot: (el) => { const r = createRoot(el || container); _roots.push(r); return r; },
    render: (elem, el) => { const r = createRoot(el || container); r.render(elem); _roots.push(r); },
    unmountComponentAtNode: () => {},
  };
  // 补上原代码常从 react 解构的符号（它们的 import 已被 cleanCode 清掉）
  const { Component, Fragment, PureComponent, useState, useEffect, useContext,
          useReducer, useCallback, useMemo, useRef, memo, createContext,
          createElement, Children, cloneElement, isValidElement } = React;
  // PropTypes 简易桩：原代码可能用 PropTypes.string 等，运行时不校验，返回 noop 函数
  const PropTypes = new Proxy(function(){}, {
    get: () => new Proxy(function(){}, { get: () => () => {}, set: () => true })
  });
  let _cleanup = () => {};

  /* ↓↓↓ 原始 example 代码（原样执行，会自己挂载）↓↓↓ */
  class MyComponent extends React.Component {

    static propTypes = {

      title: PropTypes.string.isRequired, // 必须是字符串且必需

      age: PropTypes.number,              // 可选的数字

      isAdmin: PropTypes.bool,            // 可选的布尔值

      user: PropTypes.shape({             // 必须是具有特定形状的对象

        name: PropTypes.string,

        email: PropTypes.string

      }),

      items: PropTypes.arrayOf(PropTypes.string), // 必须是字符串数组

      callback: PropTypes.func,           // 可选的函数

      children: PropTypes.node,           // 可选的可以渲染的内容

      options: PropTypes.oneOf(['option1', 'option2']), // 必须是特定值之一

    };

    render() {

      return (

        <div>

          <h1>{this.props.title}</h1>

          {this.props.age && <p>Age: {this.props.age}</p>}

          {this.props.isAdmin && <p>Admin</p>}

          {this.props.user && (

            <div>

              <p>Name: {this.props.user.name}</p>

              <p>Email: {this.props.user.email}</p>

            </div>

          )}

          {this.props.items && (

            <ul>

              {this.props.items.map((item, index) => (

                <li key={index}>{item}</li>

              ))}

            </ul>

          )}

          {this.props.callback && (

            <button onClick={this.props.callback}>Click me</button>

          )}

          {this.props.children}

          {this.props.options && <p>Option: {this.props.options}</p>}

        </div>

      );

    }

  }

  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(

    <MyComponent 

      title="Hello, World!"

      age={30}

      isAdmin={true}

      user={{ name: "John Doe", email: "john@example.com" }}

      items={['Item 1', 'Item 2', 'Item 3']}

      callback={() => alert('Button clicked!')}

      options="option1"

    >

      <p>This is a child element</p>

    </MyComponent>

  );

  // 注意：不要在这里同步 unmount！React 此刻可能仍在异步 commit。
  // 把清理动作放进返回的 cleanup 函数，由 DemoRunner 在组件卸载时调用。
  return () => {
    document.getElementById = _origGetById;
    _roots.forEach(r => { try { r.unmount(); } catch(e){} });
    try { _cleanup(); } catch(e){}
  };

}

export const title = "React Props（属性） · example_10";
export const sourceFile = "15-props/example_10.jsx";
export const shape = "A";
export const rawCode = "class MyComponent extends React.Component {\n\n  static propTypes = {\n\n    title: PropTypes.string.isRequired, // 必须是字符串且必需\n\n    age: PropTypes.number,              // 可选的数字\n\n    isAdmin: PropTypes.bool,            // 可选的布尔值\n\n    user: PropTypes.shape({             // 必须是具有特定形状的对象\n\n      name: PropTypes.string,\n\n      email: PropTypes.string\n\n    }),\n\n    items: PropTypes.arrayOf(PropTypes.string), // 必须是字符串数组\n\n    callback: PropTypes.func,           // 可选的函数\n\n    children: PropTypes.node,           // 可选的可以渲染的内容\n\n    options: PropTypes.oneOf(['option1', 'option2']), // 必须是特定值之一\n\n  };\n\n  render() {\n\n    return (\n\n      <div>\n\n        <h1>{this.props.title}</h1>\n\n        {this.props.age && <p>Age: {this.props.age}</p>}\n\n        {this.props.isAdmin && <p>Admin</p>}\n\n        {this.props.user && (\n\n          <div>\n\n            <p>Name: {this.props.user.name}</p>\n\n            <p>Email: {this.props.user.email}</p>\n\n          </div>\n\n        )}\n\n        {this.props.items && (\n\n          <ul>\n\n            {this.props.items.map((item, index) => (\n\n              <li key={index}>{item}</li>\n\n            ))}\n\n          </ul>\n\n        )}\n\n        {this.props.callback && (\n\n          <button onClick={this.props.callback}>Click me</button>\n\n        )}\n\n        {this.props.children}\n\n        {this.props.options && <p>Option: {this.props.options}</p>}\n\n      </div>\n\n    );\n\n  }\n\n}\n\nconst root = ReactDOM.createRoot(document.getElementById(\"root\"));\n\nroot.render(\n\n  <MyComponent \n\n    title=\"Hello, World!\"\n\n    age={30}\n\n    isAdmin={true}\n\n    user={{ name: \"John Doe\", email: \"john@example.com\" }}\n\n    items={['Item 1', 'Item 2', 'Item 3']}\n\n    callback={() => alert('Button clicked!')}\n\n    options=\"option1\"\n\n  >\n\n    <p>This is a child element</p>\n\n  </MyComponent>\n\n);";
