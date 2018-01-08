import regeneratorRuntime from "./runtime"
import {wxPromise,wxModal} from "./wechat"

const initApp = async (app) => {

    // 获取登录状态
    try {
        let session = await wxPromise.checkSession()
        if (!session) {
            await wxPromise.login()
        }

        // 获取用户信息授权
        let userInfoAuth = await wxPromise.getAuthorize('scope.userInfo')
        if (!userInfoAuth) {
            wx.redirectTo({
                url: '../permission/permission'
            })
        }

        //获取录音授权
        let recordAuth = await wxPromise.getAuthorize('scope.record')
        if (!recordAuth) {
            //同意重新授权录音,跳转到设置界面
            let recordAuthAgain = await wxModal({content: '需要授权录音才能抢红包哦~去授权~'})
            if (recordAuthAgain) {
                let auth = await wxPromise.openSetting()
                //防止用户在设置界面取消信息授权
                if (!auth.authSetting['scope.userInfo']) {
                    wx.redirectTo({
                        url: '../permission/permission'
                    })
                    return
                }
            }
        }

        // 获取用户信息
        let info = await wxPromise.getUserInfo()
        app.globalData.userInfo = info.userInfo
        if (app.userInfoReadyCallback) {
            app.userInfoReadyCallback(info)
        }
    } catch (err) {
        console.log(err)
    }

}

const wxRequest = async(requestHandler) => {
    return new Promise((resolve, reject) => {
        wxPromise.request(requestHandler)
            .then((res)=> {
                resolve(res)
            }, ()=> {
                wx.showModal({
                    title: '提示',
                    content: '网络好像出问题了,再试下吧~'
                })
            })
            .catch((err)=> {
                console.log(err)
            })
    })
}

module.exports = {
    initApp,
    wxRequest
}
