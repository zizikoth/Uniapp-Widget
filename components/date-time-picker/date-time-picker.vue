<template>
    <view class="dtp-container" @touchmove.stop.prevent="moveHandle">
        <view v-if="visible" class="dtp-mask" :class="{'dtp-mask-show':visible}" @click="emptyClick()" />
        <view class="dtp-box hide" :class="{'show':visible}">
            <view class="dtp-item dtp-round" @click="onCancel()">
                <view class="down-arrow-black" />
            </view>
            <picker-view class="dtp-picker-box" indicator-style="height:80rpx;" :value="value" @change="onChange">
                <picker-view-column>
                    <view class="dtp-picker-text" v-for="(item,index) in yearList" :key="index">
                        {{format(item)}}年
                    </view>
                </picker-view-column>
                <picker-view-column>
                    <view class="dtp-picker-text" v-for="(item,index) in monthList" :key="index">
                        {{format(item)}}月
                    </view>
                </picker-view-column>
                <picker-view-column>
                    <view class="dtp-picker-text" v-for="(item,index) in dayList" :key="index">
                        {{format(item)}}日
                    </view>
                </picker-view-column>
                <picker-view-column>
                    <view class="dtp-picker-text" v-for="(item,index) in hourList" :key="index">
                        {{format(item)}}时
                    </view>
                </picker-view-column>
                <picker-view-column>
                    <view class="dtp-picker-text" v-for="(item,index) in minList" :key="index">
                        {{format(item)}}分
                    </view>
                </picker-view-column>
            </picker-view>

            <view class="dtp-button" @click="onSure">确定</view>
        </view>
    </view>
</template>

