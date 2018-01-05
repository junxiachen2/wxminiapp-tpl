import { initApp } from "./utils/util"

//app.js
App({
  onLaunch() {
    initApp(this)
  },
  globalData: {
    userInfo: null,
    showModal: false
  }
})