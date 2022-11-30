<template>
    <view class="arrow-box" :style="{width:(size+20)+'rpx',height:(size+20)+'rpx'}">
        <view v-if="arrow=='left'" class="arrow arrow-left"
            :style="{width:size+'rpx',height:size+'rpx',borderWidth:border+'rpx',borderColor:color}" />
        <view v-if="arrow=='top'" class="arrow arrow-top"
            :style="{width:size+'rpx',height:size+'rpx',borderWidth:border+'rpx',borderColor:color}" />
        <view v-if="arrow=='right'" class="arrow arrow-right"
            :style="{width:size+'rpx',height:size+'rpx',borderWidth:border+'rpx',borderColor:color}" />
        <view v-if="arrow=='bottom'" class="arrow arrow-bottom"
            :style="{width:size+'rpx',height:size+'rpx',borderWidth:border+'rpx',borderColor:color}" />
    </view>
</template>

<script>
    /**
     * @description 箭头组件
     * @property {String} size      箭头大小
     * @property {String} border    箭头粗细
     * @property {String} color     箭头颜色
     * @property {String} arrow     箭头方向
     *      @value left     左
     *      @param top      上
     *      @param right    右
     *      @param bottom   下
     */
    export default {
        name: "arrow",
        props: {
            size: {
                type: String | Number,
                default: 16
            },
            border: {
                type: String | Number,
                default: 2
            },
            color: {
                type: String,
                default: '#333'
            },
            arrow: {
                type: String,
                default: 'right'
            }
        }
    }
</script>

<style>
    .arrow-box {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .arrow {
        border-top: solid;
        border-right: solid;
    }

    .arrow-left {
        transform: rotate(-135deg);
        margin-left: 10rpx;
    }

    .arrow-top {
        transform: rotate(-45deg);
        margin-top: 10rpx;
    }

    .arrow-right {
        transform: rotate(45deg);
        margin-right: 10rpx;
    }

    .arrow-bottom {
        transform: rotate(135deg);
        margin-bottom: 10rpx;
    }
</style>
