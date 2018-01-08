"use strict";

var _runtime = require("./runtime");

var _runtime2 = _interopRequireDefault(_runtime);

var _wechat = require("./wechat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initApp = async function initApp(app) {
    try {
        var session = await _wechat.wxPromise.checkSession();
        if (!session) {
            await _wechat.wxPromise.login();
        }

        var userInfoAuth = await _wechat.wxPromise.getAuthorize('scope.userInfo');
        if (!userInfoAuth) {
            wx.redirectTo({
                url: '../permission/permission'
            });
            return;
        }

        var recordAuth = await _wechat.wxPromise.getAuthorize('scope.record');
        if (!recordAuth) {
            var recordAuthAgain = await (0, _wechat.wxModal)({ content: '需要授权录音才能抢红包哦~去授权~' });
            if (recordAuthAgain) {
                var auth = await _wechat.wxPromise.openSetting();

                if (!auth.authSetting['scope.userInfo']) {
                    wx.redirectTo({
                        url: '../permission/permission'
                    });
                    return;
                }
            }
        }

        var info = await _wechat.wxPromise.getUserInfo();
        app.globalData.userInfo = info.userInfo;
        if (app.userInfoReadyCallback) {
            app.userInfoReadyCallback(info);
        }
    } catch (err) {
        console.log(err);
    }
};

var wxRequest = async function wxRequest(requestHandler) {
    return new Promise(function (resolve, reject) {
        _wechat.wxPromise.request(requestHandler).then(function (res) {
            resolve(res);
        }, function () {
            wx.showModal({
                title: '提示',
                content: '网络好像出问题了,再试下吧~'
            });
        }).catch(function (err) {
            console.log(err);
        });
    });
};

module.exports = {
    initApp: initApp,
    wxRequest: wxRequest
};