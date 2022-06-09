const isEmpty = function(data) {
    return data == null || data === "" || data == "null" || data.length == 0
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

const deepClone = function(obj) {
    var o;
    if (typeof obj == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(deepClone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = deepClone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
}

const buildQuery = function(params) {
    let temp = ""
    for (key in params) {
        let value = params[key]
        if (typeof(value) == 'string') value = value.replace(/%/g, '%25')
        temp = temp === "" ? `?${key}=${value}` : `${temp}&${key}=${value}`
    }
    return temp
}

module.exports = {
    isEmpty,
    toast,
    containStr,
    deepClone,
    buildQuery
}
