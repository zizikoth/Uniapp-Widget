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
        data() {
            return {
                data: [{
                    id: 1,
                    title: '第1个',
                    open: false,
                    children: [{
                        id: 2,
                        title: '第2个',
                        open: false,
                        children: [{
                            id: 3,
                            title: '第3个',
                            open: false,
                            children: [{
                                id: 4,
                                title: '第4个',
                                open: false,
                                children: []
                            }]
                        }]
                    }]
                }, {
                    id: 5,
                    title: '第5个',
                    open: false,
                    children: [{
                        id: 6,
                        title: '第6个',
                        open: false,
                        children: [{
                            id: 7,
                            title: '第7个',
                            open: false,
                            children: [{
                                id: 8,
                                title: '第8个',
                                open: false,
                                children: []
                            }]
                        }]
                    }]
                }]
            }
        },
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
