import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

setTimeout(() => {
    init({
        el: '#waline',
        serverURL: 'https://waline.zhongwz.top',
        pageview: true,
    });
}, 5000);