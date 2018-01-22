"use strict";

var _runtime = require("./runtime");

var _runtime2 = _interopRequireDefault(_runtime);

var _wechat = require("./wechat");

var _wechat2 = _interopRequireDefault(_wechat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initApp = async function initApp(app) {
    try {
        var session = await _wechat2.default.checkSession();
        if (!session) {
            await _wechat2.default.login();
        }

        var userInfoAuth = await _wechat2.default.getAuthorize('scope.userInfo');
        if (!userInfoAuth) {
            wx.redirectTo({
                url: '../permission/permission'
            });
            return;
        }

        var info = await _wechat2.default.getUserInfo();
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
        _wechat2.default.request(requestHandler).then(function (res) {
            resolve(res);
        }, function () {
            _wechat2.default.showModal({
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