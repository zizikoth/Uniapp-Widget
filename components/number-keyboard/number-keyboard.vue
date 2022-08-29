<template>
    <view class="nk-container" @touchmove.stop.prevent="moveHandle">
        <view v-if="visible" class="nk-mask" :class="{'nk-mask-show':visible}" @click="emptyClick()" />
        <view class="nk-box hide" :class="{'show':visible}">
            <view class="nk-item nk-round" @click="onCancel()">
                <view class="down-arrow-black" />
            </view>
            <view class="nk-item">
                <view class="nk-value">{{value}}</view>
            </view>
            <view class="nk-number-box">
                <view class="nk-number-item">
                    <view class="number" hover-class="number-hover" @click="add('7')">7</view>
                    <view class="number l r" hover-class="number-hover" @click="add('8')">8</view>
                    <view class="number" hover-class="number-hover" @click="add('9')">9</view>
                </view>
                <view class="nk-number-item">
                    <view class="number" hover-class="number-hover" @click="add('4')">4</view>
                    <view class="number l r" hover-class="number-hover" @click="add('5')">5</view>
                    <view class="number" hover-class="number-hover" @click="add('6')">6</view>
                </view>
                <view class="nk-number-item">
                    <view class="number" hover-class="number-hover" @click="add('1')">1</view>
                    <view class="number l r" hover-class="number-hover" @click="add('2')">2</view>
                    <view class="number" hover-class="number-hover" @click="add('3')">3</view>
                </view>
                <view class="nk-number-item">
                    <view class="number nk-point" :hover-class="showPoint?'number-hover':''"
                        @click="add(showPoint?'.':'')">{{showPoint?'.':''}}</view>
                    <view class="number l r" hover-class="number-hover" @click="add('0')">0</view>
                    <view class="number" hover-class="number-hover" @click="reduce()"> ← </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * number-keyboard 
     * @description 数字键盘 
     * @property	{Number} 	maxLength	默认:15		输入最大长度
     * @property	{Number} 	decimals 	默认:2		保留几位小数
     * @property	{Boolean} 	showPoint  	默认:true	是否显示小数点
     */
    export default {
        name: "number-keyboard",
        props: {
            maxLength: {
                type: Number,
                default: 15
            },
            decimals: {
                type: Number,
                default: 2
            },
            showPoint: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                visible: false,
                value: ""
            };
        },
        methods: {
            moveHandle() {
                return false
            },
            emptyClick() {
                console.log("点击背景")
            },
            add(input) {
                if (this.value.length < this.maxLength && input != "") {
                    if (this.value.length == 0 && input == ".") {
                        // 如果第一位是.变为0.
                        this.value = "0."
                    } else if (this.value == "0" && input != ".") {
                        // 如果第一位是0，下一位不是小数点
                        this.value = input
                    } else if (this.value.indexOf(".") != -1 && input == ".") {
                        // 已经有.又输入了. 不添加数据
                    } else if (this.value.indexOf(".") != -1 &&
                        this.value.length - this.value.indexOf(".") > this.decimals) {
                        // 如果超出保留的小数 不添加数据
                    } else {
                        this.value = this.value + input
                    }
                    this.$emit("change", this.value)
                }
            },
            reduce() {
                if (this.value.length > 0) {
                    this.value = this.value.substring(0, this.value.length - 1)
                    this.$emit("change", this.value)
                }
            },
            onCancel() {
                this.$emit("cancel")
                this.visible = false
            },
            show(value) {
                if (value != null && value != undefined) {
                    this.value = value.toString()
                }
                this.visible = true
            },
        }
    }
</script>

<style>
    .nk-container {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .nk-mask {
        position: fixed;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.6);
        transition-property: opacity;
        transition-duration: 0.3s;
        opacity: 0;
        z-index: 1000;
    }

    .nk-mask-show {
        opacity: 1
    }

    .nk-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: fixed;
        left: 0rpx;
        bottom: 0rpx;
        z-index: 1000;
    }

    .nk-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 90rpx;
        border-top: solid 4rpx #f5f5f5;
        background-color: #fff;
    }

    .nk-round {
        border-top-left-radius: 40rpx;
        border-top-right-radius: 40rpx;
        align-items: center;
        justify-content: center;
        border-top: solid 4rpx #f5f5f5;
        box-shadow: 0rpx 20rpx 30rpx 20rpx #aaa;
    }

    .nk-value {
        width: calc(100% - 60rpx);
        padding-left: 30rpx;
        padding-right: 30rpx;
        font-size: 40rpx;
        height: 90rpx;
        line-height: 90rpx;
        text-align: end;
    }

    .nk-cancel {
        width: 120rpx;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        color: #666;
        font-size: 28rpx;
        background-color: #f5f5f5;
    }


    .nk-number-box {
        width: 100%;
        background-color: #fff;
    }

    .l {
        border-left: solid 4rpx #EEEEEE;
    }

    .r {
        border-right: solid 4rpx #EEEEEE;
    }

    .nk-number-item {
        display: flex;
        flex-direction: row;
        height: 100rpx;
        font-size: 28rpx;
        color: #333333;
        border-top: solid 4rpx #f5f5f5;
    }

    .number {
        height: 100rpx;
        color: #333333;
        font-size: 30rpx;
        line-height: 100rpx;
        text-align: center;
        font-weight: bold;
        flex: 1;
    }

    .nk-point {
        line-height: 65rpx;
        font-size: 60rpx;
    }

    .number-hover {
        background-color: #f5f5f5;
    }

    .hide {
        transition: 0.3s all;
        transform: translateY(100%);
        opacity: 0;
        visibility: hidden;
    }

    .show {
        transition: 0.3s all;
        transform: translateY(0%);
        opacity: 1;
        visibility: visible;
    }

    .down-arrow-black {
        margin-left: 15rpx;
        margin-bottom: 13rpx;
        color: #333333;
        width: 16rpx;
        height: 16rpx;
        position: relative;
        border-bottom: 4rpx solid #333333;
        border-right: 4rpx solid #333333;
        transform: rotate(45deg);
        border-radius: 4rpx;
    }
</style>
