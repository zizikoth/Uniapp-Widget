<template>
    <view class="float-list-btn">
        <view class="float-list-btn-content" :style="expand?{'height':(Number(height)+50)+'rpx'}:''">
            <slot></slot>
        </view>
        <view class="float-list-btn-circle" :class="{'float-list-btn-circle-anim':expand}" @click="expand = !expand">
            <view class="float-list-btn-add" />
        </view>
    </view>
</template>

<script>
    export default {
        name: "float-list-btn",
        props: {
            height: {
                type: Number | String,
                default: 0
            }
        },
        data() {
            return {
                expand: false
            };
        },
        methods: {
            open() {
                this.expand = true
            },
            close() {
                this.expand = false
            }
        }
    }
</script>

<style>
    .float-list-btn {
        position: fixed;
        bottom: 100rpx;
        right: 30rpx;
    }

    .float-list-btn-content {
        position: absolute;
        bottom: 50rpx;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100rpx;
        border-top-left-radius: 50rpx;
        border-top-right-radius: 50rpx;
        overflow: hidden;
        background-color: #FFF;
        height: 0rpx;
        box-shadow: 0 0 6rpx 6rpx rgba(200, 200, 200, 0.3);
        transition: height .3s linear;
    }

    .float-list-btn-circle {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        width: 100rpx;
        height: 100rpx;
        border-radius: 100rpx;
        background-color: #FFF;
        box-shadow: 0 0 6rpx 6rpx rgba(200, 200, 200, 0.3);
        transition: transform .3s linear;
        transform: rotate(0deg);
    }

    .float-list-btn-circle-anim {
        transform: rotate(45deg);
    }

    .float-list-btn-add {
        width: 100px;
        height: 100px;
        color: #333;
        position: relative;
    }

    .float-list-btn-add::before {
        content: '';
        position: absolute;
        left: 24rpx;
        top: 46rpx;
        width: 52rpx;
        border-top: 8rpx solid;
        border-radius: 8rpx;
    }

    .float-list-btn-add::after {
        content: '';
        position: absolute;
        left: 46rpx;
        top: 24rpx;
        height: 52rpx;
        border-left: 8rpx solid;
        border-radius: 8rpx;
    }
</style>
