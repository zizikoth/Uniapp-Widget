<template>
    <view class="calendar">
        <text class="calendar-month-background">{{curDate.month}}</text>
        <view class="calendar-cell">
            <view class="calendar-last-month" @click="onLastMonth()" />
            <picker class="calendar-title" mode="date" fields="month" @change="onChangeMonth" :value="curDate.date">
                <text class="calendar-title">{{curDate.date}}</text>
            </picker>
            <view class="calendar-next-month" @click="onNextMonth()" />
            <text class="calendar-back-today" @click="onBackToday()">回到今天</text>
        </view>
        <view class="calendar-cell">
            <text class="calendar-item-box" v-for="(label,index) in label" :key="index">周{{label}}</text>
        </view>
        <view class="calendar-day-box">
            <view class="calendar-item-box" v-for="(item,position) in curDayList" :key="position"
                @click="onChangeDay(item)">
                <view v-if="item"
                    :class="item.date==selectDate.date?'calendar-day-item-select':'calendar-day-item-normal'">
                    <text>{{item.day}}</text>
                    <text v-if="item.mark&&item.mark.text" class="calendar-mark-text"
                        :style="{color:item.date==selectDate.date?'#FFF':item.mark.color}">
                        {{item.mark.text}}
                    </text>
                    <view v-if="item.mark&&item.mark.dot" class="calendar-day-item-dot" />
                    <text v-if="item.mark&&item.mark.dot!=true&&item.mark.count>0" class="calendar-day-item-count">
                        {{item.mark.count>99?'99+':item.mark.count}}
                    </text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * 日历组件
     * @property {Array} mark = [{date,count,text,color,dot}]    日历标记
     *  date    标记日期
     *  count   标记显示数量    大于0才显示文字  无论多少都显示小红点
     *  text    标记显示文字
     *  color   标记文字颜色
     *  dot     标记显示       true=小红点   false=count的数字    默认false
     */
    const nowDate = new Date()
    export default {
        name: "calendar",
        props: {
            mark: {
                type: Array,
                default: () => []
            }
        },
        watch: {
            mark(newMark) {
                this._buildData(this.selectDate.year, this.selectDate.month, this.selectDate.day)
            },
            immediate: true
        },
        data() {
            return {
                selectDate: {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    day: nowDate.getDate(),
                    date: `${this._formatNum(nowDate.getFullYear())}-${this._formatNum(nowDate.getMonth()+1)}-${this._formatNum(nowDate.getDate())}`,
                    mark: null
                },
                curDate: {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: `${this._formatNum(nowDate.getFullYear())}-${this._formatNum(nowDate.getMonth()+1)}`
                },
                curDayList: [],
                label: ["日", "一", "二", "三", "四", "五", "六"],
                day31Months: [1, 3, 5, 7, 8, 10, 12],
                day30Months: [4, 6, 9, 11]
            };
        },
        mounted() {
            this._buildData()
        },
        methods: {
            _formatNum(num) {
                return num < 10 ? '0' + num : '' + num
            },
            _buildData() {
                let year = this.curDate.year
                let month = this.curDate.month
                // 判断当前月份有几天
                let size = 0
                if (this.day31Months.some(item => item == month)) {
                    size = 31
                } else if (this.day30Months.some(item => item == month)) {
                    size = 30
                } else {
                    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                        size = 29
                    } else {
                        size = 28
                    }
                }

                let dayList = []
                let first = new Date(`${year}-${month}-1`).getDay()
                // 先加空白
                for (var i = 0; i < first; i++) {
                    dayList.push('')
                }
                // 再加日期
                for (i = 1; i <= size; i++) {
                    let date = `${this._formatNum(year)}-${this._formatNum(month)}-${this._formatNum(i)}`
                    let markList = this.mark.filter(mark => mark.date == date)
                    let mark = markList.length == 0 ? null : markList[0]
                    let data = {
                        year: year,
                        month: month,
                        day: i,
                        date: date,
                        mark: mark
                    }
                    // 赋值mark
                    if (year == this.selectDate.year && month == this.selectDate.month && i == this.selectDate.day) {
                        this.selectDate = data
                    }
                    dayList.push(data)
                }
                this.curDayList = dayList
            },
            // 切换上一个月
            onLastMonth() {
                let year = this.curDate.month == 1 ? this.curDate.year - 1 : this.curDate.year
                let month = this.curDate.month == 1 ? 12 : this.curDate.month - 1
                this.curDate = {
                    year: year,
                    month: month,
                    date: `${this._formatNum(year)}-${this._formatNum(month)}`
                }
                this._buildData()
                this.onEmitChangeDate()
            },
            // 切换下一个月
            onNextMonth() {
                let year = this.curDate.month == 12 ? this.curDate.year + 1 : this.curDate.year
                let month = this.curDate.month == 12 ? 1 : this.curDate.month + 1
                this.curDate = {
                    year: year,
                    month: month,
                    date: `${this._formatNum(year)}-${this._formatNum(month)}`
                }
                this._buildData()
                this.onEmitChangeDate()
            },
            // 切换年月
            onChangeMonth(e) {
                let year = Number(e.detail.value.substring(0, 4))
                let month = Number(e.detail.value.substring(5))
                if (year != this.curDate.year || month != this.curDate.month) {
                    this.curDate = {
                        year: year,
                        month: month,
                        date: `${this._formatNum(year)}-${this._formatNum(month)}`
                    }
                    this._buildData()
                    this.onEmitChangeDate()
                }
            },
            // 回到今天
            onBackToday() {
                let now = new Date()
                let year = now.getFullYear()
                let month = now.getMonth() + 1
                let day = now.getDate()
                let isMonthChange = year != this.curDate.year || month != this.curDate.month
                let isDateChange = year != this.selectDate.year ||
                    month != this.selectDate.month ||
                    day != this.selectDate.day
                this.selectDate = {
                    year: year,
                    month: month,
                    day: day
                }
                this.curDate = {
                    year: year,
                    month: month,
                    date: `${this._formatNum(year)}-${this._formatNum(month)}`
                }
                this._buildData()
                if (isDateChange || isMonthChange) this.onEmitChangeDate()
            },
            // 切换日期
            onChangeDay(date) {
                let isDifferentDate = date.year != this.selectDate.year ||
                    date.month != this.selectDate.month ||
                    date.day != this.selectDate.day
                if (date != '' && isDifferentDate) {
                    this.selectDate = date
                    this.onEmitChangeDate()
                }
            },
            // 抛出方法
            onEmitChangeDate() {
                this.$emit("change", {
                    selectDate: this.selectDate,
                    curDate: this.curDate
                })
            },
        }
    }
