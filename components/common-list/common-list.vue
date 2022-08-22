<template>
    <view>
        <view class="common-list-item" v-for="(item,index) in list" :key="index" @click="click(item)">
            <image class="common-list-cover" :src="item[cover]" fade-show mode="aspectFill" v-if="cover&&item[cover]" />
            <view class="common-list-extra">
                <text class="common-list-title"
                    :class="{'common-list-title2':item[content]==null}">{{item[title]}}</text>
                <text class="common-list-content">{{item[content]}}</text>
                <text class="common-list-time">{{item[time]}}</text>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * @description 通用列表
     * 
     * @property {Array} 	list	列表 
     * @property {String} 	cover	封面 
     * @property {String} 	title	标题 
     * @property {String} 	content	内容 
     * @property {String} 	time	时间 
     * 
     * @event {Function(item)} click 条目点击 
     */
    export default {
        name: "common-list",
        props: {
            list: {
                type: Array,
                default: () => []
            },
            cover: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            time: {
                type: String,
                default: ''
            }
        },
        methods: {
            click(item) {
                this.$emit('click', item)
            }
        }
    }
</script>

<style>
    .common-list-item {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding-top: 25rpx;
        padding-bottom: 25rpx;
        background-color: #FFFFFF;
        border-bottom: solid 2rpx #EEEEEE;
    }

    .common-list-cover {
        width: 160rpx;
        height: 200rpx;
        border-radius: 15rpx;
        margin-right: 25rpx;
        background-color: #f5f5f5;
    }

    .common-list-extra {
        display: flex;
        flex: 1;
        width: 0rpx;
        height: 200rpx;
        flex-direction: column;
        justify-content: space-between;
    }

    .common-list-title {
        width: 100%;
        font-size: 30rpx;
        color: #333333;
        font-weight: bold;
        overflow: hidden;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .common-list-title2 {
        -webkit-line-clamp: 2;
    }

    .common-list-content {
        width: 100%;
        font-size: 28rpx;
        color: #666;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .common-list-time {
        width: 100%;
        font-size: 28rpx;
        color: #999999;
    }
</style>
