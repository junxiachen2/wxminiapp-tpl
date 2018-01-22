let wxPromise = {}
wxPromise.checkSession = () => {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success(){
                console.log('已登录')
                resolve(true)
            },
            fail(){
                console.log('登录失效')
                resolve(false)
            }
        })
    })
}

wxPromise.login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res){
                console.log('登录成功', res)
                resolve(res)
            },
            fail(){
                resolve(false)
            }
        })
    })
}

//调起客户端小程序设置界面
wxPromise.openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success(res){
                console.log('用户授权情况', res)
                resolve(res)
            },
            fail(){
                reject()
            }
        })
    })
}

//获取用户的当前授权信息,若无权限则请求授权
wxPromise.getAuthorize = (setting) => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(response){
                if (response.authSetting[setting]) {
                    console.log('已有' + setting + '权限')
                    resolve(true)
                    return
                }
                console.log('没有' + setting + '权限,正在授权')
                wx.authorize({
                    scope: setting,
                    success(){
                        console.log('授权成功')
                        resolve(true)
                    },
                    fail(){
                        console.log('授权失败')
                        resolve(false)
                    }
                })
            },
            fail(){
                reject()
            }
        })
    })
}

// 用户授权后获取用户信息
wxPromise.getUserInfo = (withCredentials) => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            withCredentials: withCredentials || true,
            success(res){
                console.log('获取用户信息成功', res)
                resolve(res)
            },
            fail(res){
                console.log('获取用户信息失败')
                wxPromise.getUserInfo(withCredentials)
            }
        })
    })
}

/**
 * wx请求函数
 * @param requestHandler
 * requestHandler是个对象,其中包括:
 *      url,
 *      method,
 *      params,
 *      header
 *
 * @returns {Promise}
 */
wxPromise.request = (requestHandler)=> {
    return new Promise((resolve, reject) => {
        if (requestHandler.loading) {
            wx.showLoading({title: "加载中", mask: true})
        }
        wx.request({
            url: requestHandler.url,
            method: requestHandler.method || 'GET',
            header: requestHandler.header || {},
            data: requestHandler.params,
            success(res) {
                resolve(res)
            },
            fail(){
                reject()
            },
            complete(){
                if (requestHandler.loading) {
                    wx.hideLoading()
                }
            }
        })
    })
}

export default wxPromise
