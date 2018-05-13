const mockData = [{
    "id": "5af7d8081a2d31476340dd54",
    "createdDate": 1526192136867,
    "subscribed": 0,
    "nickname": "马一一",
    "sex": 0,
    "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erhEuibfibTcn6y2W6EvqgwG3g3Y1ogicZJMiaiclHQ4q2Q0sYqcNFtxdEOfbicOWoRfeasdiaT6NOHLicnXA/132"
  },
  {
    "id": "5af7d7ec1a2d31476340dd4d",
    "createdDate": 1526192108333,
    "subscribed": 0,
    "nickname": "张珉",
    "sex": 0,
    "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/V0d3stmNLlrc7xYO19BSPewsiazViau8Rn23Dj2iblrpgCwBmgdlEUv2icvPWb51IsVAicEEnf2icxxFfBoaEpaCplqg/132"
  }];

function setupApp(arg) {
    const userinfo = arg[0];
    function App() {
        this.list = mockData;
        this.allLoaded = false;
        this.isLoading = false;
        this.box = document.getElementById('list');
        this.totalHeight = 0;
        this.init();
    }
    App.prototype.init = function () {
        this.fetchList();
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
            var headImg = document.createElement('img');
            headImg.className = 'head-img';
            headImg.src = item.headimgurl;
            var div = document.createElement('div');
            var nickname = document.createElement('p');
            nickname.className = 'nickname';
            nickname.innerText = item.nickname;
            var inviteTime = document.createElement('p');
            inviteTime.className = 'invite';
            inviteTime.innerText = _this.formatTime(item.createdDate);
            div.appendChild(nickname);
            div.appendChild(inviteTime);
            li.appendChild(headImg);
            li.appendChild(div);
            this.box.appendChild(li);
        });
        this.totalHeight = this.box.scrollHeight;       
    }
    App.prototype.formatTime = function (time) {
        var date = new Date(+time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        return `${year}-${b0(month)}-${b0(day)}-${b0(hour)}:${b0(min)} 加入`;
    }
    App.prototype.bindEvent = function () {
        var innerHeight = this.box.clientHeight;
        this.box.onscroll = function (e) {
            var scrollTop = this.scrollTop;
            if (scrollTo + innerHeight >= _this.totalHeight - 50) {
                _this.fetchList();
            }
        }
    }
    new App();
    console.log('my-invite module is loaded');
    function b0(num) {
        return num > 9 ? num : '0' + num;
    }
}