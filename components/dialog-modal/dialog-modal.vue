<template>
    <view class="dialog-modal" @touchmove.stop.prevent="()=>false">
        <view class="dailog-mask" :class="{'dailog-mask-show':visible}" v-if="visible" @click="{}" />
        <view class="dialog-box dialog-hide" :class="{'dialog-show':visible}">
            <view class="dialog-close" @click="hide()">
                <view class="dialog-close-icon" />
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
            hide() {
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
        z-index: 999;
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
        z-index: 999;
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
        height: 80rpx;
        border-bottom: solid 2rpx #eee;
        background-color: #fff;
        border-top-left-radius: 20rpx;
        border-top-right-radius: 20rpx;
    }


    .dialog-close-icon {
        position: relative;
        width: 4rpx;
        height: 40rpx;
        background: #333;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        display: inline-block;
    }

    .dialog-close-icon:after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 4rpx;
        height: 40rpx;
        background: #333;
        -webkit-transform: rotate(270deg);
        -moz-transform: rotate(270deg);
        -o-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        transform: rotate(270deg);
    }


    .dialog-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #FFF;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
</style>
