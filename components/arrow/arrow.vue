<template>
    <view v-if="arrow" class="arrow-box" :style="{width:size+'rpx',height:size+'rpx'}" @click="onClick">
        <view v-if="arrow=='left'" class="arrow arrow-left"
            :style="{width:(Number(size)/2)+'rpx',height:(Number(size)/2)+'rpx',borderWidth:border+'rpx',borderColor:color}" />
        <view v-if="arrow=='top'" class="arrow arrow-top"
            :style="{width:(Number(size)/2)+'rpx',height:(Number(size)/2)+'rpx',borderWidth:border+'rpx',borderColor:color}" />
        <view v-if="arrow=='right'" class="arrow arrow-right"
            :style="{width:(Number(size)/2)+'rpx',height:(Number(size)/2)+'rpx',borderWidth:border+'rpx',borderColor:color}" />
        <view v-if="arrow=='bottom'" class="arrow arrow-bottom"
            :style="{width:(Number(size)/2)+'rpx',height:(Number(size)/2)+'rpx',borderWidth:border+'rpx',borderColor:color}" />
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
     *      @value top      上
     *      @value right    右
     *      @value bottom   下
     */
    export default {
        name: "arrow",
        props: {
            size: {
                type: String | Number,
                default: 30
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
        },
        methods: {
            onClick() {
                this.$emit('click')
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
        border-radius: 2rpx;
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
