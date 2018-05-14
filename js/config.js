;(function () {
    const config = {
        downloadAppLink: 'http://www.baidu.com',
        host: 'https://api-dev.xiaoyunquegroup.com/articles',
        jsSkd: {
            onMenuShareAppMessage: {
                title: '分享给朋友',
                desc: '我是描述',
                link: 'http://www.baidu.com',
                imgUrl: 'http://mat1.gtimg.com/www/qq2018/imgs/qq_logo_2018.png',
                success: function () {
                    console.log('success');
                }
            },
            onMenuShareTimeline: {
                title: '分享朋友圈',
                link: 'http://www.baidu.com',
                imgUrl: 'http://mat1.gtimg.com/www/qq2018/imgs/qq_logo_2018.png',
                success: function () {
                    console.log('success');
                }
            }
        }
    };
    window.getGlobalConfig = function () {
        return config || {};
    };
})(window);