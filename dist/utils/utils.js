'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var utils = {};

utils.getStorage = function (key) {
    try {
        return wx.getStorageSync(key);
    } catch (e) {
        return utils.getStorage(key);
    }
};

utils.setStorage = function (key, value) {
    try {
        utils.setStorageSync(key, value);
    } catch (e) {
        return utils.setStorageSync(key, value);
    }
};

utils.wxModal = function (obj) {
    return new Promise(function (resolve, reject) {
        wx.showModal({
            title: obj.title || '提示',
            content: obj.content || '这是一个模态弹窗',
            success: function success(res) {
                if (res.confirm) {
                    resolve(true);
                } else if (res.cancel) {
                    reject();
                }
            },
            fail: function fail() {
                reject();
            }
        });
    });
};

exports.default = utils;