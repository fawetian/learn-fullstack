/**
 * ============================================================
 * 章节: React AJAX
 * 文件: react/runoob/21-ajax/example_2.jsx
 * ============================================================
 * 核心概念速查（Go 后端开发者视角）:
 * - 组件 ≈ Go 的函数/方法，接收 props（类似参数）返回 UI（类似字符串渲染）
 * - JSX ≈ Go 的 html/template，在代码中写 HTML 语法，编译为 JS 对象
 * - State ≈ 闭包捕获的变量，变化触发组件重新执行（类似函数重入）
 * - 虚拟 DOM ≈  diff 算法，只更新变化的节点（类似 git diff 后 patch）
 * - Hooks ≈ 闭包 + 函数组合，useState 像返回 (value, setter) 的函数
 * ============================================================
 */

import React, { useState, useEffect } from 'react';

import axios from 'axios';



const MyComponent = () => {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.get('https://api.example.com/data');

        setData(response.data);

        setLoading(false);

      } catch (error) {

        console.error('Error fetching data:', error);

      }

    };



    fetchData();

  }, []);



  if (loading) {

    return <div>Loading...</div>;

  }



  return (

    <div>

      <h1>Data from API:</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>

    </div>

  );

};



export default MyComponent;