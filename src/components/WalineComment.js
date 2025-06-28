import React, { useEffect, useRef } from 'react';
import { init } from '@waline/client';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function WalineComment({ serverURL }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // 只在客户端执行
    const waline = init({
      el: containerRef.current,
      serverURL: 'https://waline.zhongwz.top', // Waline 服务端地址
      path: window.location.pathname, // 当前页面路径
      // 可选配置项（根据需求添加）：
      // lang: 'zh-CN',
      // emoji: ['https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo'],
      // dark: 'html[data-theme="dark"]',
    });

    return () => waline.destroy();
  }, [serverURL]);

  return <div ref={containerRef} />;
}