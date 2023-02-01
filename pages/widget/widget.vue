<template>
    <view class="page">
        <title-bar title="组件" extraIcon="../../static/icon_setting.png" @extra="onTitleExtra" />
        <page-holder top="90" :show="show" />
        <view style="margin-top: 25rpx;margin-bottom: 25rpx;">
            <banner :banner="banners" bannerKey="url" titleKey="title" sourceKey="source" @click="changeImages" />
        </view>
        <view class="cell">
            <search-bar />
        </view>
        <view class="item">
            <grid :grid="grid.concat(grid)" @click="toast($event)" />
        </view>

        <view class="item">
            <tab :tabs="['tab1','tab2','tab3']" :divide="false" @change="toast($event)" />
            <tab :tabs="grid" tabKey="name" />
            <tab :tabs="grid.concat(grid)" tabKey="name" :offset="[10,10]" />
            <view class="tab-round">
                <tab mode="round" :tabs="['tab1','tab2','tab3']" tabKey="name" />
            </view>
            <view class="tab-round">
                <tab mode="square" :tabs="['tab1','tab2','tab3']" tabKey="name" />
            </view>
        </view>

        <view class="item">
            <item-label title="主标题" subTitle="(副标题)" extra="更多" arrow line @click="toast('item-label click()')" />
            <item-label title="主标题" />
        </view>

        <view class="cell" style="margin-top: 15rpx;">
            <item-icon-cell icon="../../static/logo.png" title="主标题" subTitle="副标题" :badge="1" line />
            <item-icon-cell icon="../../static/logo.png" title="主标题" dot @click="toast('item-icon-cell click()')" />
        </view>

        <view class="cell" style="margin-top: 15rpx;">
            <item-cell marginBottom="20" title="主标题" :content="`长度(${grid.length})`"
                @click="toast('item-cell click()')" />
            <item-cell marginBottom="20" title="主标题主标题主标题" content="内容" :justify="false" />
            <item-cell marginBottom="20" title="主标题" content="内容" extra="（额外内容）"
                @extraClick="toast('item-cell extraClick()')" />
        </view>

        <view class="input-item-view">
            <item-input-view type="text" must title="年月日时分" titleWidth="150" arrow="bottom" :value="value.dateTime"
                @change="showDateTimeDialog" />
            <dialog-date-time ref="dateTimeDialog" @change="bindDateTime" />
            <item-input-view type="text" must title="年月日" titleWidth="150" arrow="bottom" :value="value.date"
                @change="showDateDialog" />
            <dialog-date ref="dateDialog" @change="bindDate" />
            <item-input-view type="customH" must title="开始结束" titleWidth="150">
                <view class="custom">
                    <view class="time-item" :class="{'time-value':value.startDate}" @click="showStartDateDialog">
                        <text>{{value.startDate?value.startDate:"请选开始时间"}}</text>
                        <arrow arrow="bottom" />
                    </view>
                    <view class="time-item" :class="{'time-value':value.endDate}" @click="showEndDateDialog">
                        <text>{{value.endDate?value.endDate:"请选结束时间"}}</text>
                        <arrow arrow="bottom" />
                    </view>
                </view>
            </item-input-view>
            <dialog-date ref="startDateDialog" @change="bindStartDate" />
            <dialog-date ref="endDateDialog" @change="bindEndDate" />
            <item-input-view type="text" must title="金额" titleWidth="150" arrow="right" :value="value.number"
                hint="请输入金额" @change="showNumberDialog" />
            <dialog-number ref="numberDialog" @change="bindNumber" />
            <item-input-view type="text" must title="单项弹窗" titleWidth="150" arrow="bottom" :value="value.picker"
                @change="showPickerDialog" />
            <dialog-picker ref="pickerDialog" :range="banners" rangeKey="title" @change="bindPicker" />
            <item-input-view type="either" must title="单项选择" :range="grid" rangeKey="name" :value="value.either"
                @change="bindEither" />
            <item-input-view type="input" must title="单行输入" :value="value.input" @change="bindInput" />
            <item-input-view type="textarea" must title="多行输入" :value="value.textarea" @change="bindTextarea" />
            <item-input-view type="image" must title="图片选择" :value="value.images" @change="bindImage" />

        </view>

        <view class="input-item">
            <nine-grid-image mode="show" :images="images.concat(images).concat(images)" height="240" :maxLength="9" />
        </view>

        <view class="cell" style="margin-top: 15rpx;flex-direction: row;">
            <avatar name="张三" size="60" fontSize="30" />
            <avatar name="张三" size="60" fontSize="30" circle />
            <avatar avatar="https://pic1.zhimg.com/80/v2-53d98d025e653bcdd18516c66b4e7ded_720w.jpg" name="张三"
                radius="30" />
            <avatar avatar="https://pic1.zhimg.com/80/v2-53d98d025e653bcdd18516c66b4e7ded_720w.jpg" name="张三" circle />
        </view>

        <view class="list" style="margin-top: 15rpx;">
            <common-list :list="newsList" coverKey="cover" titleKey="title" contentKey="content" timeKey="time"
                @click="toast($event)" />
        </view>

        <load-more :status="1" @load="toast('加载更多')" />
        <load-more :status="2" />
        <load-more :status="3" />
        <load-more :status="4" empty="内容已被删除" />

        <calendar :mark="mark" @change="onChangeDate" />

        <view class="cell">
            <line-bar :progress="progress" />
            <view style="height: 20rpx;" />
            <view style="display: flex; flex-direction: row;">
                <view style="display:flex;flex: 1;align-items: center;">
                    <line-bar anim :progress="progress" active="linear-gradient(90deg, #0f0,#0ff)" />
                </view>
                <text class="text">{{progress}}%</text>
            </view>
            <view style="height: 20rpx;" />
            <circle-bar :progress="progress" canvasId="bar1" />
            <view style="height: 20rpx;" />
            <circle-bar anim :progress="progress" canvasId="bar2">
                <text class="text">{{progress}}%</text>
            </circle-bar>
            <text class="button" style="margin-top: 30rpx;" @click="onChangeProgress">改变进度0-100</text>
        </view>

        <float-list-btn ref="floatBtn" height="200">
            <image class="float-icon" src="/static/logo.png" @click.top="onFloatClick('条目1')" />
            <image class="float-icon" src="/static/logo.png" @click.top="onFloatClick('条目2')" />
        </float-list-btn>

        <dialog-modal ref="dialog" />
    </view>
