<template>
    <swiper class="banner-swiper" circular autoplay :current="position" @change="change" v-if="list.length>0">
        <swiper-item style="width: 100%;height: 100%;" v-for="(item,index) in list" :key="index">
            <view class="banner-swiper-item" @click="click(item)">
                <image class="banner-image" mode="aspectFill" :src="bannerKey?item[bannerKey]:item" />
                <text class="banner-title" v-if="titleKey">
                    <text class="banner-source" v-if="sourceKey&&item[sourceKey]">{{item[sourceKey]}}</text>
                    {{item[titleKey]}}
                </text>
            </view>
        </swiper-item>
    </swiper>
</template>

<script>
    /**
     * @description 轮播图
     * 
     * @property	{Array}		banner		轮播图列表 
     * @property 	{String} 	bannerKey 	图片取值 
     * @property 	{String} 	titleKey 	标题取值 
     * @property 	{String} 	sourceKey 	来源取值 
     * 
     * @event	{Function(item)}	click 	轮播图点击
     */
    export default {
        name: "banner",
        props: {
            banner: {
                type: Array,
                default: () => []
            },
            bannerKey: {
                type: String,
                default: ""
            },
            sourceKey: {
                type: String,
                default: ""
            },
            titleKey: {
                type: String,
                default: ""
            }
        },
        watch: {
            banner: {
                handler(newBanner) {
                    this.list = newBanner
                    this.position = 0
                },
                immediate: true
            }
        },
        data() {
            return {
                list: [],
                position: 0
            }
        },
        methods: {
            change(e) {
                this.position = e.detail.current
            },
            click(item) {
                this.$emit('click', item)
            }
        }
    }
</script>

<style>
    .banner-swiper {
        display: flex;
        width: 100%;
        height: 380rpx;
    }

    .banner-swiper-item {
        display: flex;
        position: relative;
        width: calc(100% - 50rpx);
        margin-left: 25rpx;
        margin-right: 25rpx;
        height: 380rpx;
    }

    .banner-image {
        display: flex;
        width: 100%;
        height: 380rpx;
        border-radius: 18rpx;
        background-color: #eeeeee;
    }


    .banner-title {
        width: calc(100% - 50rpx);
        position: absolute;
        left: 0;
        bottom: 0;
        padding-left: 25rpx;
        padding-right: 25rpx;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 28rpx;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.6);
        border-bottom-left-radius: 18rpx;
        border-bottom-right-radius: 18rpx;
        overflow: hidden;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .banner-source {
        padding-left: 8rpx;
        padding-right: 8rpx;
        padding-top: 2rpx;
        padding-bottom: 2rpx;
        font-size: 24rpx;
        color: #fff;
        background-color: #E41A2C;
        border-radius: 8rpx;
        margin-right: 20rpx;
    }
</style>
