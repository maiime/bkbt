;(function () {
    const config = {
        downloadAppLink: 'http://m-dev.xiaoyunquegroup.com/#/traffic/activity',
        host: 'https://api-dev.xiaoyunquegroup.com/articles',
        shareUrl: 'https://gfbtc-dev.xiaoyunquegroup.com/index',
        jsSkd: {
            onMenuShareAppMessage: {
                title: '和我PK影响力，瓜分百万BKBT！',
                desc: '全球首款区块链资讯内容挖矿APP，成为创世挖矿居民，躺着赚钱!',
                imgUrl: 'http://mat1.gtimg.com/www/qq2018/imgs/qq_logo_2018.png',
                success: function () {
                    console.log('success');
                }
            },
            onMenuShareTimeline: {
                title: '和我PK影响力，瓜分百万BKBT！',
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