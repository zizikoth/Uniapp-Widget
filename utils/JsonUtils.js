module.exports = {
    stringify(data, encode = false) {
        if (data == null || data === "") return ''
        return encode ? encodeURIComponent(JSON.stringify(data)) : JSON.stringify(data)
    },
    parse(json, decode = false) {
        return decode ? JSON.parse(decodeURIComponent(json)) : JSON.parse(json)
    }
}
