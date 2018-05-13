function setupApp(arg) {
    const userinfo = arg[0].data;

    var mockData = [];
    for (let i = 0; i < 20; i++) {
        mockData.push(userinfo);
    }
    function App() {
        this.list = [];
        this.allLoaded = false;
        this.isLoading = false;
        this.box = document.getElementById('list');
        this.inviteFriend = document.getElementById('inviteFriend');
        this.totalHeight = 0;
        this.index = 1;
        this.init();
    }
    App.prototype.init = function () {
        this.fetchList();
        this.setInviteFriend();
    }
    App.prototype.fetchList = function (params) {
        var _this = this;
        if (this.allLoaded || this.isLoading) {
            return;
        }
        this.isLoading = true;
        $Api.friendList(params).then(res => {
            if (res.errCode === 0) {
                // 此处判断是否加载完成
                _this.list.concat(res.data.content);
                // _this.renderList(res.data.content);
                _this.renderList(mockData);
            } else {
                console.error(res);
            }
            _this.isLoading = false;
        });
    }
    App.prototype.renderList = function name(list) {
        var _this = this;
        list.forEach(item => {
            var li = document.createElement('li');
            li.className = 'flex-box';
            var headImg = document.createElement('img');
            headImg.className = 'head-img';
            headImg.src = item.headimgurl;
            var index = document.createElement('p');
            index.innerText = _this.index;
            if (_this.index > 99) {
                index.className = 'lt99';
            }
            _this.index ++;
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
        this.clientHeight = this.box.clientHeight;      
    }
    App.prototype.setInviteFriend = function () {
        if (!userinfo.ranking || userinfo.ranking > 888) {
            this.inviteFriend.innerHTML = `很遗憾，您未上榜，赶快<span>邀请朋友</span>加入吧！`;
        } else {
            this.inviteFriend.innerHTML = `恭喜您上榜，您的排名为<span>${userinfo.ranking}，邀请更多朋友加入</span>`;
        }
    }
    App.prototype.bindEvent = function () {
        var _this = this;
        this.box.onscroll = function (e) {
            var scrollTop = this.scrollTop;
            if (scrollTo + _this.clientHeight >= _this.totalHeight - 50) {
                _this.fetchList();
            }
        }
    }
    new App();
    console.log('ranking module is loaded');
}