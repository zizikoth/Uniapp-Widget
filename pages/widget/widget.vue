<template>
    <view class="page">
        <title-bar title="组件" extraIcon="../../static/icon_setting.png" @extra="toast('title-bar extra()')" />
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

        <view class="input-item" style="margin-top: 15rpx;">
            <item-input-view type="date" title="主标题" hint="请选择日期" />
            <item-input-view type="text" title="主标题" must hint="请选择时间" arrowDown :value="dateTime" @change="showDTP" />
            <date-time-picker ref="dtp" @change="bindDateTime" />
            <item-input-view type="text" title="主标题" subTitle="最高100分" must hint="请输入数字" arrowDown :value="number"
                @change="showNK" />
            <number-keyboard ref="nk" @change="bindNumber" />
            <item-input-view type="picker" title="主标题" hint="请选择内容" :range="grid" rangeKey="name" />
            <item-input-view type="input" title="主标题" hint="请输入内容" />
            <item-input-view type="textarea" title="主标题" hint="请输入内容" />
            <item-input-view type="radio" title="主标题"
                :range="['aaaaaaaaaaaaaaaaaaaa','bbbbbbbbbbbbbbbbbbbb','cccccccccccccccccccc','dddddddddddddddddddd','eeeeeeeeeeeeeeeeeeee']"
                :radioIndex="0" @change="toast($event)" />
            <item-input-view type="check" title="主标题"
                :range="['aaaaaaaaaaaaaaaaaaaa','bbbbbbbbbbbbbbbbbbbb','cccccccccccccccccccc','dddddddddddddddddddd','eeeeeeeeeeeeeeeeeeee']"
                :checkIndex="[0,1]" @change="toast($event)" />
            <item-input-view type="image" title="附件" />
        </view>

        <view class="input-item">
            <nine-grid-image mode="show" :images="images" height="230" :maxLength="9" />
        </view>

        <view class="cell" style="margin-top: 15rpx;flex-direction: row;">
            <avatar name="张三" size="60" fontSize="30" />
            <avatar avatar="https://pic1.zhimg.com/80/v2-53d98d025e653bcdd18516c66b4e7ded_720w.jpg" name="张三" />
        </view>

        <view class="list" style="margin-top: 15rpx;">
            <common-list :list="newsList" cover="cover" title="title" content="content" time="time"
                @click="toast($event)" />
        </view>

        <load-more :status="1" @load="toast('加载更多')" />
        <load-more :status="2" />
        <load-more :status="3" />
        <load-more :status="4" empty="内容已被删除" />

    </view>
</template>

<script>
    import utils from '@/utils/Utils.js'
    export default {
        data() {
            return {
                show: true,
                number: '',
                dateTime: '',
                grid: [{
                    icon: '../../static/logo.png',
                    name: '国内新闻',
                    badge: 0
                }, {
                    icon: '../../static/logo.png',
                    name: '国际新闻',
                    badge: 1
                }, {
                    icon: '../../static/logo.png',
                    name: '本地新闻',
                    badge: 10
                }, {
                    icon: '../../static/logo.png',
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
                    title: '轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图轮播图2',
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
                }]
            }
        },
        onLoad(options) {
            console.log(options)
            this.images = this.banners.map(item => item.url)
            setTimeout(() => {
                this.show = false
            }, 1000)
        },
        methods: {
            toast(item) {
                console.log(item)
                utils.toast(item)
            },
            showNK() {
                this.$refs.nk.show(this.number)
            },
            showDTP() {
                this.$refs.dtp.show()
            },
            bindNumber(e) {
                if (e <= 100) {
                    this.number = e
                } else {
                    this.toast("最高100分")
                    this.$refs.nk.show(this.number)
                }
            },
            bindDateTime(e) {
                this.dateTime = e
            },
            changeImages(e) {
                this.toast(e.url)
                this.banners.push(this.banners[0])
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
    }
</style>
