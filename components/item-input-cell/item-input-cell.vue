<template>
    <view
        :class="[type=='textarea'||type=='image'?'item-input-cell-box-v':'item-input-cell-box',line?'item-input-cell-box-line':'']">
        <view class="item-input-cell-title">
            <text style="max-width: 200rpx;">{{title}}</text>
            <text v-if="must" style="color:#dd524d;margin-top:5rpx;">*</text>
        </view>

        <view class="item-input-cell-extra">
            <view class="item-input-cell-content" v-if="type=='text'" @click="onChangeText">
                <text class="item-input-cell-value item-input-cell-ellipse" v-if="!empty(value)">{{value}}</text>
                <text class="item-input-cell-hint" v-if="empty(value)">{{hint}}</text>
                <view :class="arrow=='right'?'right-arrow-black':'down-arrow-black'" v-if="arrow" />
            </view>

            <picker v-if="type=='date'" class="item-input-cell-content" mode="date" :fields="fields" :start="start"
                :end="end" @change="onChangeDate">
                <view class="item-input-cell-content">
                    <text class="item-input-cell-value" v-if="!empty(content)">{{content}}</text>
                    <text class="item-input-cell-value" v-if="empty(content)&&!empty(value)">{{value}}</text>
                    <text class="item-input-cell-hint" v-if="empty(content)&&empty(value)">{{hint}}</text>
                    <view class="down-arrow-black" />
                </view>
            </picker>

            <view v-if="type=='time'" class="item-input-time-cell">
                <picker class="item-input-cell-content" mode="date" :fields="fields" :start="start" :end="end"
                    @change="onChangeDateStart">
                    <view class="item-input-cell-content">
                        <text class="item-input-cell-value" v-if="!empty(content)">{{content}}</text>
                        <text class="item-input-cell-value" v-if="empty(content)&&!empty(value)">{{value}}</text>
                        <text class="item-input-cell-hint" v-if="empty(content)&&empty(value)">{{hint}}</text>
                        <view class="down-arrow-black" />
                    </view>
                </picker>
                <picker class="item-input-cell-content" style="margin-top: 20rpx;" mode="date" :fields="fields"
                    :start="start" :end="end" @change="onChangeDateEnd">
                    <view class="item-input-cell-content">
                        <text class="item-input-cell-value" v-if="!empty(content2)">{{content2}}</text>
                        <text class="item-input-cell-value" v-if="empty(content2)&&!empty(value2)">{{value2}}</text>
                        <text class="item-input-cell-hint" v-if="empty(content2)&&empty(value2)">{{hint2}}</text>
                        <view class="down-arrow-black" />
                    </view>
                </picker>
            </view>


            <picker v-if="type=='picker'" class="item-input-cell-content" mode="selector" :range="range"
                :range-key="rangeKey" @change="onChangePicker">
                <view class="item-input-cell-content">
                    <text class="item-input-cell-value" v-if="!empty(content)">{{content}}</text>
                    <text class="item-input-cell-value" v-if="empty(content)&&!empty(value)">{{value}}</text>
                    <text class="item-input-cell-hint" v-if="empty(content)&&empty(value)">{{hint}}</text>
                    <view class="down-arrow-black" />
                </view>
            </picker>

            <view v-if="type=='input'" class="item-input-cell-content">
                <input class="item-input-cell-input" :placeholder="hint" :enableNative="'{{false}}'" :value="value"
                    :maxlength="maxLength" placeholder-class="item-input-cell-hint" @input="onChangeInput" />
            </view>

            <view v-if="type=='textarea'" class="item-input-cell-content">
                <textarea class="item-input-cell-textarea" :placeholder="hint" :enableNative="'{{false}}'"
                    :value="value" :maxlength="maxLength" placeholder-class="item-input-cell-hint"
                    @input="onChangeInput" />
            </view>

            <view v-if="type=='image'" class="item-input-cell-content" style="padding-top: 10rpx;">
                <nine-grid-image mode="add" @change="onChangeImage" />
            </view>
        </view>


    </view>
</template>

