<template>
    <view>
        <title-bar title="工具" />
        <view class="button" style="margin-top: 120rpx;" @click="utils">Utils</view>
        <view class="button" @click="json">JsonUtils</view>
        <view class="button" @click="time">TimeUtils</view>
        <view class="button" @click="math">MathUtils</view>
        <view class="button" @click="text">TextUitls</view>
    </view>
</template>

<script>
    import utils from '@/utils/Utils.js'
    import jsonUtils from '@/utils/JsonUtils.js'
    import timeUtils from '@/utils/TimeUtils.js'
    import mathUtils from '@/utils/MathUtils.js'
    import textUtils from '@/utils/TextUtils.js'
    export default {
        data() {
            return {
                data: {
                    list: [{
                        name: "111",
                        age: 11
                    }, {
                        name: "222",
                        age: 22
                    }],
                    name: '1234567890abcdefg啊吧从的额分高,./!@#$%^&*()_+=-',
                    tag: 111
                }
            }
        },
        methods: {
            utils() {
                console.log(utils.isEmpty(''))
                console.log(utils.containStr('111,222,333', '123'))
                console.log(utils.deepClone(this.data))
                let query = utils.buildQuery({
                    title: '标题',
                    content: '内容',
                    plan: '123abc啊吧从!@#$%^*()_+<>?:{}|[];,.'
                })
                console.log()
                uni.navigateTo({
                    url: '../widget/widget' + query
                })
            },
            json() {
                console.log(jsonUtils.stringify(this.data, true))
                console.log(jsonUtils.parse(jsonUtils.stringify(this.data, true), true))
                console.log(jsonUtils.stringify(this.data))
                console.log(jsonUtils.parse(jsonUtils.stringify(this.data)))
            },
            time() {
                console.log(timeUtils.nowDate)
                console.log(timeUtils.timestamp2String(timeUtils.nowDate.timestamp))
                console.log(timeUtils.string2Timestamp(timeUtils.nowDate.YMDHMS))
                console.log(timeUtils.friendlyDesc("2022-06-06 06:06:06"))
            },
            math() {
                let a = 123456.654321
                let b = 654321.123456
                console.log(mathUtils.add(a, b))
                console.log(mathUtils.add(a, b).toFixed(2))
                console.log(mathUtils.subtract(a, b))
                console.log(mathUtils.subtract(a, b).toFixed(2))
                console.log(mathUtils.multiply(a, b))
                console.log(mathUtils.multiply(a, b).toFixed(2))
                console.log(mathUtils.divide(a, b))
                console.log(mathUtils.divide(a, b).toFixed(2))
            },
            text() {
                let text = "    前面有空格 EMOJI🤔🦢🏀⚽️ 后面有空格    "
                console.log(textUtils.trim(text))
                console.log(textUtils.removeEmoji(text))
                console.log(textUtils.isPhone('13843838438'))
                console.log(textUtils.checkPwdLevel('ZHOU931024zhx,./'))
            }
        }
    }
</script>

<style>
    page {
        display: flex;
        flex-direction: column;
    }
</style>
