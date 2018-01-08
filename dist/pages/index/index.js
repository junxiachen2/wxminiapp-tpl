'use strict';

var _util = require('../../utils/util');

var app = getApp();
Page({
    data: {
        motto: 'Hello World',
        userInfo: {}
    },
    onLoad: function onLoad() {
        var _this = this;

        this._init();

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo
            });
        } else {
                app.userInfoReadyCallback = function (res) {
                    _this.setData({
                        userInfo: app.globalData.userInfo
                    });
                };
            }
    },
    _init: function _init() {}
});