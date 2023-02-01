<template>
    <view>
        <dialog-modal ref="dateTimeDialogModal">
            <view class="dtp-tip-box" v-if="startTime||endTime">
                <text v-if="startTime&&!endTime">开始时间：</text>
                <text v-if="startTime">{{startTime}}</text>
                <text v-if="startTime&&endTime" class="dtp-tip-to">至</text>
                <text v-if="!startTime&&endTime">结束时间：</text>
                <text v-if="endTime">{{endTime}}</text>
            </view>
            <view class="dtp-container">
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
        </dialog-modal>
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
     * @event       {function}  cancel                      调用方法隐藏弹窗  
     * @event       {function}  change    yyyy-MM-dd HH:mm  选中回调    
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
            show() {
                this.$refs.dateTimeDialogModal.show()
            },
            hide() {
                this.$refs.dateTimeDialogModal.hide()
            },
            onSure() {
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
                    this.hide()
                }
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
            initTime() {
                // 首先判断开始时间和结束时间的逻辑是否正确
                let startTimestamp = this.startTime ? new Date(this.startTime).getTime() : 0
                let endTimestamp = this.endTime ? new Date(this.endTime).getTime() : 0
                let curTimestamp = this.currentTime ? new Date(this.currentTime).getTime() : new Date().getTime()
                // 开始时间
                if (startTimestamp == 0) {
                    this.start = {
                        year: 1900,
                        month: 1,
                        day: 1,
                        hour: 0,
                        min: 0,
                        date: '1900-01-01 00:00'
                    }
                } else {
                    let date = new Date(this.startTime)
                    this.start = {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        hour: date.getHours(),
                        min: date.getMinutes(),
                        date: `${date.getFullYear()}-${this.format(date.getMonth()+1)}-${this.format(date.getDate())} ${this.format(date.getHours())}:${this.format(date.getMinutes())}`
                    }
                }
                // 结束时间
                if (endTimestamp == 0 || endTimestamp < startTimestamp) {
                    let date = new Date()
                    this.end = {
                        year: date.getFullYear() + 100,
                        month: 1,
                        day: 1,
                        hour: 0,
                        min: 0,
                        date: `${date.getFullYear()+100}-01-01 00:00`
                    }
                } else {
                    let date = new Date(this.endTime)
                    this.end = {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        hour: date.getHours(),
                        min: date.getMinutes(),
                        date: `${date.getFullYear()}-${this.format(date.getMonth()+1)}-${this.format(date.getDate())} ${this.format(date.getHours())}:${this.format(date.getMinutes())}`
                    }
                }
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
        width: 100%;
    }

    .dtp-tip-box {
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

    .dtp-tip-to {
        margin-left: 10rpx;
        margin-right: 10rpx;
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
        color: #000;
        text-align: center;
    }

    .dtp-button {
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
