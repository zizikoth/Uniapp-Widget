<template>
    <view class="tb-title-box">
        <view class="tb-title-item-box">
            <view v-if="back" class="tb-title-back" @click="onBack" />
        </view>
        <text class="tb-title-title">{{title}}</text>
        <view class="tb-title-item-box" @click="onExtra">
            <text v-if="extra">{{extra}}</text>
            <image class="tb-title-extra-icon" v-if="extraIcon" :src="extraIcon" />
        </view>
    </view>
</template>

<script>
    /**
     * @description 标题组件
     * 
     * @property {String} 	title		标题
     * @property {Boolean} 	back		是否显示返回按钮
     * @property {String} 	extra		右侧文字
     * @property {String} 	extraIcon	右侧图标	控件所在页面的相对地址
     * 
     * @event {Function()} 	extra 	右侧文字或者图标的点击
     */
    export default {
        name: "title-bar",
        props: {
            title: {
                type: String,
                default: ""
            },
            back: {
                type: Boolean,
                default: true
            },
            extra: {
                type: String,
                default: ""
            },
            extraIcon: {
                type: String,
                default: ""
            },
        },
        methods: {
            onBack() {
                let pages = getCurrentPages()
                if (pages && pages.length > 1) {
                    uni.navigateBack()
                } else {
                    history.go(-1)
                }
            },
            onExtra() {
                this.$emit('extra')
            }
        }
    }
</script>

<style>
    .tb-title-box {
        display: flex;
        position: sticky;
        left: 0;
        top: 0;
        width: 100%;
        height: 90rpx;
        background-color: #FFFFFF;
        box-shadow: 0px 2rpx 8rpx 0px #eeeeee;
        z-index: 900;
        align-items: center;
        justify-content: space-between;
    }

    .tb-title-item-box {
        display: flex;
        width: 90rpx;
        height: 90rpx;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
        color: #666666;
    }

    .tb-title-back {
        margin-left: 15rpx;
        color: #333333;
        width: 25rpx;
        height: 25rpx;
        position: relative;
        border-bottom: 6rpx solid #333333;
        border-right: 6rpx solid #333333;
        transform: rotate(135deg);
    }

    .tb-title-title {
        flex: 1;
        font-size: 35rpx;
        font-weight: bold;
        color: #333;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .tb-title-extra-icon {
        width: 40rpx;
        height: 40rpx;
    }
</style>
