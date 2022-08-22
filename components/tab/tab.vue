<template>
    <view>
        <view v-if="tabs.length<=4" class="it-box-normal">
            <uni-badge class="it-tab-item-normal" type="error" size="small" :text="tab.badge" absolute="rightTop"
                :offset="offset" v-for="(tab,index) in tabs" :key="index">
                <view class="it-tab-text-normal" @click="tabClick(index)">
                    <text :style="position==index?tabSelect:tabNormal">{{tabKey?tab[tabKey]:tab}}</text>
                </view>
            </uni-badge>
        </view>

        <scroll-view v-else scroll-x scroll-with-animation :scroll-left="scrollLeft" class="it-box-scroll">
            <view class="it-tab-box-scroll">
                <uni-badge class="it-tab-item-scroll" type="error" size="small" :text="tab.badge" absolute="rightTop"
                    :offset="offset" v-for="(tab,index) in tabs" :key="index">
                    <view class="it-tab-text-scroll" @click="tabClick(index)">
                        <text :style="position==index?tabSelect:tabNormal">{{tabKey?tab[tabKey]:tab}}</text>
                    </view>
                </uni-badge>
            </view>
        </scroll-view>
    </view>
</template>

<script>
    /**
     * @description Tab
     * 
     * @property	{Array}		tabs		显示内容	
     * @property	{String}	tabKey		显示关键字	
     * @property	{String}	sizeNormal	默认文字大小	
     * @property	{String}	sizeSelect	选中文字大小	
     * @property	{Boolean}	bold		选中文字放大	
     * @property	{String}	colorNormal	默认文字颜色	
     * @property	{Boolean}	colorSelect	选中文字颜色	
     * @property	{Boolean}	devide		是否显示下划线	
     * @property	{Array}		offset		小红点的位置	
     * 
     * @event {Function(tab)} change	tab切换效果 
     */
    export default {
        name: "item-tab",
        props: {
            tabs: {
                type: Array,
                default: () => []
            },
            tabKey: {
                type: String,
                default: ''
            },
            sizeNormal: {
                type: String,
                default: '28'
            },
            sizeSelect: {
                type: String,
                default: '30'
            },
            bold: {
                type: Boolean,
                default: true
            },
            colorNormal: {
                type: String,
                default: '#333333'
            },
            colorSelect: {
                type: String,
                default: '#0076f6'
            },
            divide: {
                type: Boolean,
                default: true
            },
            offset: {
                type: Array,
                default: () => [15, 10]
            }
        },
        computed: {
            tabNormal() {
                return {
                    'height': '86rpx',
                    'line-height': '86rpx',
                    'text-align': 'center',
                    'font-size': this.sizeNormal + 'rpx',
                    'color': this.colorNormal,
                    'border-bottom': 'solid 4rpx #FFFFFF'
                }
            },
            tabSelect() {
                return {
                    'height': '86rpx',
                    'line-height': '86rpx',
                    'text-align': 'center',
                    'font-size': this.sizeSelect + 'rpx',
                    'color': this.colorSelect,
                    'font-weight': this.bold ? 'bold' : 'normal',
                    'border-bottom': 'solid 4rpx ' + (this.divide ? this.colorSelect : '#FFFFFF'),
                }
            },
            tabDivider() {
                return {
                    'width': '100rpx',
                    'height': '4rpx',
                    'background-color': this.colorSelect
                }
            }
        },
        data() {
            return {
                position: 0,
                scrollLeft: 0
            }
        },
        methods: {
            tabClick(index) {
                let tab = this.tabs[index]
                if (index != this.position) {
                    this.position = index
                    if (this.tabs.length > 4) {
                        if (index < 3) {
                            // 前三个左侧置顶
                            this.scrollLeft = 0
                        } else {
                            this.scrollLeft = (index - 2) * uni.upx2px(150)
                        }
                    }
                    this.$emit('change', tab)
                }
            }
        }
    }
</script>

<style>
    .it-box-normal {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 90rpx;
        background-color: #FFFFFF;
    }

    .it-tab-item-normal {
        display: flex;
        flex-direction: column;
        width: 25%;
        height: 100%;
        align-items: center;
    }

    .it-tab-text-normal {
        display: flex;
        flex-direction: column;
        width: 170rpx;
        height: 100%;
        align-items: center;
    }

    .it-box-scroll {
        display: flex;
        flex-direction: row;
        white-space: nowrap;
        width: 100%;
        height: 90rpx;
    }

    .it-tab-box-scroll {
        display: flex;
        flex-direction: row;
        height: 100%;
    }

    .it-tab-item-scroll {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: center;
    }

    .it-tab-text-scroll {
        display: inline-flex;
        flex-direction: column;
        width: 150rpx;
        height: 100%;
        align-items: center;
    }

    /deep/ ::-webkit-scrollbar {
        display: block;
        width: 0px !important;
        height: 0px !important;
        -webkit-appearance: auto !important;
        background: transparent;
        overflow: auto !important;
    }
</style>
