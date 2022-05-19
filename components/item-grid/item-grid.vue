<template>
	<view class="item-grid-box">
		<view class="item-grid-item-box" v-for="(item,index) in grid" :key='index' @click="click(item)">
			<uni-badge size="small" absolute="rightTop" type="error" :text="item.badge">
				<view class="item-grid-item">
					<image class="item-grid-icon" :src="item.icon" />
					<text class="item-grid-title">{{item.name}}</text>
				</view>
			</uni-badge>
		</view>
	</view>
</template>

<script>
	/**
	 * @description 模块宫格控件
	 * 需要提前导入uni-badge https://ext.dcloud.net.cn/plugin?id=21
	 * 
	 * @property	{Array}		grid	宫格列表		
	 * [{icon:'../../static/icon_module.png',name:'模块名称',badge:99}]
	 * 
	 * @event {Function(item)} click 模块点击 
	 */
	export default {
		name: "item-grid",
		props: {
			grid: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			click(item) {
				this.$emit('click', item)
			}
		}
	}
</script>

<style>
	.item-grid-box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
	}



	.item-grid-item-box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 180rpx;
		width: 25%;
	}

	.item-grid-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.item-grid-icon {
		width: 90rpx;
		height: 90rpx;
	}

	.item-grid-title {
		font-size: 30rpx;
		color: #333;
		margin-top: 20rpx;
		width: 100%;
		text-align: center;
	}
</style>
