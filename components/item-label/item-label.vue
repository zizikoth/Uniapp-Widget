<template>
	<view class="label-box" @click="click" :class="{'label-line':line}">

		<view class="label-label" :style="{
			'background':labelColor,
			'margin-left':labelMargin+'rpx',
		}" />

		<text :style="{
			'font-size':titleFontSize+'rpx',
			'color':titleColor,
			'margin-left':'20rpx',
			'font-weight':'bold', }">{{title}}</text>

		<text :style="{
			'font-size':subTitleFontSize+'rpx',
			'color':subTitleColor,
			'margin-left':'15rpx',
		}">{{subTitle}}</text>

		<text :style="{
			'flex':1,
			'text-align':'end',
			'font-size':extraFontSize+'rpx',
			'color':extraColor,
			'margin-right':arrow?'0rpx':labelMargin+'rpx'
		}">{{extra}}</text>

		<view v-if="arrow" class="right-arrow-black" :style="{
			'border-color':arrowColor,
			'margin-right':labelMargin+'rpx'
		}" />

	</view>
</template>

<script>
	/**
	 * @description 条目控件
	 * 需要提前导入uni-badge https://ext.dcloud.net.cn/plugin?id=21
	 * 
	 * @property	{String}	labelColor			左侧边框
	 * @property	{String}	labelMargin			左边距
	 * @property	{String}	title				主标题
	 * @property	{String}	titleColor			主标题颜色
	 * @property	{String}	titleFontSize		主标题字体大小
	 * @property	{String}	subTitle			副标题
	 * @property	{String}	subTitleColor		副标题颜色
	 * @property	{String}	subTitleFontSize	副标题字体大小
	 * @property	{String}	extra				额外文字
	 * @property	{String}	extraColor			额外文字颜色
	 * @property	{String}	extraTitleFontSize	额外文字字体大小
	 * @property	{Boolean}	arrow				是否显示右侧箭头
	 * @property	{String}	arrowColor			右侧箭头颜色
	 * @property	{Boolean}	line				是否显示下边分割线
	 * 
	 * @event {Function()} click 条目点击
	 */
	export default {
		name: "item-label",
		props: {
			labelColor: {
				type: String,
				default: "#0076f6"
			},
			labelMargin: {
				type: String,
				default: "30"
			},
			title: {
				type: String,
				default: "请添加标题"
			},
			titleColor: {
				type: String,
				default: "#0076f6"
			},
			titleFontSize: {
				type: String,
				default: "30"
			},
			subTitle: {
				type: String,
				default: ""
			},
			subTitleColor: {
				type: String,
				default: "#999999"
			},
			subTitleFontSize: {
				type: String,
				default: '20'
			},
			extra: {
				type: String,
				default: ""
			},
			extraColor: {
				type: String,
				default: "#0076f6"
			},
			extraFontSize: {
				type: String,
				default: '26'
			},
			arrow: {
				type: Boolean,
				default: false
			},
			arrowColor: {
				type: String,
				default: "#0076f6"
			},
			line: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			click() {
				this.$emit("click")
			}
		}
	}
</script>

<style>
	.label-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 90rpx;
		background-color: #FFFFFF;
	}

	.label-label {
		width: 8rpx;
		height: 28rpx;
		border-radius: 2rpx;
	}

	.label-line {
		border-bottom: solid 2rpx #EEEEEE;
	}

	.right-arrow-black {
		margin-left: 15rpx;
		color: #333333;
		width: 15rpx;
		height: 14rpx;
		position: relative;
		border-bottom: 4rpx solid #333333;
		border-right: 4rpx solid #333333;
		transform: rotate(-45deg);
		border-radius: 4rpx;
	}
</style>
