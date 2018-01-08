'use strict';

var wxPromise = {};
var wxStorage = {};
wxPromise.checkSession = function () {
    return new Promise(function (resolve, reject) {
        wx.checkSession({
            success: function success() {
                console.log('已登录');
                resolve(true);
            },
            fail: function fail() {
                console.log('登录失效');
                resolve(false);
            }
        });
    });
};

wxPromise.login = function () {
    return new Promise(function (resolve, reject) {
        wx.login({
            success: function success(res) {
                console.log('登录成功', res);
                resolve(res);
            },
            fail: function fail() {
                resolve(false);
            }
        });
    });
};

wxPromise.openSetting = function () {
    return new Promise(function (resolve, reject) {
        wx.openSetting({
            success: function success(res) {
                console.log('用户授权情况', res);
                resolve(res);
            },
            fail: function fail() {
                reject();
            }
        });
    });
};

wxPromise.getAuthorize = function (setting) {
    return new Promise(function (resolve, reject) {
        wx.getSetting({
            success: function success(response) {
                if (response.authSetting[setting]) {
                    console.log('已有' + setting + '权限');
                    resolve(true);
                    return;
                }
                console.log('没有' + setting + '权限,正在授权');
                wx.authorize({
                    scope: setting,
                    success: function success() {
                        console.log('授权成功');
                        resolve(true);
                    },
                    fail: function fail() {
                        console.log('授权失败');
                        resolve(false);
                    }
                });
            },
            fail: function fail() {
                reject();
            }
        });
    });
};

wxPromise.getUserInfo = function () {
    return new Promise(function (resolve, reject) {
        wx.getUserInfo({
            withCredentials: true,
            success: function success(res) {
                console.log('获取用户信息成功', res);
                resolve(res);
            },
            fail: function fail(res) {
                console.log('获取用户信息失败');
                wxPromise.getUserInfo();
            }
        });
    });
};

wxPromise.request = function (requestHandler) {
    return new Promise(function (resolve, reject) {
        if (requestHandler.loading) {
            wx.showLoading({ title: "loading", mask: true });
        }
        wx.request({
            url: requestHandler.url,
            method: requestHandler.method || 'GET',
            data: requestHandler.params,
            success: function success(res) {
                resolve(res);
            },
            fail: function fail() {
                reject();
            },
            complete: function complete() {
                if (requestHandler.loading) {
                    wx.showLoading({ title: "loading", mask: true });
                }
            }
        });
    });
};

wxStorage.getStorage = function (key) {
    try {
        return wx.getStorageSync(key);
    } catch (e) {
        return asyncWx.getStorage(key);
    }
};

wxStorage.setStorage = function (key, value) {
    try {
        var version = wx.setStorageSync(key, value);
    } catch (e) {
        return wx.setStorageSync(key, value);
    }
};

var wxModal = function wxModal(obj) {
    return new Promise(function (resolve, reject) {
        wx.showModal({
            title: obj.title || '提示',
            content: obj.content || '这是一个模态弹窗',
            success: function success(res) {
                if (res.confirm) {
                    resolve(true);
                } else if (res.cancel) {
                    resolve(false);
                }
            },
            fail: function fail() {
                resolve(false);
            }
        });
    });
};

module.exports = {
    wxPromise: wxPromise, wxStorage: wxStorage, wxModal: wxModal
};