<template>
    <view>
        <view v-if="tabs.length<=4&&mode=='normal'" class="it-box-normal">
            <uni-badge class="it-tab-item-normal" type="error" size="small" :text="tab.badge" absolute="rightTop"
                :offset="offset" v-for="(tab,index) in tabs" :key="index">
                <view class="it-tab-text-normal" @click="tabClick(index)">
                    <text :style="position==index?tabSelect:tabNormal">{{tabKey?tab[tabKey]:tab}}</text>
                </view>
            </uni-badge>
        </view>

        <scroll-view v-if="tabs.length>4&&mode=='normal'" scroll-x scroll-with-animation :scroll-left="scrollLeft"
            class="it-box-scroll">
            <view class="it-tab-box-scroll">
                <uni-badge class="it-tab-item-scroll" type="error" size="small" :text="tab.badge" absolute="rightTop"
                    :offset="offset" v-for="(tab,index) in tabs" :key="index">
                    <view class="it-tab-text-scroll" @click="tabClick(index)">
                        <text :style="position==index?tabSelect:tabNormal">{{tabKey?tab[tabKey]:tab}}</text>
                    </view>
                </uni-badge>
            </view>
        </scroll-view>

        <view v-if="mode=='round'|| mode=='square'" :class="mode=='round'?'it-tab-round':'it-tab-square'">
            <text :class="mode=='round'?'it-tab-round-item':'it-tab-square-item'"
                :style="position==index?tabItemSelect:tabItemNormal" v-for="(item,index) in tabs" :key="index"
                @click="tabClick(index)">
                {{item}}
            </text>
        </view>

    </view>
</template>

<script>
    /**
     * @description Tab
     * 
     * @property	{String}	mode        显示模式        [normal|round|square]
     * @property	{Array}		tabs		显示内容        []	    
     * @property	{String}	tabKey		显示关键字       ''
     * @property	{String}	sizeNormal  默认文字大小      28rpx	
     * @property	{String}	sizeSelect	选中文字大小      30rpx	
     * @property	{Boolean}	bold		选中文字放大      true	
     * @property	{String}	colorNormal	默认文字颜色      #333333	
     * @property	{Boolean}	colorSelect	选中文字颜色      #0076f6	
     * @property	{Boolean}	devide		是否显示下划线     true	
     * @property	{Array}		offset		小红点的位置      [15,10]	
     * 
     * @event {Function(tab)} change	tab切换效果 
     */
    export default {
        name: "item-tab",
        props: {
            mode: {
                type: String,
                default: 'normal'
            },
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
            tabItemSelect() {
                return {
                    'color': '#FFFFFF',
                    'background-color': this.colorSelect
                }
            },
            tabItemNormal() {
                return {
                    'color': this.colorSelect,
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

    .it-tab-round {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 70rpx;
        line-height: 70rpx;
        border-radius: 70rpx;
        overflow: hidden;
        border: solid 2rpx #0076f6;
    }

    .it-tab-square {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 70rpx;
        line-height: 70rpx;
        border-radius: 10rpx;
        overflow: hidden;
        border: solid 2rpx #0076f6;
    }

    .it-tab-round-item {
        display: flex;
        flex: 1;
        height: 100%;
        border-radius: 70rpx;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .it-tab-square-item {
        display: flex;
        flex: 1;
        height: 100%;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
</style>
