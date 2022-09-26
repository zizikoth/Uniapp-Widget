/**
 * 去除空格
 * type: 1-前后空格 2-前空格 3-后空格 4-所有空格
 */
const trim = function(str, type = 1) {
    switch (type) {
        case 1:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 2:
            return str.replace(/(^\s*)/g, "");
        case 3:
            return str.replace(/(\s*$)/g, "");
        case 4:
            return str.replace(/\s+/g, "");
        default:
            return str;
    }
}

const removeEmoji = function(text) {
    let emojiReg =
        /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
    return text.replace(emojiReg, '')
}

const isPhone = function(phone) {
    return phone && phone != '' && phone.length == 11 && phone.startsWith('1')
}

const checkPwdLevel = function(password) {
    var level = 0;
    if (password == null || password.length < 6) {
        return level
    }
    if (/[0-9]/.test(password)) {
        level++
    }
    if (/[a-z]/.test(password)) {
        level++
    }
    if (/[A-Z]/.test(password)) {
        level++
    }
    if (/[\.|-|_]/.test(password)) {
        level++
    }
    return level;
}

module.exports = {
    trim,
    removeEmoji,
    isPhone,
    checkPwdLevel
}
