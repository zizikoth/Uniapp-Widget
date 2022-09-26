<template>
    <view class="load-more-box" :style="{'background-color':color }" v-if="status==1||status==2||status==3||status==4">
        <view class="load-more-normal-box" v-if="status==1||status==2||status==3" @click="click">
            {{status==1?'上拉加载':status==2?'正在加载中':status==3?'----- 没有更多数据了 -----':''}}
        </view>

        <view class="load-more-empty-box" v-if="status==4">
            <text class="iconfont icon-empty" style="margin-bottom: 30rpx;" />
            {{empty}}
        </view>
    </view>
</template>

<script>
    /**
     * @property {Number} status = [1,2,3,4] 
     * 		@value	0	隐藏控件
     * 		@value	1	上拉加载
     * 		@value	2	正在加载
     * 		@value	3	没有更多数据
     * 		@value	4	暂无数据
     * 
     * @event {Function()} load 点击加载更多 
     */
    export default {
        name: "load-more",
        props: {
            status: {
                type: Number,
                default: 1
            },
            color: {
                type: String,
                default: "#FFFFFF"
            },
            empty: {
                type: String,
                default: "暂无数据"
            }
        },
        methods: {
            click() {
                if (this.status == 1) {
                    this.$emit('load')
                }
            }
        }
    }
</script>

<style>
    .load-more-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #FFFFFF;
    }

    .load-more-normal-box {
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        color: #333333;
        font-size: 30rpx;
    }

    .load-more-empty-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 400rpx;
        align-items: center;
        justify-content: center;
        color: #333333;
        font-size: 30rpx;
    }

    @font-face {
        font-family: 'iconfont';
        src: url('data:font/ttf;charset=utf-8;base64,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') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    .iconfont {
        font-family: "iconfont" !important;
        font-size: 130rpx;
        color: #333333;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-empty:before {
        content: "\e613";
    }
</style>
