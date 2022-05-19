<template>
	<view class="item-cell-box" :style="{'margin-bottom': marginBottom+'rpx','margin-top':marginTop+'rpx'}">
		<view v-if="justify" class="item-cell-title-box" :style="{width:width+'rpx'}">
			<text class="item-cell-title" :style="{color:titleColor}" v-for="(item,index) in title.split('')"
				:key="index">{{item}}</text>
		</view>
		<view v-if="!justify" class="item-cell-title" :style="{color:titleColor,width:width+'rpx'}">{{title}}</view>
		<text class="item-cell-title">：</text>
		<text :class="extra===''?'item-cell-content-flex1':'item-cell-content'" :style="{color:contentColor}">
			{{empty(content)?'无':content}}
		</text>
		<text v-if="extra!==''" class="item-cell-content" :style="{color:extraColor}" @click="extraClick">
			{{empty(extra)?'':extra}}
		</text>
	</view>
</template>

<script>
	/**
	 * @description 条目控件
	 * 
	 * @property 	{Boolean} 	justify 		标题是否平均分割 
	 * @property 	{String} 	width 			标题宽度 
	 * @property 	{String} 	marginTop 		上边距 
	 * @property 	{String} 	marginBottom 	下边距 
	 * @property 	{String} 	title 			标题 
	 * @property 	{String} 	titleColor 		标题颜色 
	 * @property 	{String} 	content 		内容 
	 * @property 	{String} 	contentColor 	内容颜色 
	 * @property 	{String} 	extra 			额外文字 
	 * @property 	{String} 	extraColor 		额外文字颜色 
	 * 
	 * @event	{Function()}	extraClick	额外内容的点击
	 */
	export default {
		name: "item-cell",
		props: {
			justify: {
				type: Boolean,
				default: true
			},
			width: {
				type: String,
				default: '150'
			},
			marginTop: {
				type: String,
				default: "0"
			},
			marginBottom: {
				type: String,
				default: "25"
			},
			title: {
				type: String,
				default: ''
			},
			titleColor: {
				type: String,
				default: '#333333'
			},
			content: {
				type: String,
				default: ''
			},
			contentColor: {
				type: String,
				default: '#666666'
			},
			extra: {
				type: String,
				default: ''
			},
			extraColor: {
				type: String,
				default: '#057AB5'
			}
		},
		methods: {
			empty(obj) {
				if (obj == null) {
					return true
				} else {
					let str = obj.toString()
					return str === '' || str.indexOf('undefined') != -1 || str.indexOf('null') != -1
				}
			},
			extraClick() {
				this.$emit('extraClick')
			}
		}
	};
</script>

<style>
	.item-cell-box {
		display: flex;
		width: 100%;
		flex-direction: row;
		align-items: baseline;
	}

	.item-cell-title-box {
		display: flex;
		line-height: 40rpx;
		text-align: center;
		align-items: center;
		justify-content: space-between;
	}

	.item-cell-title {
		display: flex;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.item-cell-content {
		display: flex;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.item-cell-content-flex1 {
		display: flex;
		flex: 1;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.item-cell-content {
		display: flex;
		font-size: 28rpx;
		line-height: 40rpx;
	}
</style>