<script>
    /**
     * data-time-picker 
     * @description 日期时间选择器 
     * 如果开始时间和结束时间不合法，那么开始时间是当前时间100年前，结束时候是当前时间100年后
     * 如果当前时间在开始时间之前，那么当前时间是开始时间；如果当前时间在结束时间之后，那么当前时间是结束时间
     * 
     * @property	{String yyyy-MM-dd HH:mm} 	startTime	    默认:null     开始时间限制需要和结束时间同时存在
     * @property	{String yyyy-MM-dd HH:mm} 	endTime 	    默认:null     结束时间限制需要和开始时间同时存在
     * @property	{String yyyy-MM-dd HH:mm} 	currentTime     默认:null     当前时间
     * 
     * @event       {function}  show                        调用方法显示弹窗
     * @event       {function}  change    yyyy-MM-dd HH:mm  选中回调
     * @event       {function}  cancel                      隐藏回调      
     */
    export default {
        name: "date-time-picker",
        props: {
            startTime: {
                type: String,
                default: null
            },
            endTime: {
                type: String,
                default: null
            },
            currentTime: {
                type: String,
                default: null
            }
        },
        data() {
            return {
                visible: false,
                start: {},
                end: {},
                current: {},
                value: [],
                yearList: [],
                monthList: [],
                dayList: [],
                hourList: [],
                minList: [],
            };
        },
        mounted() {
            this.initTime()
        },
        methods: {
            moveHandle() {
                return false
            },
            show() {
                this.visible = true
            },
            onCancel() {
                this.$emit("cancel")
                this.visible = false
            },
            onSure() {
                this.visible = false
                let year = this.yearList[this.value[0]]
                let month = this.monthList[this.value[1]]
                let day = this.dayList[this.value[2]]
                let hour = this.hourList[this.value[3]]
                let min = this.minList[this.value[4]]
                let date =
                    `${this.format(year)}-${this.format(month)}-${this.format(day)} ${this.format(hour)}:${this.format(min)}`

                if (new Date(this.start.date).getTime() > new Date(date).getTime()) {
                    uni.showToast({
                        title: "当前选择时间早于开始时间！",
                        icon: "none"
                    })
                } else if (new Date(this.end.date).getTime() < new Date(date).getTime()) {
                    uni.showToast({
                        title: "当前选择时间迟于结束时间！",
                        icon: "none"
                    })
                } else {
                    this.$emit("change", date)
                }
            },
            getMonthDay(year, month) {
                if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                    return 31
                } else if (month == 4 || month == 6 || month == 9 || month == 11) {
                    return 30
                } else if (year % 400 == 0 || (year % 400 != 0 && year % 4 == 0)) {
                    return 29
                } else {
                    return 28
                }
            },
            format(e) {
                return e < 10 ? '0' + e : '' + e
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
            emptyClick() {
                console.log("点击背景")
            },
            initTime() {
                // 首先判断开始时间和结束时间的逻辑是否正确
                let startTimestamp = this.startTime == null ? 0 : new Date(this.startTime).getTime()
                let endTimestamp = this.endTime == null ? 0 : new Date(this.endTime).getTime()
                if (startTimestamp != 0 && endTimestamp != 0 && startTimestamp <= endTimestamp) {
                    // 处理传入的开始和结束时间
                    let date = new Date(this.startTime)
                    this.start = {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        hour: date.getHours(),
                        min: date.getMinutes(),
                        date: `${date.getFullYear()}-${this.format(date.getMonth()+1)}-${this.format(date.getDate())} ${this.format(date.getHours())}:${this.format(date.getMinutes())}`
                    }
                    date = new Date(this.endTime)
                    this.end = {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        hour: date.getHours(),
                        min: date.getMinutes(),
                        date: `${date.getFullYear()}-${this.format(date.getMonth()+1)}-${this.format(date.getDate())} ${this.format(date.getHours())}:${this.format(date.getMinutes())}`
                    }
                } else {
                    // 自行处理开始和结束时间
                    let date = new Date()
                    this.start = {
                        year: date.getFullYear() - 100,
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        hour: 0,
                        min: 0,
                        date: `${date.getFullYear()-100}-${this.format(date.getMonth()+1)}-${this.format(date.getDate())} 00:00`
                    }
                    this.end = {
                        year: date.getFullYear() + 100,
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        hour: 23,
                        min: 59,
                        date: `${date.getFullYear()+100}-${this.format(date.getMonth()+1)}-${this.format(date.getDate())} 23:59`
                    }
                }
                // 判断当前时间
                let curTimestamp = this.currentTime == null ? new Date().getTime() :
                    new Date(this.currentTime).getTime()
                startTimestamp = new Date(this.start.date).getTime()
                endTimestamp = new Date(this.end.date).getTime()

                if (curTimestamp < startTimestamp) {
                    this.current = this.start
                } else if (curTimestamp > endTimestamp) {
                    this.current = this.end
                } else {
                    let date = new Date(curTimestamp)
                    this.current = {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        hour: date.getHours(),
                        min: date.getMinutes(),
                        date: `${date.getFullYear()}-${this.format(date.getMonth()+1)}-${this.format(date.getDate())} ${this.format(date.getHours())}:${this.format(date.getMinutes())}`
                    }
                }
                console.log("开始时间：" + this.start.date + "\n结束时间：" + this.end.date + "\n当前时间：" + this.current.date)
                this.yearList = []
                for (let i = this.start.year; i <= this.end.year; i++) {
                    this.yearList.push(i)
                }
                this.monthList = []
                for (let i = 1; i <= 12; i++) {
                    this.monthList.push(i)
                }
                this.dayList = []
                let totalDay = this.getMonthDay(this.current.year, this.current.month)
                for (let i = 1; i <= totalDay; i++) {
                    this.dayList.push(i)
                }
                this.hourList = []
                for (let i = 0; i < 24; i++) {
                    this.hourList.push(i)
                }
                this.minList = []
                for (let i = 0; i < 60; i++) {
                    this.minList.push(i)
                }
                this.value = [
                    this.yearList.indexOf(this.current.year),
                    this.monthList.indexOf(this.current.month),
                    this.dayList.indexOf(this.current.day),
                    this.hourList.indexOf(this.current.hour),
                    this.minList.indexOf(this.current.min),
                ]
            },
        }
    }
</script>

<style>
    .dtp-container {
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .dtp-mask {
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

    .dtp-mask-show {
        opacity: 1
    }

    .dtp-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: fixed;
        left: 0rpx;
        bottom: 0rpx;
        z-index: 1000;
    }

    .dtp-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 90rpx;
        border-top: solid 4rpx #f5f5f5;
        background-color: #fff;
    }

    .dtp-round {
        border-top-left-radius: 40rpx;
        border-top-right-radius: 40rpx;
        align-items: center;
        justify-content: center;
        border-top: solid 4rpx #f5f5f5;
        box-shadow: 0rpx 20rpx 30rpx 20rpx #aaa;
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

    .dtp-picker-box {
        width: 100%;
        height: 400rpx;
        background-color: #fff;
    }

    .dtp-picker-text {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        color: #666;
        text-align: center;
    }

    .dtp-button {
        width: 100%;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        font-size: 30rpx;
        color: #333333;
        border-top: solid 2rpx #eee;
        background-color: #fff;
    }
</style>
