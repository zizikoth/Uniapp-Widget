<template>
    <view>
        <dialog-modal ref="pickerDialogModal">
            <view class="dailog-picker-container">
                <picker-view class="dialog-picker-box" indicator-style="height:80rpx;" :value="value"
                    @change="onChange">
                    <picker-view-column>
                        <text class="dialog-picker-item" v-for="(item,index) in range" :key="index">
                            {{rangeKey?item[rangeKey]:item}}
                        </text>
                    </picker-view-column>
                </picker-view>
                <view class="dialog-picker-btn" @click="onSure">提交</view>
            </view>
        </dialog-modal>
    </view>
</template>

<script>
    export default {
        name: "dialog-picker",
        props: {
            range: {
                type: Array,
                default: () => []
            },
            rangeKey: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                value: [0]
            };
        },
        methods: {
            show() {
                this.$refs.pickerDialogModal.show()
            },
            hide() {
                this.$refs.pickerDialogModal.hide()
            },
            onChange(e) {
                this.value = e.detail.value
            },
            onSure() {
                this.$emit("change", this.range[this.value[0]])
                this.hide()
            }
        }
    }
</script>

<style>
    .dialog-picker-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #FFF;
    }

    .dialog-picker-box {
        width: 100%;
        height: 400rpx;
    }

    .dialog-picker-item {
        width: calc(100% - 60rpx);
        padding-left: 30rpx;
        padding-right: 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        color: #000;
        text-align: center;
        overflow: hidden;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .dialog-picker-btn {
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
