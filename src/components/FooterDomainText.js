import React, { useEffect } from 'react';

const FooterDomainText = () => {
    useEffect(() => {
        const currentDomain = window.location.hostname;
        const domainTextMap = {
            "example.com": "欢迎访问 example.com",
            "localhost": "本地开发环境",
            "zhongwz.top": "欢迎访问 zhongwz.top",
            // 可以继续添加更多的域名和对应的显示文字
        };
        const displayText = domainTextMap[currentDomain] || "未知域名";

        const textElement = document.getElementById("domain-text");
        if (textElement) {
            textElement.textContent = displayText;
        }
    }, []);

    return (
        <div id="domain-text"></div>
    );
};

export default FooterDomainText;