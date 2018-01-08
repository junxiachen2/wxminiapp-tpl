"use strict";

var _util = require("./utils/util");

App({
  onLaunch: function onLaunch() {
    (0, _util.initApp)(this);
  },

  globalData: {
    userInfo: null,
    showModal: false
  }
});