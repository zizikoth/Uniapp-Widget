<template>
    <view class="line-bar-box" :style="{
        'width':width,
        'height':height,
        'border-radius':height,
        'background-color':background}">

        <view class="line-bar-active" :style="{
            'width':progress+'%',
            'background':active,
            'border-radius':height,
            'min-width':height,
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
                type: String,
                default: "20rpx"
            },
            background: {
                type: String,
                default: "#e7eaed"
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
        border-radius: 20rpx;
    }

    .line-bar-active {
        align-items: center;
        justify-content: flex-end;
    }
</style>
