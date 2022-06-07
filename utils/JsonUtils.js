import utils from "./Utils.js"
module.exports = {
	stringify: (data) => {
		if (utils.isEmpty(data)) return ''
		return encodeURIComponent(JSON.stringify(data).replace(/%/g, '%25'));
	},
	parse: (json) => {
		return JSON.parse(decodeURIComponent(json))
	}
}
