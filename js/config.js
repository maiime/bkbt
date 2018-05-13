;(function () {
    const config = {
        downloadAppLink: 'http://www.baidu.com',
        host: 'http://api-dev.xiaoyunquegroup.com/articles'
    };
    window.getGlobalConfig = function () {
        return config || {};
    };
})(window);