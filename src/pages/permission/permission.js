import {initApp} from '../../utils/service'

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
