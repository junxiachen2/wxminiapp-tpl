"use strict";

var _service = require("./utils/service");

App({
  onLaunch: function onLaunch() {
    (0, _service.initApp)(this);
  },

  globalData: {
    userInfo: null,
    showModal: false
  }
});