import utils from '@/utils/Utils.js'
import {
    head
} from 'request'
// 请求队列
var requestQueue = []
// 踢出标志
var kickOut = false

/**
 * 请求头
 */
function header(formData: false) {
    let header = {
        "content-type": formData ? 'multipart/form-data' : 'application/json;charset=utf-8'
    }
    return header
}

/**
 * 校验当前请求是否是重复请求
 */
function checkRepeatRequest(url, data) {
    // 清除队列中超过1S的请求数据
    let date = new Date()
    let nowTime = date.getTime()
    requestQueue = requestQueue.filter(item => nowTime - item.time < 1000)
    // 查询当前请求是否存在队列中
    let key = `${url}_${data==null?'':JSON.stringify(data)}`
    let repeatRequest = requestQueue.filter(item => item.key == key)
    if (repeatRequest.length > 0) {
        console.warn("已拦截重复请求：", url, data)
    } else {
        requestQueue.push({
            key: key,
            time: nowTime
        })
    }
    return repeatRequest.length > 0
}

function post(url, data, loading = true) {
    // 校验是否是重复请求

    if (loading) {
        uni.showLoading({
            title: "加载中"
        })
    }
    data = data == null ? {} : data

    return new Promise((resolve, reject) => {
        if (checkRepeatRequest(url, data)) reject()
        uni.request({
            header: header(),
            timeout: 15000,
            method: 'POST',
            url: getApp().globalData.serverUrl + url,
            data: data,
            success(res) {
                if (loading) uni.hideLoading()
                let code = res.data.code
                // TODO
            },
            fail(error) {
                console.log(error)
                if (loading) uni.hideLoading()
                reject(error)
            }
        })
    })
}

function uploadFile(url, file) {
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            header: header(true),
            url: url,
            filePath: file,
            name: "files",
            fileType: "image",
            success(res) {
                // TODO
            },
            fail(error) {
                console.log('文件上传失败', error)
                utils.toast("文件上传失败")
                uni.hideLoading()
                reject()
            }
        })
    })
}

async function uploadFiles(files) {
    uni.showLoading({
        title: "上传中",
        mask: true
    })
    // TODO
    let url = ''
    let data = []
    for (let index = 0; index < files.length; index++) {
        let response = await uploadFile(url, files[index])
        console.log("第" + (index + 1) + "个文件上传成功" + "\n", response)
        data.push(response)
    }
    uni.hideLoading()
    return data
}

module.exports = {
    post,
    uploadFiles
}
