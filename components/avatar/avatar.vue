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
    /**
     * @description 头像组件
     * @property    {String}            color       #0076f6     背景底色
     * @property    {String|Number}     size       120          rpx，组件的宽高   
     * @property    {Boolean}           circle     false        false=方形；true=原型   
     * @property    {String|Number}     radius     10           rpx，组件的圆角   
     * @property    {String}            avatar     ""           头像的图片地址，优先级高   
     * @property    {String}            name       ""           头像的名字，优先级低    
     * @property    {String}            fontColor  #FFFFFF      文字头像的颜色   
     * @property    {String|Number}     fontSize   "40"         rpx,文字头像的字体大小    
     */
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
