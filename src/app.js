import { initApp } from "./utils/service"

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