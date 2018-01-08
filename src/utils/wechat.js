let wxPromise = {}
let wxStorage = {}
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
wxPromise.getUserInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            withCredentials: true,
            success(res){
                console.log('获取用户信息成功', res)
                resolve(res)
            },
            fail(res){
                console.log('获取用户信息失败')
                wxPromise.getUserInfo()
            }
        })
    })
}

wxPromise.request = (requestHandler)=> {
    return new Promise((resolve, reject) => {
        if (requestHandler.loading) {
            wx.showLoading({title: "loading", mask: true})
        }
        wx.request({
            url: requestHandler.url,
            method: requestHandler.method || 'GET',
            data: requestHandler.params,
            success(res) {
                resolve(res)
            },
            fail(){
                reject()
            },
            complete(){
                if (requestHandler.loading) {
                    wx.showLoading({title: "loading", mask: true})
                }
            }
        })
    })
}

wxStorage.getStorage = (key)=> {
    try {
        return wx.getStorageSync(key)
    }
    catch (e) {
        return asyncWx.getStorage(key)
    }
}

wxStorage.setStorage = (key, value)=> {
    try {
        let version = wx.setStorageSync(key, value)
    }
    catch (e) {
        return wx.setStorageSync(key, value)
    }
}

let wxModal = (obj)=> {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: obj.title || '提示',
            content: obj.content || '这是一个模态弹窗',
            success(res) {
                if (res.confirm) {
                    resolve(true)
                } else if (res.cancel) {
                    resolve(false)
                }
            },
            fail(){
                resolve(false)
            }
        })
    })
}

module.exports = {
    wxPromise, wxStorage, wxModal
}
