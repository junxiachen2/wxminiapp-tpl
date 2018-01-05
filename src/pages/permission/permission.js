import {initApp} from '../../utils/util'

const app = getApp()
Page({
    _getUserInfo(e){
        //同意授权
        if (e.detail.rawData) {
            initApp(app)
            wx.redirectTo({url: '../index/index'})
        }
    }
})
