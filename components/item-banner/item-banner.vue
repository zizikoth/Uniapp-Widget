<template>
	<swiper class="banner-swiper" :style="{'height':height+'rpx'}" circular autoplay :current="position"
		@change="change" v-if="list.length>0">
		<swiper-item v-for="(item,index) in list" :key="index">
			<view class="banner-swiper-item" @click="click(item)">
				<image class="banner-image" mode="aspectFill" :src="bannerKey?item[bannerKey]:item" />
				<text class="banner-title" v-if="titleKey">{{item[titleKey]}}</text>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	/**
	 * @description 轮播图
	 * 
	 * @property	{Array}		banners		轮播图列表 
	 * @property 	{String} 	bannerKey 	图片取值 
	 * @property 	{String} 	titleKey 	标题取值 
	 * @property 	{String} 	bannerKey 	图片取值 
	 * @property 	{String} 	height 		轮播图高度 
	 * 
	 * @event	{Function(item)}	click 	轮播图点击
	 */
	export default {
		name: "banners",
		props: {
			banners: {
				type: Array,
				default: () => []
			},
			bannerKey: {
				type: String,
				default: ""
			},
			titleKey: {
				type: String,
				default: ""
			},
			height: {
				type: String,
				default: '380'
			}
		},
		watch: {
			banners: {
				handler(newBanner) {
					this.list = newBanner
					this.position = 0
				},
				immediate: true
			}
		},
		data() {
			return {
				list: [],
				position: 0
			}
		},
		methods: {
			change(e) {
				this.position = e.detail.current
			},
			click(item) {
				this.$emit('click', item)
			}
		}
	}
</script>

<style>
	.banner-swiper {
		display: flex;
		width: 100%;
	}

	.banner-swiper-item {
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
	}

	.banner-image {
		display: flex;
		width: 100%;
		height: 100%;
		border-radius: 15rpx;
	}

	.banner-title {
		position: absolute;
		left: 0rpx;
		bottom: 0rpx;
		width: calc(100% - 40rpx);
		padding-left: 20rpx;
		padding-right: 20rpx;
		border-bottom-left-radius: 15rpx;
		border-bottom-right-radius: 15rpx;
		height: 70rpx;
		line-height: 70rpx;
		background-color: rgba(2, 2, 2, 0.6);
		color: #FFFFFF;
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		align-items: center;
	}
</style>
