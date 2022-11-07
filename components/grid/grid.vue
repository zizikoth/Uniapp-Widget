<template>
    <view class="item-grid-box">
        <view class="item-grid-item-box" :style="{'width':(100/column)+'%'}" v-for="(item,index) in grid" :key='index'
            @click="click(item)">
            <badge size="small" absolute="rightTop" type="error" :text="item.badge">
                <view class="item-grid-item">
                    <image :src="item.icon" :style="{
						width:iconSize+'rpx',
						height:iconSize+'rpx'
					}" />
                    <text class="item-grid-title" :style="{
						fontSize:fontSize+'rpx'
					}">{{item.name}}</text>
                </view>
            </badge>
        </view>
    </view>
</template>

<script>
    /**
     * @description 模块宫格控件
     * 
     * @property	{Array}		grid	宫格列表		
     * [{icon:'../../static/icon_module.png',name:'模块名称',badge:99}]
     * 
     * @event {Function(item)} click 模块点击 
     */
    export default {
        name: "item-grid",
        props: {
            grid: {
                type: Array,
                default: () => []
            },
            column: {
                type: Number,
                default: 4
            },
            iconSize: {
                type: String,
                default: '80'
            },
            fontSize: {
                type: String,
                default: '28'
            }
        },
        methods: {
            click(item) {
                this.$emit('click', item)
            }
        }
    }
</script>

<style>
    .item-grid-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }



    .item-grid-item-box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 180rpx;
    }

    .item-grid-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .item-grid-title {
        color: #333;
        margin-top: 20rpx;
        width: 100%;
        text-align: center;
    }
</style>
