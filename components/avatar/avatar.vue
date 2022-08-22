<template>
    <view :style="{
        'width':size+'rpx',
        'height':size+'rpx',
        'border-radius':size+'rpx',
        'border':borderSize+'rpx solid '+borderColor}">

        <image :style="{
            'width':size+'rpx',
            'height':size+'rpx',
            'border-radius':size+'rpx',
        }" :src="avatar" mode="aspectFill" v-if="avatar!=null&&avatar!=''" />

        <text :style="{
            'display': 'flex',
            'width': size+'rpx',
            'height': size+'rpx',
            'line-height':size+'rpx',
            'border-radius':size+'rpx',
            'background-color': color,
            'align-items': 'center',
            'justify-content': 'center',
            'font-size':fontSize+'rpx',
            'color':fontColor}" v-if="avatar==null||avatar==''&&name!=null&&name.length>0">{{name[0]}}</text>
    </view>
</template>

<script>
    export default {
        name: "avatar",
        props: {
            color: {
                type: String,
                default: "#0076F6"
            },
            size: {
                type: String,
                default: '120'
            },
            fontColor: {
                type: String,
                default: "#FFFFFF"
            },
            fontSize: {
                type: String,
                default: "40"
            },
            borderColor: {
                type: String,
                default: "#FFFFFF"
            },
            borderSize: {
                type: String,
                default: '0'
            },
            avatar: {
                type: String,
                default: ""
            },
            name: {
                type: String,
                default: ""
            }
        },
    }
</script>

<style>
</style>
