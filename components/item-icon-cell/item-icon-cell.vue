<template>
    <view class="iic-box" :class="{'iic-box-line':line}" @click="click()">
        <image class="iic-icon" v-if="icon!=''" :src="icon" />

        <text class="iic-title">{{title}}</text>

        <text class="iic-subtitle">{{subTitle}}</text>

        <badge type="error" size="small" :text="dot?1:badge" :isDot="dot" />

        <view class="right-arrow-black" />

    </view>
</template>

<script>
    /**
     * @description 条目控件
     * 
     * @property	{String}	icon		icon本地地址，控件使用页面的相对地址
     * @property	{String}	title		标题
     * @property	{String}	subTitle	副标题
     * @property	{Number}	badge		角标数量
     * @property	{Boolean}	dot			是否显示小红点
     * @property	{Boolean}	line		是否显示下边分割线
     * 
     * @event	{Function()}	click	控件点击时间
     *  
     */
    export default {
        name: "item-icon-cell",
        props: {
            icon: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                default: ""
            },
            subTitle: {
                type: String,
                default: ""
            },
            badge: {
                type: Number,
                default: 0
            },
            dot: {
                type: Boolean,
                default: false
            },
            line: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            click() {
                this.$emit('click')
            }
        }
    }
</script>

<style>
    .iic-box {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 90rpx;
        align-items: center;
    }

    .iic-box-line {
        border-bottom: solid 2rpx #EEEEEE;
    }

    .iic-icon {
        width: 60rpx;
        height: 60rpx;
        margin-right: 20rpx;
    }

    .iic-title {
        font-size: 30rpx;
        color: #333333;
        font-weight: bold;
    }

    .iic-subtitle {
        font-size: 24rpx;
        color: #999999;
        flex: 1;
        margin-left: 20rpx;
    }

    .iic-dot {
        width: 13rpx;
        height: 13rpx;
        border-radius: 13rpx;
        background-color: #DD524D;
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
