import React, { useEffect } from 'react';

const FooterDomainText = () => {
    useEffect(() => {
        const currentDomain = window.location.hostname;
        const domainTextMap = {
            "example.com": "欢迎访问 example.com",
            "localhost": "当前为本地开发环境。（本地调试用）",
            "docs.zhongwz.top": "您当前访问的是 docs.zhongwz.top，主站，托管于 GitHub。（版本最新，但是国内访问极不稳定）",
            "docs2.zhongwz.top": "您当前访问的是 docs2.zhongwz.top，备用一站，托管于 CloudFlare Pages。（理论上与 Github同步，访问相对稳定）",
            "docs3.zhongwz.top": "您当前访问的是 docs3.zhongwz.top，备用二站，托管于 阿里云OSS，新加坡地域。（版本最落后，且更新随缘，访问最稳定。毕竟这是真的可能会扣钱的啊）",
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