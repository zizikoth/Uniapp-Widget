<template>
    <view>

        <image :style="{
            'width':size+'rpx',
            'height':size+'rpx',
            'border-radius':`${circle?size:radius}rpx`
        }" :src="avatar" mode="aspectFill" v-if="avatar!=null&&avatar!=''" />

        <text :style="{
            'display': 'flex',
            'width': size+'rpx',
            'height': size+'rpx',
            'line-height':size+'rpx',
            'border-radius':`${circle?size:radius}rpx`,
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
                type: Number | String,
                default: '120'
            },
            circle: {
                type: Boolean,
                default: false
            },
            radius: {
                type: Number | String,
                default: '10'
            },
            avatar: {
                type: String,
                default: ""
            },
            name: {
                type: String,
                default: ""
            },
            fontColor: {
                type: String,
                default: "#FFFFFF"
            },
            fontSize: {
                type: Number | String,
                default: "40"
            },
        },
    }
</script>

<style>
</style>
