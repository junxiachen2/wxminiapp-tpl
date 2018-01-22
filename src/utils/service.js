import regeneratorRuntime from "./runtime"
import wxPromise from "./wechat"

const initApp = async(app) => {

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
            return
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
                wxPromise.showModal({
                    title: '提示',
                    content: '网络好像出问题了,再试下吧~'
                })
            })
            .catch((err)=> {
                console.log(err)
            })
    })
}

export {initApp, wxRequest}
