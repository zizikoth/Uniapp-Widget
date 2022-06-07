function formatNum(num) {
	return num < 10 ? "0" + num : "" + num
}

function nowDate() {
	var date = new Date();
	var year = formatNum(date.getFullYear());
	var month = formatNum(date.getMonth() + 1);
	var day = formatNum(date.getDate());

	var hours = formatNum(date.getHours());
	var minutes = formatNum(date.getMinutes());
	var seconds = formatNum(date.getSeconds());

	let timestamp = date.getTime()

	let Y_CHN = year + "年"
	let YM = year + "-" + month
	let YM_CHN = year + "年" + month + "月"
	let YMD = year + "-" + month + "-" + day
	let YMD_CHN = year + "年" + month + "月" + day + "日"
	let YMDHM = year + "-" + month + "-" + day + " " + hours + ":" + minutes
	let YMDHM_CHN = year + "年" + month + "月" + day + "日 " + hours + "时" + minutes + "分"
	let YMDHMS = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
	let YMDHMS_CHN = year + "年" + month + "月" + day + "日 " + hours + "时" + minutes + "分" + seconds + "秒"
	let MD = month + "-" + day
	let MD_CHN = month + "月" + day + "日"
	let MDHM = month + "-" + day + " " + hours + ":" + minutes
	let MDHM_CHN = month + "月" + day + "日 " + hours + "时" + minutes + "分"
	let HM = hours + ":" + minutes
	let HM_CHN = hours + "时" + minutes + "分"

	return {
		year: year,
		month: month,
		day: day,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
		Y_CHN: Y_CHN,
		YM: YM,
		YM_CHN: YM_CHN,
		YMD: YMD,
		YMD_CHN: YMD_CHN,
		YMDHM: YMDHM,
		YMDHM_CHN: YMDHM_CHN,
		YMDHMS: YMDHMS,
		YMDHMS_CHN: YMDHMS_CHN,
		MD: MD,
		MD_CHN: MD_CHN,
		MDHM: MDHM,
		MDHM_CHN: MDHM_CHN,
		HM: HM,
		HM_CHN: HM_CHN,
		timestamp: timestamp
	}
}

function string2Timestamp(date) {
	let time = new Date(date)
	return time.getTime()
}

function timestamp2String(timestamp) {
	let time = new Date(timestamp)
	let year = time.getFullYear()
	let month = time.getMonth() + 1
	let day = time.getDay()
	let hour = time.getHours()
	let min = time.getMinutes()
	let sec = time.getSeconds()
	return `${year}-${formatNum(month)}-${formatNum(day)} ${formatNum(hour)}:${formatNum(min)}:${formatNum(sec)}`
}

function friendlyDesc(date) {
	let beginTime = string2Timestamp(date)
	let endTime = new Date().getTime()
	var secondNum = parseInt((endTime - beginTime) / 1000); //计算时间戳差值      
	if (secondNum < 60) {
		return "刚刚";
	} else if (secondNum >= 60 && secondNum < 3600) {
		var nTime = parseInt(secondNum / 60);
		return nTime + '分钟前';
	} else if (secondNum >= 3600 && secondNum < 3600 * 24) {
		var nTime = parseInt(secondNum / 3600);
		return nTime + '小时前';
	} else if (secondNum >= 3600 * 24 && secondNum < 3600 * 24 * 100) {
		var nTime = parseInt(secondNum / 86400);
		return nTime + '天前';
	} else {
		return "很久以前"
	}
}

module.exports = {
	nowDate,
	string2Timestamp,
	timestamp2String,
	friendlyDesc
}
