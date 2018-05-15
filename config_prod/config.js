// 正式环境
;(function () {
    const config = {
        downloadAppLink: 'http//:www.baidu.com',
        host: 'https://api-dev.xiaoyunquegroup.com/articles',
        share: {
            title: '和我PK影响力，瓜分百万BKBT！',
            desc: '全球首款区块链资讯内容挖矿APP，成为创世挖矿居民，躺着赚钱!',
            imgUrl: 'http://m-dev.xiaoyunquegroup.com/asset/lib/img/logo@2x.png',
            shareUrl: 'https://gfbtc-dev.xiaoyunquegroup.com/index'
        }
    };
    window.getGlobalConfig = function () {
        return config || {};
    };
})(window);