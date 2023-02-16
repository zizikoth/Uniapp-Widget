<template>
    <view>
        <dialog-modal ref="dateDialogModal">
            <view class="dailog-date-tip-box" v-if="start||end">
                <text v-if="start&&!end">开始时间：</text>
                <text v-if="start">{{start}}</text>
                <text v-if="start&&end" class="dailog-date-tip-to">至</text>
                <text v-if="!start&&end">结束时间：</text>
                <text v-if="end">{{end}}</text>
            </view>
            <view class="date-dialog-container">
                <picker-view class="dialog-date-box" indicator-style="height:80rpx;" :value="value" @change="onChange">
                    <picker-view-column>
                        <view class="dialog-date-item" v-for="(item,index) in yearList" :key="index">
                            {{format(item)}}年
                        </view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="dialog-date-item" v-for="(item,index) in monthList" :key="index">
                            {{format(item)}}月
                        </view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="dialog-date-item" v-for="(item,index) in dayList" :key="index">
                            {{format(item)}}日
                        </view>
                    </picker-view-column>
                </picker-view>

                <view class="dialog-date-btn" @click="onSure">确定</view>
            </view>
        </dialog-modal>
    </view>
</template>

<script>
    export default {
        name: "dialog-date",
        props: {
            start: {
                type: String,
                default: null
            },
            end: {
                type: String,
                default: null
            },
            current: {
                type: String,
                default: null
            }
        },
        mounted() {
            this.initData()
        },
        data() {
            return {
                value: [0, 0, 0],
                yearList: [],
                monthList: [],
                dayList: []
            };
        },
        methods: {
            initData() {
                let date = this.current ? new Date(current) : new Date()
                let year = date.getFullYear() + 100
                for (let i = 1900; i <= year; i++) {
                    this.yearList.push(i)
                }
                for (let i = 1; i <= 12; i++) {
                    this.monthList.push(i)
                }
                let endDay = this.getMonthDay(date.getFullYear(), date.getMonth() + 1)
                for (let i = 1; i <= endDay; i++) {
                    this.dayList.push(i)
                }
                this.value = [
                    this.yearList.indexOf(date.getFullYear()),
                    this.monthList.indexOf(date.getMonth() + 1),
                    this.dayList.indexOf(date.getDate())
                ]
            },
            getMonthDay(year, month) {
                if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                    return 31
                } else if (month == 4 || month == 6 || month == 9 || month == 11) {
                    return 30
                } else if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
                    return 29
                } else {
                    return 28
                }
            },
            format(e) {
                return e < 10 ? '0' + e : '' + e
            },
            show() {
                this.$refs.dateDialogModal.show()
            },
            hide() {
                this.$refs.dateDialogModal.hide()
            },
            onChange(e) {
                this.value = e.detail.value
                let year = this.yearList[this.value[0]]
                let month = this.monthList[this.value[1]]
                let day = this.dayList[this.value[2]]
                let endDay = this.getMonthDay(year, month)
                if (this.dayList.length != endDay) {
                    // 需要改变日期列表
                    let temp = []
                    for (let i = 1; i <= endDay; i++) {
                        temp.push(i)
                    }
                    this.dayList = temp
                    // 如果当前日期超出最后一天初始化为当月第一天
                    if (day > endDay) {
                        this.value[2] = 0
                    }
                } else {
                    // 不需改变日期列表
                    // 如果当前日期超出最后一天初始化为当月第一天
                    if (day > endDay) {
                        this.value[2] = 0
                    }
                }
            },
            onSure() {
                let year = this.yearList[this.value[0]]
                let month = this.monthList[this.value[1]]
                let day = this.dayList[this.value[2]]
                let date = `${this.format(year)}-${this.format(month)}-${this.format(day)}`
                if (this.start && new Date(this.start).getTime() > new Date(date).getTime()) {
                    uni.showToast({
                        title: "当前选择时间早于开始时间！",
                        icon: "none"
                    })
                } else if (this.end && new Date(this.end).getTime() < new Date(date).getTime()) {
                    uni.showToast({
                        title: "当前选择时间迟于结束时间！",
                        icon: "none"
                    })
                } else {
                    this.$emit("change", date)
                    this.hide()
                }
            }
        }
    }
</script>

<style>
    .dialog-date-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #FFF;
    }

    .dialog-date-box {
        width: 100%;
        height: 400rpx;
    }

    .dialog-date-item {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        color: #000;
        text-align: center;
    }

    .dialog-date-btn {
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        font-size: 30rpx;
        color: #0076f6;
        border-top: solid 2rpx #eee;
        background-color: #fff;
    }

    .dailog-date-tip-box {
        display: flex;
        flex-direction: row;
        white-space: nowrap;
        width: 100%;
        height: 78rpx;
        line-height: 78rpx;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-size: 26rpx;
        color: #333;
        border-bottom: solid 2rpx #eee;
    }

    .dailog-date-tip-to {
        margin-left: 10rpx;
        margin-right: 10rpx;
    }
</style>