</template>

<script>
    import utils from '@/utils/utils.js'
    export default {
        data() {
            return {
                show: false,
                number: '',
                dateTime: '',
                grid: [{
                    id: 0,
                    icon: '/static/logo.png',
                    name: '国内新闻',
                    badge: 0
                }, {
                    id: 1,
                    icon: '/static/logo.png',
                    name: '国际新闻',
                    badge: 1
                }, {
                    id: 2,
                    icon: '/static/logo.png',
                    name: '本地新闻',
                    badge: 10
                }, {
                    id: 3,
                    icon: '/static/logo.png',
                    name: '地市新闻',
                    badge: 100
                }],
                images: [],
                banners: [{
                    url: 'https://pic1.zhimg.com/80/v2-53d98d025e653bcdd18516c66b4e7ded_720w.jpg',
                    title: '轮播图1',
                    source: '环球日报'
                }, {
                    url: 'https://pic2.zhimg.com/80/v2-d7bee94aabb2f2999f1d60523b724e63_720w.jpg',
                    title: '轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图2',
                    source: '环球日报'
                }, {
                    url: 'https://pic1.zhimg.com/80/v2-1ed0f37177bd9735ab09dcdfde99c8f4_720w.jpg',
                    title: '轮播图3',
                    source: '环球日报'
                }, {
                    url: 'https://pic4.zhimg.com/80/v2-903b496f4563959da9291bf0bc58bb46_720w.jpg',
                    title: '轮播图4',
                    source: '环球日报'
                }],
                value: {
                    dateTime: "",
                    date: "",
                    startDate: "",
                    endDate: "",
                    number: "",
                    picker: "",
                    either: "",
                    input: "",
                    textarea: "",
                    images: []
                },
                newsList: [{
                    cover: 'https://pic1.zhimg.com/80/v2-53d98d025e653bcdd18516c66b4e7ded_720w.jpg',
                    title: '这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题',
                    content: '这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容',
                    time: '2020-09-09 19:09:09'
                }, {
                    title: '这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题',
                    content: '这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容',
                    time: '2020-09-09 19:09:09'
                }, {
                    cover: 'https://pic1.zhimg.com/80/v2-53d98d025e653bcdd18516c66b4e7ded_720w.jpg',
                    title: '这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题',
                    time: '2020-09-09 19:09:09'
                }, {
                    cover: 'https://pic1.zhimg.com/80/v2-53d98d025e653bcdd18516c66b4e7ded_720w.jpg',
                    content: '这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容',
                    time: '2020-09-09 19:09:09'
                }],
                mark: [],
                progress: 0,
            }
        },
        onLoad(options) {
            this.images = this.banners.map(item => item.url)
            let i = 1
            while (i <= 12) {
                this.mark.push({
                    id: 1,
                    date: `2022-${(i<10?'0':'')+i}-01`,
                    text: '出差',
                    dot: i % 2 == 0,
                    color: '#dd524d',
                    count: i * 10
                })
                i++
            }
        },
        methods: {
            toast(item) {
                console.log(item)
                utils.toast(item)
            },
            onTitleExtra() {
                this.show = true
                setTimeout(() => {
                    this.show = false
                }, 1000)
            },
            showDateTimeDialog() {
                this.$refs.dateTimeDialog.show()
            },
            bindDateTime(e) {
                this.value.dateTime = e
            },
            showDateDialog() {
                this.$refs.dateDialog.show()
            },
            bindDate(e) {
                this.value.date = e
            },
            showStartDateDialog() {
                this.$refs.startDateDialog.show()
            },
            bindStartDate(e) {
                this.value.startDate = e
            },
            showEndDateDialog() {
                this.$refs.endDateDialog.show()
            },
            bindEndDate(e) {
                this.value.endDate = e
            },
            showNumberDialog() {
                this.$refs.numberDialog.show(123)
            },
            bindNumber(e) {
                this.value.number = e
            },
            showPickerDialog() {
                this.$refs.pickerDialog.show()
            },
            bindPicker(e) {
                this.value.picker = e.title
            },
            bindEither(e) {
                this.value.either = e.id
            },
            bindInput(e) {
                this.value.input = e
            },
            bindTextarea(e) {
                this.value.textarea = e
            },
            bindImage(e) {
                this.value.images = e
            },

            onChangeDate(date) {
                console.log("日期切换", date)
            },
            onChangeProgress() {
                this.progress = this.progress >= 100 ? 0 : this.progress + 20
            },
            onFloatClick(text) {
                this.$refs.floatBtn.close()
                this.toast(text)
                this.$refs.dialog.show()
            }
        }
    }
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-top: 90rpx;
    }

    .cell {
        display: flex;
        flex-direction: column;
        width: calc(100% - 50rpx);
        padding: 25rpx;
        background-color: #FFFFFF;
    }

    .item {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #FFFFFF;
        margin-top: 15rpx;
    }

    .list {
        background-color: #FFFFFF;
        width: calc(100% - 50rpx);
        padding-left: 25rpx;
        padding-right: 25rpx;
    }

    .sticky {
        position: sticky;
        top: 90rpx;
        z-index: 100;
    }

    .tab-round {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10rpx;
        margin-bottom: 10rpx;
    }

    .input-item {
        width: calc(100% - 30rpx);
        margin-left: 15rpx;
        margin-right: 15rpx;
        background-color: #FFFFFF;
    }

    .text {
        font-size: 28rpx;
        color: #333;
        width: 100rpx;
        text-align: center;
    }


    .float-icon {
        width: 70rpx;
        height: 70rpx;
        min-height: 70rpx;
        border-radius: 70rpx;
        margin: 15rpx;
    }

    .input-item-view {
        display: flex;
        flex-direction: column;
        width: calc(100% - 120rpx);
        margin: 30rpx;
        padding: 30rpx;
        background-color: #FFF;
        border-radius: 16rpx;
    }

    .custom {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 160rpx;
    }

    .time-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        font-size: 28rpx;
        color: #999;
        height: 80rpx;
        line-height: 80rpx;
        text-align: end;
    }

    .time-value {
        font-size: 28rpx;
        color: #333;
    }
</style>
