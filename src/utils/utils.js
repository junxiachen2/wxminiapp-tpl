/**
 * Created by junxiachen on 2018/1/22.
 */

let utils = {}

utils.getStorage = (key)=> {
    try {
        return wx.getStorageSync(key)
    }
    catch (e) {
        return utils.getStorage(key)
    }
}

utils.setStorage = (key, value)=> {
    try {
        utils.setStorageSync(key, value)
    }
    catch (e) {
        return utils.setStorageSync(key, value)
    }
}

utils.wxModal = (obj)=> {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: obj.title || '提示',
            content: obj.content || '这是一个模态弹窗',
            success(res) {
                if (res.confirm) {
                    resolve(true)
                } else if (res.cancel) {
                    reject()
                }
            },
            fail(){
                reject()
            }
        })
    })
}

export default utils