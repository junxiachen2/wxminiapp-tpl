'use strict';

var _util = require('../../utils/util');

var app = getApp();
Page({
    _getUserInfo: function _getUserInfo(e) {
        if (e.detail.rawData) {
            (0, _util.initApp)(app);
            wx.redirectTo({ url: '../index/index' });
        }
    }
});