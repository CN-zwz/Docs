console.log('Waline comment load script(v0.2) loaded');

import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

function initWalineComment() {
    init({
        el: '#waline',
        serverURL: 'https://waline.zhongwz.top',
        pageview: true,
    });
}

window.initWaline = initWalineComment;
// setTimeout(() => {
//     init({
//         el: '#waline',
//         serverURL: 'https://waline.zhongwz.top',
//         pageview: true,
//     });
// }, 5000);

// document.addEventListener('DOMContentLoaded', function () {
//     const commentLoadButton = document.getElementById('waline-load-button');
//     if (commentLoadButton) {
//         console.log('Waline comment button found');
//         commentLoadButton.addEventListener('click', () => {
//             initWalineComment();
//             commentLoadButton.style.display = 'none'; // 隐藏按钮
//         });
//     } else {
//         console.log('Waline comment button not found');
//     }
// });