<template>
    <view>
        <dialog-modal ref="numberDialogModal">
            <view class="nk-container">
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
                            @click="add(showPoint?'.':'')">
                            {{showPoint?'.':''}}
                        </view>
                        <view class="number l r" hover-class="number-hover" @click="add('0')">0</view>
                        <view class="number" hover-class="number-hover" @click="reduce()"> ← </view>
                    </view>
                </view>

                <view class="nk-button" @click="onSure">确定</view>
            </view>

        </dialog-modal>
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
                value: ""
            };
        },
        methods: {
            show(value) {
                if (value != null && value != undefined) {
                    this.value = value.toString()
                }
                this.$refs.numberDialogModal.show()
            },
            hide() {
                this.$refs.numberDialogModal.hide()
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
                }
            },
            reduce() {
                if (this.value.length > 0) {
                    this.value = this.value.substring(0, this.value.length - 1)
                }
            },
            onSure() {
                this.$emit("change", this.value)
                this.hide()
            }
        }
    }
</script>

<style>
    .nk-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .nk-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 90rpx;
        background-color: #fff;
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

    .nk-button {
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        font-size: 30rpx;
        color: #000;
        border-top: solid 2rpx #eee;
        background-color: #fff;
    }
</style>
