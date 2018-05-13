;(function () {
    const config = {
        downloadAppLink: 'http://www.baidu.com',
        host: 'http://api-dev.xiaoyunquegroup.com/articles',
        jsSkd: {
            onMenuShareAppMessage: {
                title: '我是title',
                desc: '我是描述',
                link: 'http://www.baidu.com',
                imgUrl: 'http://mat1.gtimg.com/www/qq2018/imgs/qq_logo_2018.png',
                success: function () {}
            },
            onMenuShareTimeline: {
                title: '',
                link: '',
                imgUrl: '',
                success: function () {}
            }
        }
    };
    window.getGlobalConfig = function () {
        return config || {};
    };
})(window);