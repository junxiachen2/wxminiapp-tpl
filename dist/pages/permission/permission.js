'use strict';

var _service = require('../../utils/service');

var app = getApp();
Page({
    _getUserInfo: function _getUserInfo(e) {
        if (e.detail.rawData) {
            (0, _service.initApp)(app);
            wx.redirectTo({ url: '../index/index' });
        }
    }
});