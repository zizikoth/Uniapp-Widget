<template>
    <view>
        <dialog-modal ref="addressDialogModal">
            <view class="dialog-address-container">
                <picker-view class="dialog-address-box" indicator-style="height:80rpx;" :value="value"
                    @change="onChange">
                    <picker-view-column>
                        <view class="dialog-address-item" v-for="(item,index) in provinceList" :key="index">
                            {{item}}
                        </view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="dialog-address-item" v-for="(item,index) in cityList" :key="index">
                            {{item}}
                        </view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="dialog-address-item" v-for="(item,index) in areaList" :key="index">
                            {{item}}
                        </view>
                    </picker-view-column>
                </picker-view>

                <view class="dialog-address-btn" @click="onSure">确定</view>
            </view>
        </dialog-modal>
    </view>
</template>

<script>
    // 数据源来自于 https://github.com/modood/Administrative-divisions-of-China
    import address from '@/utils/address.js'
    export default {
        name: "dialog-address",
        data() {
            return {
                data: [],
                provinceList: [],
                cityList: [],
                areaList: [],
                value: [0, 0, 0]
            };
        },
        mounted() {
            this.initAddress()
        },
        methods: {
            show() {
                this.$refs.addressDialogModal.show()
            },
            hide() {
                this.$refs.addressDialogModal.hide()
            },
            initAddress() {
                this.data = address.pca
                for (let province in this.data) {
                    this.provinceList.push(province)
                }
                let cityTemp = this.data[this.provinceList[0]]
                for (let city in cityTemp) {
                    this.cityList.push(city)
                }
                this.areaList = this.data[this.provinceList[0]][this.cityList[0]]
            },
            onChange(e) {
                let temp = e.detail.value
                // 省变化
                if (this.value[0] != temp[0]) {
                    let province = this.provinceList[temp[0]]
                    let cityListTemp = []
                    for (let city in this.data[province]) {
                        cityListTemp.push(city)
                    }
                    this.cityList = cityListTemp
                    this.areaList = this.data[province][this.cityList[0]]
                    this.value = [temp[0], 0, 0]
                } else if (this.value[1] != temp[1]) {
                    let province = this.provinceList[temp[0]]
                    let city = this.cityList[temp[1]]
                    this.areaList = this.data[province][city]
                    this.value = [temp[0], temp[1], 0]
                } else {
                    this.value = temp
                }
            },
            onSure() {
                this.$emit('change', {
                    province: this.provinceList[this.value[0]],
                    city: this.cityList[this.value[1]],
                    area: this.areaList[this.value[2]]
                })
                this.hide()
            }
        }
    }
</script>

<style>
    .dialog-address-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #FFF;
    }

    .dialog-address-box {
        width: 100%;
        height: 400rpx;
    }

    .dialog-address-item {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        color: #000;
        text-align: center;
    }

    .dialog-address-btn {
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
