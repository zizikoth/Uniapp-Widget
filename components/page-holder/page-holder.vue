<template>
    <view class="page-holder-box" v-if="show" :style="{
		'top':topMargin+'rpx'
	}">

        <view class="page-holder-back" v-if="back" @click="onBack()">
            <view class="left-arrow-black" />
        </view>

        <view class="page-holder-load">
            <view class="loading" /> 加载中
        </view>
    </view>
</template>

<script>
    /**
     * @description 页面展位图
     * 
     * @property {String} topMargin	上边距 
     * @property {Boolea} show		显示隐藏 
     * @property {Boolea} back		是否显示返回按钮 
     */
    export default {
        name: "page-holder",
        props: {
            topMargin: {
                type: String,
                default: '0'
            },
            show: {
                type: Boolean,
                default: true
            },
            back: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {

            };
        },
        methods: {
            onBack() {
                uni.navigateBack()
            }
        }

    }
</script>

<style>
    .page-holder-box {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        background-color: #F5F5F5;
    }

    .page-holder-back {
        position: absolute;
        top: 50rpx;
        left: 50rpx;
        width: 60rpx;
        height: 60rpx;
        border-radius: 60rpx;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .left-arrow-black {
        color: #333333;
        width: 20rpx;
        height: 20rpx;
        position: relative;
        border-bottom: 6rpx solid #333333;
        border-right: 6rpx solid #333333;
        transform: rotate(135deg);
        border-radius: 3rpx;
    }

    .page-holder-load {
        display: flex;
        flex-direction: column;
        width: 300rpx;
        height: 300rpx;
        background-color: #FFFFFF;
        border-radius: 40rpx;
        align-items: center;
        justify-content: center;
        font-size: 40rpx;
        color: #333333;
    }



    .loading {
        width: 80rpx;
        height: 80rpx;
        border-radius: 80rpx;
        border: 8rpx solid rgba(0, 0, 0, 0.01);
        border-top: 8rpx solid #333;
        border-right: 8rpx solid #333;
        border-bottom: 8rpx solid #333;
        -webkit-animation: spin 1.4s linear infinite;
        animation: spin 1.4s linear infinite;
        margin-bottom: 30rpx;
    }

    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>
