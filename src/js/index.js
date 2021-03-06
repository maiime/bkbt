

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
    this.init();
}

CreateInvite.prototype.init = function () {
    var _this = this;
    this.createCanvas();
    return this.createQRCode().then(res => {
        if (WX_DEBUG) {
            alert('createQRCode-success');
        }
        _this.QRCodeUrl = res;
        return _this.loadImg();
    }).then(res => {
        if (WX_DEBUG) {
            alert('loadImg-success');
        }
        _this.img1 = res[0];
        _this.img2 = res[1];
        _this.img3 = res[2];
        return _this.drawHeadImg(_this.img1);
    }).then(res => {
        if (WX_DEBUG) {
            alert('drawHeadImg-success');
        }
        return _this.drawTemplate(_this.img2);
    }).then(res => {
        if (WX_DEBUG) {
            alert('drawTemp-success');
        }
        return _this.drawNiceName();
    }).then(res => {
        if (WX_DEBUG) {
            alert('nickname-success');
        }
        return _this.drawRanking();
    }).then(res => {
        if (WX_DEBUG) {
            alert('ranking-success');
        }
        _this.drawQRCode(_this.img3);
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
    var mockData = [];
    for (let i = 0; i < 20; i++) {
        mockData.push(userinfo);
    }
    function App() {
        this.body = document.getElementsByTagName('body')[0];
        this.loading = this.$('loading');
        this.createInviteBtn = this.$('create-btn');
        this.inviteBox = this.$('inviteImgBox');
        this.img = this.inviteBox.querySelector('img');
        this.closeBtn = this.$('icon-close2');
        this.myHeadImg = this.$('myHeadImg');
        this.myInviteNumber = this.$('myInviteNumber');
        this.box = document.getElementById('list');
        this.inviteData = '';
        this.inviteStatus = '';
        this.init();
    }
    App.prototype.init = function () {
        this.setMyInfo();
        this.bindEvent();
        // mock
        this.renderRanking(mockData);
        this.x = new CreateInvite({
            nickname: userinfo.nickname,
            headImgUrl: userinfo.headimgurl,
            qrcodeLink: `${config.host}/api/wechat/entry/wx/${userinfo.openid}?url=${window.location.origin}${window.location.pathname}`,
            templateUrl: './img/template.png',
            ranking: `我是币快报第${10000}位内容挖矿社区代言人`
        });
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
        var x = this.x.toDataURL();
        setTimeout(function () {
            _this.inviteData = x;
            _this.inviteStatus = 'done';
            _this.img.src = x;
            _this.img.onload = function () {
                _this.showInvite();
            };
        }, 2000);
    }
    // 等待接口
    App.prototype.getRanking = function () {
        $Api.fetchRanking().then(res => {
            _this.renderRanking();
        })
    }
    App.prototype.renderRanking = function name(list) {
        var _this = this;
        list.forEach(item => {
            var li = document.createElement('li');
            li.className = 'flex-box';
            var headImg = document.createElement('img');
            headImg.className = 'head-img';
            headImg.src = item.headimgurl;
            var index = document.createElement('p');
            index.innerText = item.ranking || '0';
            if (item.ranking > 99) {
                index.className = 'lt99';
            }
            var div = document.createElement('div');
            var nickname = document.createElement('p');
            nickname.className = 'nickname';
            nickname.innerText = item.nickname;
            var inviteTime = document.createElement('p');
            inviteTime.className = 'invite';
            inviteTime.innerHTML = `邀请了<span>${item.tkerNum}</span>名好友加入币快报`;
            div.appendChild(nickname);
            div.appendChild(inviteTime);
            li.appendChild(headImg);
            li.appendChild(index);
            li.appendChild(div);
            this.box.appendChild(li);
        });
        this.totalHeight = this.box.scrollHeight;       
    }
    App.prototype.setMyInfo = function () {
        this.myHeadImg.src = userinfo.headimgurl;
        this.myInviteNumber.innerText = userinfo.tkerNum;
    }
    
    new App();
}