</script>

<style>
    .calendar {
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: #FFFFFF;
        width: 100%;
        height: 760rpx;
    }

    .calendar-month-background {
        position: absolute;
        top: 260rpx;
        left: 0;
        font-size: 300rpx;
        color: #EEEEEE;
        width: 100%;
        height: 300rpx;
        line-height: 300rpx;
        text-align: center;
        font-weight: bold;
    }

    .calendar-cell {
        display: flex;
        flex-direction: row;
        position: relative;
        width: 100%;
        height: 80rpx;
        align-items: center;
        justify-content: center;
    }

    .calendar-back-today {
        position: absolute;
        width: 130rpx;
        height: 40rpx;
        line-height: 40rpx;
        text-align: center;
        background-color: #0076f6;
        border-top-left-radius: 40rpx;
        border-bottom-left-radius: 40rpx;
        font-size: 24rpx;
        color: #FFFFFF;
        top: 20rpx;
        right: 0;
    }

    .calendar-last-month {
        margin-left: 15rpx;
        color: #333333;
        width: 20rpx;
        height: 20rpx;
        position: relative;
        border-bottom: 6rpx solid #333333;
        border-left: 6rpx solid #333333;
        transform: rotate(45deg);
        border-radius: 4rpx;
    }

    .calendar-next-month {
        margin-left: 15rpx;
        color: #333333;
        width: 20rpx;
        height: 20rpx;
        position: relative;
        border-bottom: 6rpx solid #333333;
        border-right: 6rpx solid #333333;
        transform: rotate(-45deg);
        border-radius: 4rpx;
    }

    .calendar-title {
        width: 250rpx;
        font-size: 40rpx;
        font-weight: bold;
        color: #333333;
        line-height: 80rpx;
        text-align: center;
    }

    .calendar-day-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .calendar-item-box {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 14.28%;
        height: 100rpx;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        color: #333333;
    }

    .calendar-day-item-normal {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 80rpx;
        height: 80rpx;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 28rpx;
        line-height: 30rpx;
        color: #333333;
    }

    .calendar-day-item-select {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 80rpx;
        height: 80rpx;
        border-radius: 80rpx;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 28rpx;
        line-height: 30rpx;
        color: #FFFFFF;
        background-color: #0076f6;
    }

    .calendar-day-item-dot {
        width: 13rpx;
        height: 13rpx;
        border-radius: 15rpx;
        background-color: #dd524d;
        position: absolute;
        top: 5rpx;
        right: 5rpx;
        border: solid 2rpx #FFFFFF;
    }

    .calendar-day-item-count {
        color: #FFFFFF;
        background-color: #dd524d;
        padding-left: 8rpx;
        padding-right: 8rpx;
        height: 30rpx;
        min-width: 14rpx;
        line-height: 30rpx;
        font-size: 18rpx;
        border-radius: 30rpx;
        text-align: center;
        position: absolute;
        top: -10rpx;
        right: -15rpx;
        border: solid 2rpx #FFFFFF;
    }

    .calendar-mark-text {
        font-size: 20rpx;
        color: #999999;
    }
</style>
