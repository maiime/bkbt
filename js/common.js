
const config = window.getGlobalConfig();


(function () {
    function get(url, params) {
        var _url = url;
        var arr = url.match(/\{\w+\}/g) || [];
        arr.forEach(i => {
            var _i = i.replace(/\{|\}/g, '');
            if (params && (params[_i] || typeof params[_i] === 'number')) {
                _url = _url.replace(i, params[_i]);
            }
        });
        return axios.get(config.host + _url, { params }).then(res => {
            if (res.status !== 200 || res.data.errCode !== 0) {
                return Promise.reject(res);
            } else {
                return Promise.resolve(res.data);
            }
        });
    }
    function post(url, params) {
        var _url = url;
        var arr = url.match(/\{\w+\}/g) || [];
        arr.forEach(i => {
            var _i = i.replace(/\{|\}/g, '');
            if (params && (params[_i] || typeof params[_i] === 'number')) {
                _url = _url.replace(i, params[_i]);
            }
        });
        return axios.post(config.host + _url, params).then(res => {
            if (res.status !== 200 || res.data.errCode !== 0) {
                return Promise.reject(res);
            } else {
                return Promise.resolve(res.data);
            }
        });
    }
    var api = {
        sms: (params) => get('/api/{v1}/{client}/{channel}/sms/captcha/{mobile}', params),
        checkOpenId: () => get('/api/wechat/openId'),
        getSdkAuth: (params) => get('/api/wechat/jsapi', params),
        getWxUserInfo: () => get('/api/wechat/userInfo'),
        bindMobile: (params) => post('/api/wechat/userInfo/{mobile}', params),
        friendList: (params) => get('/api/wechat/friend/list', params)
    }
    window.$Api = api;
})(window);

function Loaded() {
    return Promise.all([
        $Api.getWxUserInfo(),
        $Api.getSdkAuth({
            url: window.location.href
        })
    ]);
}

window.onload = function () {
    FastClick.attach(document.body);
    $Api.checkOpenId().then(res => {
        // 已登录
        Loaded().then(res => {
            console.log(res[0]);
            console.log(res[1]);
            if (window.setupApp) {
                window.setupApp(res);
            }
            new WX(res[1].data, config.jsSkd, res[0].data);
        });
    }).catch(err => {
        // 未登录
        window.location.href = `${config.host}/api/wechat/entry/123123?key=influence&scope=user&url=${window.location.href}`;
    });
    // 全局下载App
    var downloadBtns = document.querySelectorAll('.downloadApp');
    downloadBtns.forEach(i => {
        i.onclick = function (e) {
            e.preventDefault();
            window.location.href = config.downloadAppLink || '';
        }
    });
};

function WX(config, events, userInfo) {
    var _this = this;
    this.userInfo = userInfo;
    this.events = events || {};
    this.jsApiList = Object.keys(this.events);
    this.option = Object.assign({}, config, { jsApiList: _this.jsApiList });
    this.init();
}

WX.prototype.init = function () {
    var _this = this;
    this.config();
}
WX.prototype.config = function () {
    var _this = this;
    wx.config(_this.option);
    wx.ready(function () {
        _this.registerEvent();        
    });
    wx.error(function (err) {
        console.log(err);
    });
}
WX.prototype.registerEvent = function () {
    var _this = this;
    this.jsApiList.forEach(item => {
        var option = Object.assign(_this.events[item], { link: `${config.shareUrl}?openId=${_this.userInfo.openid}`});
        wx[item](_this.events[item]);
    });
}
