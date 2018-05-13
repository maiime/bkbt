

function CreateInvite(params) {
    this.nickname = params.nickname;
    this.headImg = params.headImgUrl;
    this.ranking = params.ranking;
    this.qrcodeLink = params.qrcodeLink;
    this.templateUrl = params.templateUrl;
    this.headImgX = 78;
    this.headImgY = 96;
    this.headImgWidth = 106;
    this.headImgHeight = 106;
    return this.init();
}

CreateInvite.prototype.init = function () {
    var _this = this;
    this.createCanvas();
    return this.createQRCode().then(res => {
        _this.QRCodeUrl = res;
        return _this.loadImg();
    }).then(res => {
        _this.img1 = res[0];
        _this.img2 = res[1];
        _this.img3 = res[2];
        return _this.drawHeadImg(_this.img1);
    }).then(res => {
        return _this.drawTemplate(_this.img2);
    }).then(res => {
        return _this.drawNiceName();
    }).then(res => {
        return _this.drawRanking();
    }).then(res => {
        return _this.drawQRCode(_this.img3);
    }).then(res => {
        return _this.toDataURL();
    });
}
CreateInvite.prototype.createCanvas = function () {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 750;
    this.canvas.height = 1334;
    this.ctx = this.canvas.getContext('2d');
}
CreateInvite.prototype.loadImg = function () {
    var _this = this;
    return Promise.all([
        imgPrestrain(_this.headImg),
        imgPrestrain(_this.templateUrl),
        imgPrestrain(_this.QRCodeUrl)
    ]);
}
CreateInvite.prototype.createQRCode = function () {
    var _this = this;
    return QRCode.toDataURL(_this.qrcodeLink);
}
CreateInvite.prototype.drawTemplate = function (img) {
	this.ctx.globalCompositeOperation = "destination-over";
    this.ctx.drawImage(img, 0, 0);
    this.ctx.globalCompositeOperation = "source-over";
    return Promise.resolve();
}
CreateInvite.prototype.drawHeadImg = function (img) {
    var _this = this;
    this.ctx.drawImage(img, _this.headImgX, _this.headImgY, _this.headImgWidth, _this.headImgHeight);   
    this.ctx.globalCompositeOperation = "destination-in";
    this.ctx.arc(131, 149, 53, 0, 2 * Math.PI, false);
    this.ctx.fill();
    return Promise.resolve();
}
CreateInvite.prototype.drawNiceName = function () {
    var _this = this;
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '34px Arial';
    this.ctx.fillText(_this.nickname, 224, 165);
    return Promise.resolve();
}
CreateInvite.prototype.drawRanking = function () {
    var _this = this;
    this.ctx.fillStyle = '#fff3de';
    this.ctx.textAlign = 'center';
    this.ctx.font = '30px Arial';
    this.ctx.fillText(_this.ranking, 375, 310);
    return Promise.resolve();
}
CreateInvite.prototype.drawQRCode = function (img) {
    var _this = this;
    this.ctx.drawImage(img, 300, 829, 150, 150);
    return Promise.resolve();
}
CreateInvite.prototype.toDataURL = function () {
    var _this = this;
    return this.canvas.toDataURL('image/png');
}


function imgPrestrain(url) {
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.src = url;
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function () {
            reject();
        };
    });
}
function setupApp (arg) {
    const userinfo = arg[0].data;
    function App() {
        this.body = document.getElementsByTagName('body')[0];
        this.loading = this.$('loading');
        this.createInviteBtn = this.$('create-btn');
        this.inviteBox = this.$('inviteImgBox');
        this.img = this.inviteBox.querySelector('img');
        this.closeBtn = this.$('icon-close');
        this.myHeadImg = this.$('myHeadImg');
        this.myInviteNumber = this.$('myInviteNumber');
        this.inviteData = '';
        this.inviteStatus = '';
        this.init();
    }
    App.prototype.init = function () {
        this.setMyInfo();
        this.bindEvent();
    }

    App.prototype.$ = function (className) {
        return document.getElementsByClassName(className)[0];
    }
    App.prototype.fetchMy = function () {
        return Promise.resolve();
    }
    App.prototype.fetchRanking = function () {
        return Promise.resolve();
    }
    App.prototype.showLoading = function () {
        this.loading.className = 'loading active';
        this.body.style.overflow = 'hidden';
    }
    App.prototype.hideLoading = function () {
        this.loading.className = 'loading';
        this.body.style.overflow = 'auto';
    }
    App.prototype.bindEvent = function () {
        var _this = this;
        this.createInviteBtn.onclick = function () {
            _this.createInvite();
        };
        this.closeBtn.onclick = function () {
            _this.closeInvite();
        }
    }
    App.prototype.showInvite = function () {
        var _this = this;
        this.hideLoading();
        this.inviteBox.style.display = 'block';
        this.body.style.overflow = 'hidden';
    }
    App.prototype.closeInvite = function () {
        var _this = this;
        this.inviteBox.style.display = 'none';
        this.body.style.overflow = 'auto';
    }
    App.prototype.createInvite = function () {
        var _this = this;
        this.showLoading();
        if (this.inviteStatus === 'done') {
            this.showInvite();
            return;
        }
        new CreateInvite({
            nickname: userinfo.nickname,
            headImgUrl: userinfo.headimgurl,
            qrcodeLink: `${config.host}/api/wechat/entry/wx/${userinfo.openid}?url=${window.location.origin}${window.location.pathname}`,
            templateUrl: './img/template.png',
            ranking: `我是币快报第${10000}名内容挖矿社区代言人`
        }).then(res => {
            this.inviteData = res;
            this.inviteStatus = 'done';
            this.img.src = res;
            this.img.onload = function () {
                _this.showInvite();
            };
        });
        
    }
    App.prototype.setMyInfo = function () {
        this.myHeadImg.src = userinfo.headimgurl;
        this.myInviteNumber.innerText = userinfo.tkerNum;
    }
    
    new App();
}