<script>
    export default {
        name: "item-input-cell",
        props: {
            type: {
                type: String,
                default: 'text'
            },
            title: {
                type: String,
                default: ''
            },
            must: {
                type: Boolean,
                default: false
            },
            line: {
                type: Boolean,
                default: true
            },
            value: {
                type: String,
                default: ''
            },
            value2: {
                type: String,
                default: ''
            },
            hint: {
                type: String,
                default: ''
            },
            hint2: {
                type: String,
                default: ''
            },
            arrow: {
                type: String,
                default: ''
            },
            fields: {
                type: String,
                default: ''
            },
            start: {
                type: String,
                default: ''
            },
            end: {
                type: String,
                default: ''
            },
            range: {
                type: Array,
                default: () => []
            },
            rangeKey: {
                type: String,
                default: ''
            },
            maxLength: {
                type: String | Number,
                default: 200
            }
        },
        data() {
            return {
                content: '',
                content2: ''
            };
        },
        methods: {
            empty(data) {
                let isEmpty = data === "" || data === "null" || data === undefined || data === null || data.length === 0
                if (isEmpty) {
                    return true
                } else {
                    let str = data.toString()
                    return str.indexOf('undefined') != -1 || str.indexOf('null') != -1
                }
            },
            onChangeText() {
                this.$emit('change')
            },
            onChangeDate(e) {
                let temp = e.detail.value
                if (this.type === "date") {
                    temp = temp.replace(RegExp("/", "gm"), "-")
                }
                this.content = temp
                this.$emit("change", this.content)
            },
            onChangeDateStart(e) {
                let temp = e.detail.value
                if (this.type === "time") {
                    temp = temp.replace(RegExp("/", "gm"), "-")
                }
                this.content = temp
                this.$emit("change", {
                    startTime: this.content,
                    endTime: this.content2
                })
            },
            onChangeDateEnd(e) {
                let temp = e.detail.value
                if (this.type === "time") {
                    temp = temp.replace(RegExp("/", "gm"), "-")
                }
                this.content2 = temp
                this.$emit("change", {
                    startTime: this.content,
                    endTime: this.content2
                })
            },
            onChangePicker(e) {
                let temp = this.range[e.detail.value]
                if (this.rangeKey == '') this.content = temp
                else this.content = temp[this.rangeKey]
                this.$emit('change', temp)
            },
            onChangeInput(e) {
                this.$emit('change', e.detail.value)
            },
            onChangeImage(e) {
                this.$emit("change", e)
            }
        }
    }
</script>

<style>
    .item-input-cell-box {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding-top: 15rpx;
        padding-bottom: 15rpx;
        line-height: 50rpx;
        font-size: 30rpx;
    }

    .item-input-cell-box-v {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-top: 15rpx;
        padding-bottom: 15rpx;
        line-height: 50rpx;
        font-size: 30rpx;
    }

    .item-input-cell-box-line {
        border-bottom: solid 2rpx #f5f5f5;
    }

    .item-input-cell-box-elder {
        font-size: 45rpx;
        line-height: 60rpx;
    }

    .item-input-cell-title {
        display: flex;
        flex-direction: row;
        width: 200rpx;
        color: #333333;
        justify-content: space-between;
        padding-right: 20rpx;
    }

    .item-input-cell-extra {
        display: flex;
        flex-direction: row;
        flex: 1;
    }

    .item-input-time-cell {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .item-input-cell-content {
        display: flex;
        flex-direction: row;
        width: 100%;
        color: #666666;
        justify-content: flex-end;
        align-items: center;
    }

    .item-input-cell-input {
        width: 100%;
        text-align: end;
        line-height: 50rpx;
        font-size: 30rpx;
    }

    .item-input-cell-textarea {
        width: calc(100% - 40rpx);
        padding: 20rpx;
        height: 200rpx;
        margin-top: 15rpx;
        border-radius: 15rpx;
        background-color: #f5f5f5;
        line-height: 50rpx;
        font-size: 30rpx;
    }

    .item-input-cell-hint {
        color: #999999;
        line-height: 50rpx;
        font-size: 28rpx;
    }

    .item-input-cell-value {
        display: flex;
        text-align: end;
        flex: 1;
        line-height: 50rpx;
        font-size: 30rpx;
        color: #333333;
    }

    .item-input-cell-ellipse {
        overflow: hidden;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .right-arrow-black {
        margin-left: 15rpx;
        margin-bottom: 5rpx;
        width: 16rpx;
        height: 16rpx;
        position: relative;
        border-bottom: 4rpx solid #999;
        border-right: 4rpx solid #999;
        transform: rotate(-45deg);
        border-radius: 4rpx;
    }

    .down-arrow-black {
        margin-left: 15rpx;
        margin-bottom: 10rpx;
        width: 16rpx;
        height: 16rpx;
        position: relative;
        border-bottom: 4rpx solid #999;
        border-right: 4rpx solid #999;
        transform: rotate(45deg);
        border-radius: 4rpx;
    }
</style>
