import {wxRequest} from '../../utils/service'

const app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
    },
    onLoad () {
        this._init()
        // 如果已经在onLaunch拿到数据就直接写入
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo
            })
        }
        // 如果已经在onLaunch还没拿到数据，就创建一个回调函数来获取
        else {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: app.globalData.userInfo
                })
            }
        }
    },
    _init(){
        //wxRequest({
        //    url: '',
        //    params: {}
        //}).then(res=> {
        //    console.log(res)
        //})

    }
})
