const chooseImage = function(count) {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count,
			success(res) {
				resolve(res)
			},
			fail() {
				reject()
			}
		})
	})
}

const previewImage = function(current, images) {
	uni.previewImage({
		current: current,
		urls: images
	})
}

const isHttpImage = function(url) {
	let isDDLocalImage = url.startsWith("https://resource/")
	let isStartWithHttp = url.startsWith("http://") || url.startsWith("https://")
	return !isDDLocalImage && isStartWithHttp
}

module.exports = {
	chooseImage,
	previewImage,
	isHttpImage
}
