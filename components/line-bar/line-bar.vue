<template>
    <view class="line-bar-box" :style="{
        'width':width,
        'height':`${height}rpx`,
        'border-radius':`${height}rpx`,
        'background-color':background}">

        <view class="line-bar-active" :style="{
            'width':progress+'%',
            'background':active,
            'border-radius':`${height}rpx`,
            'min-width':`${height}rpx`,
            'transition':anim?'width .2s linear':''}" />

    </view>
</template>

<script>
    /** 
     * @description 条形进度
     * @property {String}           width       100%        组件宽度
     * @property {String|Number}    height      20          rpx，组件高度
     * @property {String}           background  #EEEEEE     组件背景颜色
     * @property {String}           active      #0076f6     组件进度条颜色
     * @property {String|Number}    progress    [0,100]     组件进度
     * @property {Boolean}          anim        false       组件进度改变是否显示过渡动画
     * 
     */
    export default {
        name: "line-bar",
        props: {
            width: {
                type: String,
                default: "100%"
            },
            height: {
                type: String | Number,
                default: "20"
            },
            background: {
                type: String,
                default: "#EEEEEE"
            },
            active: {
                type: String,
                default: "#0076f6"
            },
            progress: {
                type: String | Number,
                default: 0
            },
            anim: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style>
    .line-bar-box {
        display: flex;
        flex-direction: row;
    }

    .line-bar-active {
        align-items: center;
        justify-content: flex-end;
    }
</style>
