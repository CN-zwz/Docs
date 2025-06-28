// Powered By DeepSeek
/*
实现原理：利用AES加密算法，对具有特定类名的元素内容进行替换，同时具有提示输入密码等功能。
改进：增强动态内容检测能力，修复自动检查问题
提示：调用了crypto-js。
*/
console.info('AES Load.v0.2');
document.addEventListener('DOMContentLoaded', function () {
    // 配置项
    const config = {
        storageKey: 'aes_decryption_key', // 本地存储密钥的基础键名
        encryptedClass: 'encrypted-content', // 加密内容的class名
        maxAttempts: 3, // 最大尝试次数（迷惑纯小白，实际上都是本地处理）
        attemptCount: 0, // 当前尝试次数
        scopeOptions: ['全局保存（同域名）', '仅本次会话有效', '仅本页面有效'], // 密码存储范围选项
        errorMessages: {
            invalidKey: '❌ 密钥不正确，请重试',
            emptyKey: '⚠️ 请输入解密密钥',
            storageError: '⚠️ 无法保存密钥到本地存储，将使用会话密钥',
            formatError: '⚠️ 解密内容格式错误，请联系内容提供者',
            maxAttempts: '⛔ 尝试次数过多，请刷新页面后重试'
        },
        debugMode: false // 调试模式，生产环境可设为false
    };

    // 存储当前页面的解密状态
    const state = {
        decryptedElements: new Set(),
        globalKey: null,
        sessionKey: null,
        pageKey: null,
        observer: null,
        intervalId: null
    };

    // 初始化解密处理器
    function initDecryption() {
        if (config.debugMode) console.info('初始化AES解密系统');
        
        // 先尝试从不同存储位置获取密钥
        loadSavedKeys();
        
        // 初始解密检查
        checkAndDecryptElements();
        
        // 设置定时检查新元素
        setupDynamicDetection();
    }

    // 从不同存储位置加载密钥
    function loadSavedKeys() {
        // 1. 检查本地存储（全局密钥）
        try {
            const globalKey = localStorage.getItem(`${config.storageKey}_global`);
            if (globalKey) {
                if (config.debugMode) console.info('检测到全局密匙');
                state.globalKey = globalKey;
            }
        } catch (e) {
            console.warn(config.errorMessages.storageError, e);
        }
        
        // 2. 检查会话存储（会话密钥）
        try {
            const sessionKey = sessionStorage.getItem(`${config.storageKey}_session`);
            if (sessionKey) {
                if (config.debugMode) console.info('检测到会话密匙');
                state.sessionKey = sessionKey;
            }
        } catch (e) {
            console.warn(config.errorMessages.storageError, e);
        }
        
        // 3. 检查页面内存（页面密钥）
        state.pageKey = window[`${config.storageKey}_page`];
    }

    // 设置动态元素检测
    function setupDynamicDetection() {
        // 清除之前的检测器
        if (state.observer) state.observer.disconnect();
        if (state.intervalId) clearInterval(state.intervalId);
        
        // 使用MutationObserver检测DOM变化
        state.observer = new MutationObserver(function(mutations) {
            if (config.debugMode) console.log('MutationObserver: 检测到DOM变化', mutations);
            
            let needsCheck = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                    Array.from(mutation.addedNodes).forEach(node => {
                        // 检查节点本身或子节点是否包含加密元素
                        if (node.nodeType === 1) {
                            if (node.classList && node.classList.contains(config.encryptedClass)) {
                                needsCheck = true;
                            }
                            if (node.querySelector && node.querySelector(`.${config.encryptedClass}`)) {
                                needsCheck = true;
                            }
                        }
                    });
                }
            });
            
            if (needsCheck) {
                if (config.debugMode) console.info('检测到新DOM元素，重新检查解密');
                checkAndDecryptElements();
            }
        });

        // 开始观察整个文档
        state.observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });
        
        if (config.debugMode) console.info('MutationObserver已启动');
        
        // 每3秒主动检查一次（应对某些特殊情况）
        state.intervalId = setInterval(() => {
            if (config.debugMode) console.info('定时检查：扫描加密元素');
            checkAndDecryptElements();
        }, 3000);
    }

    // 检查并解密所有符合条件的元素
    function checkAndDecryptElements() {
        const encryptedElements = document.querySelectorAll(`.${config.encryptedClass}:not(.decrypted)`);
        
        if (encryptedElements.length === 0) {
            if (config.debugMode) console.info('没有发现未解密的加密元素');
            return;
        }
        
        if (config.debugMode) console.info(`发现${encryptedElements.length}个未解密元素`);
        
        // 按优先级尝试解密：页面密钥 > 会话密钥 > 全局密钥
        const keysToTry = [];
        if (state.pageKey) keysToTry.push({key: state.pageKey, silent: true});
        if (state.sessionKey) keysToTry.push({key: state.sessionKey, silent: true});
        if (state.globalKey) keysToTry.push({key: state.globalKey, silent: true});
        
        // 如果没有保存的密钥，只设置事件监听
        if (keysToTry.length === 0) {
            if (config.debugMode) console.info('没有可用密钥，设置事件监听');
            setupEncryptedElements(encryptedElements);
            return;
        }
        
        // 尝试用各种密钥解密
        Array.from(encryptedElements).forEach(el => {
            if (state.decryptedElements.has(el)) return;
            
            let decrypted = false;
            for (const {key, silent} of keysToTry) {
                if (tryDecrypt(el, key, silent)) {
                    state.decryptedElements.add(el);
                    decrypted = true;
                    break;
                }
            }
            
            // 如果仍未解密，设置点击事件
            if (!decrypted && !el.classList.contains('decrypted')) {
                setupElementClickListener(el);
            }
        });
    }

    // 设置元素点击事件
    function setupEncryptedElements(elements) {
        Array.from(elements || document.querySelectorAll(`.${config.encryptedClass}:not(.decrypted)`)).forEach(el => {
            if (state.decryptedElements.has(el)) return;
            setupElementClickListener(el);
        });
    }

    // 设置单个元素的点击事件
    function setupElementClickListener(element) {
        // 初始样式设置
        element.style.cursor = 'pointer';
        
        // 确保只绑定一次事件
        element.removeEventListener('click', handleEncryptedElementClick);
        element.addEventListener('click', handleEncryptedElementClick);
    }

    // 尝试解密元素
    function tryDecrypt(element, key, silent = false) {
        if (config.debugMode) console.info('尝试解密元素');
        
        const cipher = element.getAttribute('data-cipher');
        if (!cipher) {
            if (!silent) showError(element, config.errorMessages.formatError);
            return false;
        }

        try {
            const decryptedStr = CryptoJS.AES.decrypt(decodeURIComponent(cipher), key).toString(CryptoJS.enc.Utf8);
            
            if (!decryptedStr) {
                if (!silent) {
                    config.attemptCount++;
                    showError(element, config.errorMessages.invalidKey);
                }
                return false;
            }

            // 解密成功
            if (config.debugMode) console.info('解密成功');
            
            // 创建文档片段处理HTML内容
            const fragment = document.createRange().createContextualFragment(decryptedStr);
            
            // 替换原始元素内容
            element.innerHTML = '';
            element.appendChild(fragment);
            
            element.classList.add('decrypted');
            element.style.cursor = 'auto';
            
            // 移除点击事件
            element.removeEventListener('click', handleEncryptedElementClick);
            
            return true;

        } catch (e) {
            if (!silent) {
                config.attemptCount++;
                showError(element, `${config.errorMessages.formatError} (${e.message})`);
            }
            if (config.debugMode) console.info('解码出错', e);
            return false;
        }
    }

    // 加密元素点击处理
    function handleEncryptedElementClick(event) {
        const element = event.currentTarget;
        
        if (config.attemptCount >= config.maxAttempts) {
            alert(config.errorMessages.maxAttempts);
            return;
        }

        // 创建自定义提示框
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.backgroundColor = 'rgba(0,0,0,0.5)';
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.zIndex = '10000'; // 确保在最上层
        container.id = 'aes-decrypt-dialog';

        const dialog = document.createElement('div');
        dialog.style.backgroundColor = 'white';
        dialog.style.padding = '25px';
        dialog.style.borderRadius = '10px';
        dialog.style.width = '350px';
        dialog.style.maxWidth = '90%';
        dialog.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';

        const title = document.createElement('h3');
        title.textContent = '🔒 输入解密密钥';
        title.style.marginTop = '0';
        title.style.color = '#333';
        title.style.textAlign = 'center';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = '请输入解密密钥...';
        input.style.width = '100%';
        input.style.padding = '12px';
        input.style.margin = '15px 0';
        input.style.border = '1px solid #ddd';
        input.style.borderRadius = '4px';
        input.style.fontSize = '16px';
        input.style.boxSizing = 'border-box';
        
        // 尝试预填密钥
        if (state.pageKey) input.value = state.pageKey;
        else if (state.sessionKey) input.value = state.sessionKey;
        else if (state.globalKey) input.value = state.globalKey;

        // 添加存储范围选择
        const scopeLabel = document.createElement('div');
        scopeLabel.textContent = '密钥存储范围:';
        scopeLabel.style.margin = '10px 0 8px';
        scopeLabel.style.fontWeight = '500';
        
        const scopeSelect = document.createElement('select');
        scopeSelect.style.width = '100%';
        scopeSelect.style.padding = '10px';
        scopeSelect.style.marginBottom = '15px';
        scopeSelect.style.border = '1px solid #ddd';
        scopeSelect.style.borderRadius = '4px';
        scopeSelect.style.fontSize = '15px';
        scopeSelect.style.backgroundColor = '#f9f9f9';
        
        config.scopeOptions.forEach((option, index) => {
            const opt = document.createElement('option');
            opt.value = index;
            opt.textContent = option;
            scopeSelect.appendChild(opt);
        });

        const buttonRow = document.createElement('div');
        buttonRow.style.display = 'flex';
        buttonRow.style.justifyContent = 'space-between';
        buttonRow.style.gap = '10px';

        const decryptBtn = document.createElement('button');
        decryptBtn.textContent = '🔓 解密';
        decryptBtn.style.padding = '10px 20px';
        decryptBtn.style.border = 'none';
        decryptBtn.style.borderRadius = '4px';
        decryptBtn.style.backgroundColor = '#4CAF50';
        decryptBtn.style.color = 'white';
        decryptBtn.style.cursor = 'pointer';
        decryptBtn.style.flex = '1';
        decryptBtn.style.fontSize = '16px';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = '取消';
        cancelBtn.style.padding = '10px 20px';
        cancelBtn.style.border = 'none';
        cancelBtn.style.borderRadius = '4px';
        cancelBtn.style.backgroundColor = '#f44336';
        cancelBtn.style.color = 'white';
        cancelBtn.style.cursor = 'pointer';
        cancelBtn.style.flex = '1';
        cancelBtn.style.fontSize = '16px';

        buttonRow.appendChild(cancelBtn);
        buttonRow.appendChild(decryptBtn);

        dialog.appendChild(title);
        dialog.appendChild(input);
        dialog.appendChild(scopeLabel);
        dialog.appendChild(scopeSelect);
        dialog.appendChild(buttonRow);
        container.appendChild(dialog);
        document.body.appendChild(container);

        // 聚焦输入框
        input.focus();

        // 事件处理
        const closeDialog = () => {
            const dialog = document.getElementById('aes-decrypt-dialog');
            if (dialog) document.body.removeChild(dialog);
        };

        cancelBtn.addEventListener('click', closeDialog);

        decryptBtn.addEventListener('click', () => {
            const key = input.value.trim();
            const scope = parseInt(scopeSelect.value);

            if (!key) {
                alert(config.errorMessages.emptyKey);
                return;
            }

            if (tryDecrypt(element, key)) {
                // 根据选择的范围保存密钥
                saveKeyByScope(key, scope);
                
                // 解密成功，添加到已解密集合
                state.decryptedElements.add(element);
                
                // 尝试解密所有其他元素
                checkAndDecryptElements();
            } else {
                // 解密失败，但保持对话框打开以便重试
                return;
            }

            closeDialog();
        });

        // 回车键支持
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                decryptBtn.click();
            }
        });

        // 点击背景关闭
        container.addEventListener('click', (e) => {
            if (e.target === container) {
                closeDialog();
            }
        });
    }

    // 根据范围保存密钥
    function saveKeyByScope(key, scope) {
        try {
            switch (scope) {
                case 0: // 全局保存
                    localStorage.setItem(`${config.storageKey}_global`, key);
                    state.globalKey = key;
                    if (config.debugMode) console.info('密钥已保存到本地存储（全局）');
                    break;
                case 1: // 仅本次会话
                    sessionStorage.setItem(`${config.storageKey}_session`, key);
                    state.sessionKey = key;
                    if (config.debugMode) console.info('密钥已保存到会话存储');
                    break;
                case 2: // 仅本页面
                    window[`${config.storageKey}_page`] = key;
                    state.pageKey = key;
                    if (config.debugMode) console.info('密钥已保存到页面内存');
                    break;
            }
        } catch (e) {
            console.warn(config.errorMessages.storageError, e);
        }
    }

    // 显示错误信息
    function showError(element, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'decrypt-error';
        errorElement.style.color = '#d32f2f';
        errorElement.style.marginTop = '8px';
        errorElement.style.fontSize = '14px';
        errorElement.style.padding = '5px';
        errorElement.style.borderRadius = '4px';
        errorElement.style.backgroundColor = '#ffebee';
        errorElement.textContent = message;

        // 移除旧的错误信息
        const oldError = element.querySelector('.decrypt-error');
        if (oldError) oldError.remove();

        element.appendChild(errorElement);

        // 5秒后淡出
        setTimeout(() => {
            errorElement.style.transition = 'opacity 0.5s ease-out';
            errorElement.style.opacity = '0';
            setTimeout(() => {
                if (errorElement.parentNode === element) {
                    element.removeChild(errorElement);
                }
            }, 500);
        }, 5000);
    }

    // 加载CryptoJS库并初始化
    if (typeof CryptoJS === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js';
        script.onload = function() {
            // 延迟初始化以确保所有内容加载完成
            setTimeout(initDecryption, 500);
        };
        script.onerror = () => {
            console.error('无法加载CryptoJS库，解密功能不可用');
        };
        document.head.appendChild(script);
    } else {
        // 已有CryptoJS，直接初始化
        setTimeout(initDecryption, 500);
    }
    
    // 确保在页面完全加载后执行
    window.addEventListener('load', function() {
        if (config.debugMode) console.info('页面完全加载，执行AES解密');
        if (typeof CryptoJS !== 'undefined') {
            initDecryption();
        }
    });
});