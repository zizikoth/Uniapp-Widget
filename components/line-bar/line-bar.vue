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
        },
        data() {
            return {

            };
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
