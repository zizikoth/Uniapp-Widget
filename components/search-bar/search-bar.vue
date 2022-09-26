<template>
    <view class="search-bar-box" :style="{'background-color':color}">
        <view class="search-bar-input-box">
            <input :enableNative="'{{false}}'" class="search-bar-input" :style="{'background-color':color}" type="text"
                bindinput="searchList" confirm-type="search" :placeholder="hint" placeholder-style="color:#666"
                v-model="value" @confirm="search" @input="change" />
        </view>
        <view class="search-bar-search" @click="search">
            <view class="icon-search" />
        </view>
    </view>
</template>

<script>
    /**
     * @description    搜索框
     * @property {String}       hint        默认显示文字 
     * @property {String}       color       搜索框背景颜色 
     */
    export default {
        name: "search-bar",
        props: {
            hint: {
                type: String,
                default: "请输入搜索关键字...",
            },
            color: {
                type: String,
                default: '#f5f5f5'
            }
        },
        data() {
            return {
                value: "",
            };
        },
        methods: {
            change(e) {
                this.$emit("change", e.detail.value);
            },
            search() {
                this.$emit("search", this.value);
            },
            reset() {
                this.value = ""
            }
        },
    };
</script>

<style>
    .search-bar-box {
        display: flex;
        width: 100%;
        height: 60rpx;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        border-radius: 60rpx;
    }

    .search-bar-input-box {
        display: flex;
        width: calc(100% - 130rpx);
        height: 60rpx;
        line-height: 60rpx;
        margin-left: 30rpx;
        font-size: 28rpx;
        align-items: center;
        color: #333;
    }

    .search-bar-input {
        font-size: 28rpx;
        width: 100%;
    }

    .search-bar-search {
        display: flex;
        width: 100rpx;
        height: 100%;
        align-items: center;
        justify-content: center;
    }

    .icon-search {
        width: 25rpx;
        height: 25rpx;
        border-radius: 100%;
        border: 4rpx solid #666;
        position: relative;
    }

    .icon-search:after {
        content: "";
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        transform: rotate(45deg);
        width: 8rpx;
        height: 4rpx;
        position: absolute;
        top: 25rpx;
        left: 25rpx;
        background-color: #666;
    }
</style>
