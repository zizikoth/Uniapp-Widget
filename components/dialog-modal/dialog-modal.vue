<template>
    <view class="dialog-modal" @touchmove.stop.prevent="()=>false">
        <view class="dailog-mask" :class="{'dailog-mask-show':visible}" v-if="visible" @click="{}" />
        <view class="dialog-box dialog-hide" :class="{'dialog-show':visible}">
            <view class="dialog-close" @click="cancel()">
                <view class="down-arrow-black" />
            </view>
            <view class="dialog-content">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * dialog-modal
     * 通用底部弹窗 具体内容写入
     */
    export default {
        name: "dialog-modal",
        data() {
            return {
                visible: false,
            };
        },
        methods: {
            cancel() {
                this.visible = false
            },
            show() {
                this.visible = true
            },
        }
    }
</script>

<style>
    .dialog-modal {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .dailog-mask {
        position: fixed;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.6);
        transition-property: opacity;
        transition-duration: 0.3s;
        opacity: 0;
        z-index: 1000;
    }

    .dailog-mask-show {
        opacity: 1
    }

    .dialog-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: fixed;
        left: 0rpx;
        bottom: 0rpx;
        z-index: 1000;
    }

    .dialog-hide {
        transition: 0.3s all;
        transform: translateY(100%);
        opacity: 0;
        visibility: hidden;
    }

    .dialog-show {
        transition: 0.3s all;
        transform: translateY(0%);
        opacity: 1;
        visibility: visible;
    }

    .dialog-close {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 90rpx;
        border-top: solid 4rpx #f5f5f5;
        border-bottom: solid 4rpx #f5f5f5;
        background-color: #fff;
        border-top-left-radius: 20rpx;
        border-top-right-radius: 20rpx;
    }

    .down-arrow-black {
        margin-left: 15rpx;
        margin-bottom: 13rpx;
        color: #333333;
        width: 16rpx;
        height: 16rpx;
        position: relative;
        border-bottom: 4rpx solid #333333;
        border-right: 4rpx solid #333333;
        transform: rotate(45deg);
        border-radius: 4rpx;
    }

    .dialog-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #FFF
    }
</style>
