module.exports = {
    stringify(data, encode = true) {
        if (data == null || data === "") return ''
        return encode ? encodeURIComponent(JSON.stringify(data)) : JSON.stringify(data)
    },
    parse(json, decode = true) {
        return decode ? JSON.parse(decodeURIComponent(json)) : JSON.parse(json)
    }
}
