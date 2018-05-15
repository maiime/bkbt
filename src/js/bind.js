function setupApp(arg) {
    function App() {
        this.getSmsBtn = this.$('getSmsBtn');
        this.phoneInput = this.$('phone');
        this.smsInput = this.$('code');
        this.bindBtn = this.$('bindBtn');
        this.timerIsRun = false;
        this.phoneIsWrong = true;
        this.smsIsWrong = true;
        this.sendTime = 0;
        this.number = '';
        this.smsCode = '';
        this.timer = null;
        this.init();
    }
    
    App.prototype.init = function (id) {
        this.bindEvent();
    }    
    App.prototype.bindEvent = function (id) {
        var _this = this;
        // 获取验证码
        this.getSmsBtn.onclick = function () {
            if (_this.timerIsRun) {
                alert('请勿频繁发送');
                return;
            }
            if (_this.phoneIsWrong) {
                alert('手机号填写错误');
                return;
            }
            _this.getSms(_this.number).then(_ => {
                _this.setTimer();
            });
        };
        // 手机号验证
        this.phoneInput.onkeyup = function (e) {
            var _input = this;
            var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            _this.phoneIsWrong = reg.test(_input.value) ? false : true;
            _this.number = _input.value;
            _this.bindBtnVisible();
        };
        // 验证码
        this.smsInput.onkeyup = function (e) {
            var _input = this;
            _this.smsIsWrong = _input.value == 0 ? true : false;
            _this.smsCode = _input.value;
            console.log(_this.smsIsWrong);
            _this.bindBtnVisible();
        };
        this.bindBtn.onclick = function () {
            if (_this.phoneIsWrong || _this.smsIsWrong) {
                alert('请填写正确的验证码');
            } else {
                _this.bindMobile();
            }
        };
    }
    App.prototype.$ = function (id) {
        return document.getElementById(id);
    }
    App.prototype.getSms = function (phoneNumber) {
        return $Api.sms({
            mobile: phoneNumber
        });
    }
    App.prototype.setTimer = function () {
        var _this = this;
        this.sendTime = + new Date();
        this.timerIsRun = true;
        this.getSmsBtn.className = 'active';
        this.timer = setInterval(function () {
            var time = (+new Date() - _this.sendTime) / 1000
            if (time >= 60) {
                _this.cancelTimer();
            } else {
                this.getSmsBtn.innerText = `已发送${parseInt(60 - time)}秒`;
            }
        }, 1000);
    }
    App.prototype.cancelTimer = function () {
        clearInterval(this.timer);
        this.getSmsBtn.className = '';
        this.getSmsBtn.innerText = '发送验证码';
        this.timerIsRun = false;
    }
    App.prototype.bindBtnVisible = function () {
        if (this.phoneIsWrong || this.smsIsWrong) {
            this.bindBtn.className = 'btn btn-large disabled';
        } else {
            this.bindBtn.className = 'btn btn-large';
        }
    }
    App.prototype.bindMobile = function () {
        var _this = this;
        $Api.bindMobile({
            mobile: _this.phoneNumber,
            sms: _this.smsCode
        }).then(res => {
            if (res.errCode === 0) {
                window.location.href = window.location.href.replace('bind', 'bind-success');
            } else {
                console.error(res);
            }
        })
    }
    new App();

}