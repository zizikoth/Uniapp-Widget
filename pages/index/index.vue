<template>
    <view class="page">
        <title-bar title="首页" :back="false" />
        <view class="button" style="margin-top: 120rpx;" @click="launch('/pages/widget/widget')">组件</view>
        <view class="button" @click="launch('/pages/utils/utils')">工具</view>
    </view>
</template>

<script>
    import utils from '@/utils/Utils.js'
    export default {
        methods: {
            launch(url) {
                uni.navigateTo({
                    url: url
                })
            }
        }
    }
</script>

<style>
    page {
        display: flex;
        flex-direction: column;
        background-color: #fff;
    }
</style>
