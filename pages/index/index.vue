<template>
	<view class="page">
		<view class="content">
			<page-holder topMargin="90" :show="show" :back="false" />

			<title-bar title="通用组件" :back="false" extraIcon="../../static/icon_setting.png"
				@extra="toast('title-bar extra()')" />

			<view class="input-item">
				<item-banner height="400" :banners="banners" bannerKey="url" titleKey="title" @click="changeImages" />
			</view>

			<view class="item">
				<item-grid :grid="grid.concat(grid)" @click="toast($event)" />
			</view>

			<view class="item">
				<item-tab :tabs="['tab1','tab2','tab3']" :divide="false" @change="toast($event)" />
				<item-tab :tabs="grid" tabKey="name" @change="toast($event)" />
				<item-tab :tabs="grid.concat(grid)" tabKey="name" :offset="[10,10]" @change="toast($event)" />
			</view>

			<item-label title="主标题" subTitle="(副标题)" extra="更多" arrow line @click="toast('item-label click()')" />
			<item-label title="主标题" />

			<view class="item">
				<item-icon-cell icon="../../static/logo.png" title="主标题" subTitle="副标题" :badge="1" line />
				<item-icon-cell icon="../../static/logo.png" title="主标题" dot @click="toast('item-icon-cell click()')" />
			</view>

			<view class="item input-item">
				<item-cell marginTop="20" marginBottom="20" title="主标题" :content="`长度(${grid.length})`"
					@click="toast('item-cell click()')" />
				<item-cell marginBottom="20" title="主标题主标题主标题" content="内容" :justify="false" />
				<item-cell marginBottom="20" title="主标题" content="内容" extra="（额外内容）"
					@extraClick="toast('item-cell extraClick()')" />
			</view>

			<view class="input-item">
				<item-input-view type="text" title="主标题" subTitle="最高100分" must hint="请输入数字" :value="number"
					@change="showNK" />
				<number-keyboard ref="nk" @change="bindNumber" />
				<item-input-view type="picker" title="主标题" hint="请选择内容" :range="grid" rangeKey="name" />
				<item-input-view type="date" title="主标题" hint="请选择日期" />
				<item-input-view type="input" title="主标题" hint="请输入内容" />
				<item-input-view type="textarea" title="主标题" hint="请输入内容" />
				<item-input-view type="radio" title="主标题" :range="grid" rangeKey="name" :radioIndex="0"
					@change="toast($event)" />
				<item-input-view type="check" title="主标题" :range="grid" rangeKey="name" :checkIndex="[0,1]"
					@change="toast($event)" />
				<item-input-view type="image" title="附件" />
			</view>

			<view class="input-item">
				<nine-grid-view mode="show" :images="images" height="230" :maxLength="9" />
			</view>

			<view class="list">
				<common-list :list="newsList" cover="cover" title="title" content="content" time="time"
					@click="toast($event)" />
			</view>

			<load-more :status="1" @load="toast('加载更多')" />
			<load-more :status="2" />
			<load-more :status="3" />
			<load-more :status="4" />

		</view>
	</view>
</template>

<script>
	import utils from '@/utils/Utils.js'
	export default {
		data() {
			return {
				show: true,
				number: '',
				grid: [{
					icon: '../../static/logo.png',
					name: '国内新闻',
					badge: 0
				}, {
					icon: '../../static/logo.png',
					name: '国际新闻',
					badge: 1
				}, {
					icon: '../../static/logo.png',
					name: '本地新闻',
					badge: 10
				}, {
					icon: '../../static/logo.png',
					name: '地市新闻',
					badge: 100
				}],
				images: [],
				banners: [{
					url: 'https://pic1.zhimg.com/80/v2-53d98d025e653bcdd18516c66b4e7ded_720w.jpg',
					title: '轮播图1'
				}, {
					url: 'https://pic2.zhimg.com/80/v2-d7bee94aabb2f2999f1d60523b724e63_720w.jpg',
					title: '轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图2'
				}, {
					url: 'https://pic1.zhimg.com/80/v2-1ed0f37177bd9735ab09dcdfde99c8f4_720w.jpg',
					title: '轮播图3'
				}, {
					url: 'https://pic4.zhimg.com/80/v2-903b496f4563959da9291bf0bc58bb46_720w.jpg',
					title: '轮播图4'
				}],
				newsList: [{
					cover: 'https://pic1.zhimg.com/80/v2-53d98d025e653bcdd18516c66b4e7ded_720w.jpg',
					title: '这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题',
					content: '这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容',
					time: '2020-09-09 19:09:09'
				}, {
					title: '这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题',
					content: '这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容',
					time: '2020-09-09 19:09:09'
				}, {
					cover: 'https://pic1.zhimg.com/80/v2-53d98d025e653bcdd18516c66b4e7ded_720w.jpg',
					title: '这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题',
					time: '2020-09-09 19:09:09'
				}]
			}
		},
		onLoad() {
			this.images = this.banners.map(item => item.url)
			uni.showLoading({
				title: '加载中'
			})
			setTimeout(() => {
				uni.hideLoading()
				this.show = false
			}, 1000)
		},
		methods: {
			toast(item) {
				console.log(item)
				utils.toast(item)
			},
			showNK() {
				this.$refs.nk.show(this.number)
			},
			bindNumber(e) {
				if (e <= 100) {
					this.number = e
				} else {
					this.toast("最高100分")
					this.$refs.nk.show(this.number)
				}
			},
			changeImages(e) {
				this.toast(e.url)
				this.banners.push(this.banners[0])
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}

	.page {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding-top: 90rpx;
	}

	.item {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 15rpx;
	}

	.input-item {
		width: calc(100% - 30rpx);
		margin: 15rpx;
	}

	.list {
		background-color: #FFFFFF;
		width: calc(100% - 50rpx);
		padding-left: 25rpx;
		padding-right: 25rpx;
	}
</style>
