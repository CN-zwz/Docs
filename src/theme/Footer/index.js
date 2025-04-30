import React from 'react';
import Footer from '@theme-original/Footer';
import FooterDomainText from '../../components/FooterDomainText';

export default function FooterWrapper(props) {
  return (
    <>
      {/* 渲染原始的页脚组件 */}
      <Footer {...props} />
      {/* 渲染根据域名显示文字的组件 */}
      <FooterDomainText />
    </>
  );
}