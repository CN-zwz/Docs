import React, { useEffect } from 'react';

const FooterDomainText = () => {
    useEffect(() => {
        const currentDomain = window.location.hostname;
        const domainTextMap = {
            "localhost": "当前为本地开发环境。（本地调试用）",
            "docs1.zhongwz.top": "您当前访问的是 docs1.zhongwz.top，保留站，托管于 Github Pages。",
            "docs.zhongwz.top": "您当前访问的是 docs.zhongwz.top，主站，托管于 Cloudflare Pages。（版本新，国内访问稳定）",
            "docs2.zhongwz.top": "您当前访问的是 docs2.zhongwz.top，备用一站，托管于 CloudFlare Pages。（理论上与 Github同步，访问相对稳定）",
            "docs5.zhongwz.top": "您当前访问的是 docs5.zhongwz.top，备用四站，除域名外，与主站一致。",
            // 可以继续添加更多的域名和对应的显示文字
        };
        const displayText = domainTextMap[currentDomain] || "未知访问域名";

        const textElement = document.getElementById("domain-text");
        if (textElement) {
            textElement.innerHTML = displayText;
        }
    }, []);

    return (
        <div
            id="domain-text"
            style={{
                fontSize: "14px",
                color: "#C0C0C0", // 调整为更深的颜色
                textAlign: "center",
                marginTop: "20px",
                fontFamily: "Arial, sans-serif",
                fontStyle: "italic", // 添加斜体样式
            }}
        ></div>
    );
};

export default FooterDomainText;