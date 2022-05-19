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

module.exports = {
	isEmpty,
	toast
}
