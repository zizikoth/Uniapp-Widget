const isEmpty = function(data) {
    return data == null ||
        data === "" ||
        data === "null" ||
        data.length == 0 ||
        (data.constructor === Object && Reflect.ownKeys(data).length === 0)
}

const toast = function(message) {
    if (!isEmpty(message)) {
        uni.showToast({
            title: message.toString(),
            icon: "none"
        })
    }
}

const containStr = function(origin, target) {
    if (isEmpty(origin) || isEmpty(target)) return false
    return origin.split(',').indexOf(target.toString()) != -1
}

const delObjFields = function(obj, fields) {
    let copy = Object.assign({}, obj)
    fields.forEach(key => {
        delete copy[key]
    })
    return copy
}

module.exports = {
    isEmpty,
    toast,
    containStr,
    delObjFields
}
