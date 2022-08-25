<template>
    <view class="iiv-box" :style="{'border-radius':radius+'rpx','margin-bottom':margin+'rpx'}">
        <view class="iiv-title-box">
            <view class="iiv-label" />
            <text class="iiv-title">{{title}}</text>
            <text class="iiv-subTitle" v-if="subTitle">({{subTitle}})</text>
            <text class="iiv-must" v-if="must">*</text>
        </view>

        <view v-if="type==='text'">
            <view class="iiv-item-box" @click="onChangeText">
                <text class="iiv-text-select" v-if="!empty(value)">{{value}}</text>
                <text class="iiv-text-normal" v-if="empty(value)">{{hint}}</text>
                <view :class="arrowDown?'down-arrow-black':'right-arrow-black'" v-if="arrow" />
            </view>
        </view>

        <view v-if="type==='picker'">
            <picker mode="selector" :range="range" :range-key="rangeKey" @change="onPickerChange">
                <view class="iiv-item-box">
                    <text class="iiv-text-select" v-if="!empty(content)">{{content}}</text>
                    <text class="iiv-text-select" v-if="empty(content)&&!empty(value)">{{value}}</text>
                    <text class="iiv-text-normal" v-if="empty(content)&&empty(value)">{{hint}}</text>
                    <view class="down-arrow-black" />
                </view>
            </picker>
        </view>

        <view v-if="type==='date'">
            <picker mode="date" :value="value" :fields="fields" :start="start" :end="end" @change="onChange">
                <view class="iiv-item-box">
                    <text class="iiv-text-select" v-if="!empty(content)">{{content}}</text>
                    <text class="iiv-text-select" v-if="empty(content)&&!empty(value)">{{value}}</text>
                    <text class="iiv-text-normal" v-if="empty(content)&&empty(value)">{{hint}}</text>
                    <view class="down-arrow-black" />
                </view>
            </picker>
        </view>

        <view v-if="type==='input'">
            <view class="iiv-input-box">
                <input class="iiv-input-content iiv-text-select" placeholder-class="iiv-item-normal"
                    placeholder-style="font-size: 28rpx;color: #666666;" :enableNative="'{{false}}'" :value="value"
                    :placeholder="hint" :maxlength="maxLength" :password="password" @input="onChange" />
            </view>
        </view>

        <view v-if="type==='textarea'">
            <view class="iiv-textarea-box">
                <textarea class="iiv-match-parent iiv-text-select" placeholder-class="iiv-item-normal"
                    placeholder-style="font-size: 28rpx;color: #666666;" :enableNative="'{{false}}'" :value="value"
                    :placeholder="hint" :maxlength="maxLength" @input="onChange" />
            </view>
        </view>

        <view v-if="type==='radio'">
            <view class="ivv-radio-box">
                <view class="ivv-radio-item-box" v-for="(item,index) in range" :key="index">
                    <text :class="radioSelectIndex===index?'ivv-radio-select':'ivv-radio-normal'"
                        @click="onRadioClick(index)">{{rangeKey?item[rangeKey]:item}}</text>
                </view>
            </view>
        </view>

        <view v-if="type==='check'">
            <view class="ivv-radio-box">
                <view class="ivv-radio-item-box" v-for="(item,index) in range" :key="index">
                    <text :class="checkSelectIndex.indexOf(index)!=-1?'ivv-radio-select':'ivv-radio-normal'"
                        @click="onCheckClick(index)">{{rangeKey?item[rangeKey]:item}}</text>
                </view>
            </view>
        </view>

        <view v-if="type==='image'" style="margin: 20rpx;">
            <nine-grid-image mode="add" :images="images" :height="imageHeight" @change="onChangeImage" />
        </view>

    </view>
</template>

<script>
    /**
     * ItemInputView 
     * 
     * @description 条目数据控件 
     * 				显示内容优先级：操作选中的数据 > 配置的value > 配置的hint
     * 
     * @property	{String} 	title		"标题"				标题
     * @property	{Boolean} 	must		false				是否必填
     * @property	{String} 	subTitle	""					副标题
     * @property	{String} 	radius		15					圆角
     * @property	{String} 	margin		25					margin-bottom
     * 
     * @property	{String} 	type		""		类型
     * 		@value	text		文本显示
     * 		@value	picker		列表选择
     * 		@value	date		日期选择
     * 		@value	input		单行输入
     * 		@value	textarea	文本域输入
     * 		@value	radio		条目单选
     * 		@value	check		条目多选
     * 		@value	image		九宫格图片
     * 
     * text类型
     * @property	{String} 	hint		"请输入或选择内容"		提示文字
     * @property	{String} 	value		""					显示文字
     * @property	{String} 	arrow		true				是否显示向右侧箭头
     * 
     * picker类型
     * @property	{String} 	hint		"请输入或选择内容"		提示文字
     * @property	{String} 	value		""					默认显示文字
     * @property	{Array} 	range		[]					列表选择 列表 
     * @property	{String} 	rangeKey	""					列表选择 显示的key
     * 
     * date类型
     * @property	{String} 	hint		"请输入或选择内容"		提示文字
     * @property	{String} 	value		""					默认显示文字
     * @property	{String} 	fields		"day"				时间选择颗粒度 year month day
     * @property	{String} 	start	  	""					时间选择开始时间 
     * @property	{String} 	end			""					时间选择结束时间 
     * 
     * input类型
     * @property	{String} 	hint		"请输入或选择内容"		提示文字
     * @property	{String} 	value		""					默认显示文字
     * @property	{String} 	maxLength	默认200				文本长度 
     * @property	{Boolean}	password	false				是否是密码类型
     * 
     * textarea类型
     * @property	{String} 	hint		"请输入或选择内容"		提示文字
     * @property	{String} 	value		""					默认显示文字
     * @property	{String} 	maxLength	默认200				文本长度 
     * 
     * radio类型
     * @property	{Array} 	range		[]					单选选择 列表 
     * @property	{String} 	rangeKey	""					单选选择 显示的key
     * @property	{Number} 	radioIndex	-1					单选选择 默认选中的下标
     * 
     * check类型
     * @property	{Array} 	range		[]					多选选择 列表 
     * @property	{String} 	rangeKey	""					多选选择 显示的key
     * @property	{Array} 	checkIndex 	[]					多选选择 默认选中的所有下标集合
     * 
     * image类型
     * @property	{Array} 	images		[]					九宫格默认的显示图片 
     * @property	{String} 	imageHeight	220					九宫格图片的高度 默认高度220rpx
     * 
     * @event 		{Function} 	change		e					返回的数据 
     */
    export default {
        name: "item-input-view",
        props: {
            type: {
                type: String,
                default: ""
            },
            title: {
                type: String,
                default: "标题"
            },
            must: {
                type: Boolean,
                default: false
            },
            subTitle: {
                type: String,
                default: ""
            },
            radius: {
                type: String,
                default: "15"
            },
            margin: {
                type: String,
                default: "15"
            },
            hint: {
                type: String,
                default: "请输入或选择内容"
            },
            value: {
                type: String,
                default: ""
            },
            arrow: {
                type: Boolean,
                default: true
            },
            arrowDown: {
                type: Boolean,
                default: false
            },
            range: {
                type: Array,
                default: () => []
            },
            rangeKey: {
                type: String,
                default: ""
            },
            fields: {
                type: String,
                default: "day"
            },
            start: {
                type: String,
                default: ""
            },
            end: {
                type: String,
                default: ""
            },
            password: {
                type: Boolean,
                default: false
            },
            maxLength: {
                type: Number,
                default: 200
            },
            radioIndex: {
                default: -1
            },
            checkIndex: {
                type: Array,
                default: () => []
            },
            images: {
                type: Array,
                default: () => []
            },
            imageHeight: {
                type: String,
                default: "220"
            },
        },
        watch: {
            radioIndex: {
                handler(newValue) {
                    if (newValue === "" || newValue == null) {
                        this.radioSelectIndex = -1
                    } else {
                        this.radioSelectIndex = newValue
                    }
                },
                immediate: true
            },
            checkIndex: {
                handler(newValue) {
                    if (newValue == null || newValue.length == 0) {
                        this.checkSelectIndex = []
                    } else {
                        this.checkSelectIndex = newValue
                    }
                },
                immediate: true
            }
        },
        data() {
            return {
                // 操作后显示的文字
                content: "",
                // radio选中的条目
                radioSelectIndex: -1,
                // check选中的条目集合
                checkSelectIndex: []
            };
        },
        methods: {
            empty(data) {
                let isEmpty = data === "" || data === "null" || data === undefined || data === null || data.length === 0
                if (isEmpty) {
                    return true
                } else {
                    let str = data.toString()
                    return str.indexOf('undefined') != -1 || str.indexOf('null') != -1
                }
            },
            onPickerChange(e) {
                this.content = this.range[e.detail.value][this.rangeKey]
                this.$emit("change", this.range[e.detail.value])
            },
            onChange(e) {
                let temp = e.detail.value
                if (this.type === "date") {
                    temp = temp.replace(RegExp("/", "gm"), "-")
                }
                this.content = temp
                this.$emit("change", this.content)
            },
            onChangeText() {
                this.$emit("change", this.value)
            },
            onChangeImage(images) {
                this.$emit("change", images)
            },
            onRadioClick(index) {
                this.radioSelectIndex = index
                this.$emit("change", this.range[index])
            },
            onCheckClick(index) {
                if (this.checkSelectIndex.indexOf(index) === -1) {
                    // 不存在 添加
                    this.checkSelectIndex.push(index)
                } else {
                    // 存在 删除
                    this.checkSelectIndex = this.checkSelectIndex.filter(position => position != index)
                }
                // 下标排序
                this.checkSelectIndex.sort()
                let list = this.checkSelectIndex.map(item => this.range[item])
                this.$emit("change", list)
            },
        }
    }
</script>

<style>
    .iiv-text-normal {
        font-size: 28rpx;
        color: #666666;
    }

    .iiv-text-select {
        font-size: 28rpx;
        color: #333333;
    }

    .iiv-line-one {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .iiv-match-parent {
        width: 100%;
        height: 100%;
    }

    .iiv-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #FFFFFF;
        border-radius: 15rpx;
    }

    .iiv-title-box {
        display: flex;
        flex-direction: row;
        width: calc(100% - 50rpx);
        margin-left: 25rpx;
        margin-right: 25rpx;
        height: 90rpx;
        align-items: center;
        border-bottom: solid 2rpx #eeeeee;
    }

    .iiv-label {
        width: 8rpx;
        height: 28rpx;
        background-color: #0076f6;
        margin-right: 15rpx;
        border-radius: 3rpx;
    }

    .iiv-title {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
    }

    .iiv-must {
        font-size: 30rpx;
        font-weight: bold;
        color: #FF0000;
        margin-left: 10rpx;
        margin-top: 10rpx;
    }

    .iiv-subTitle {
        font-size: 24rpx;
        color: #666666;
        margin-left: 10rpx;
    }

    .iiv-item-box {
        display: flex;
        flex-direction: row;
        width: calc(100% - 50rpx);
        padding-left: 25rpx;
        padding-right: 25rpx;
        height: 90rpx;
        align-items: center;
        justify-content: space-between;
    }

    .iiv-input-box {
        display: flex;
        flex-direction: row;
        /* #ifdef H5 */
        width: calc(100% - 50rpx);
        padding-left: 25rpx;
        padding-right: 25rpx;
        /* #endif */
        /* #ifndef H5 */
        width: calc(100% - 30rpx);
        padding-left: 15rpx;
        padding-right: 15rpx;
        /* #endif */
        height: 90rpx;
    }

    .iiv-input-content {
        width: 100%;
        height: 80rpx;
    }

    .iiv-textarea-box {
        display: flex;
        flex-direction: row;
        /* #ifdef H5 */
        width: calc(100% - 50rpx);
        padding-left: 25rpx;
        padding-right: 25rpx;
        /* #endif */
        /* #ifndef H5 */
        width: calc(100% - 30rpx);
        padding-left: 15rpx;
        padding-right: 15rpx;
        /* #endif */
        height: 200rpx;
        padding-top: 20rpx;
        padding-bottom: 20rpx;
        margin-bottom: 20rpx;
    }

    .ivv-radio-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: calc(100% - 20rpx);
        padding-left: 10rpx;
        padding-right: 10rpx;
        padding-top: 10rpx;
        padding-bottom: 10rpx;
    }

    .ivv-radio-item-box {
        display: flex;
        width: 33.3%;
        height: 90rpx;
        line-height: 90rpx;
        align-items: center;
        justify-content: center;
    }

    .ivv-radio-normal {
        width: 190rpx;
        /* #ifndef H5 */
        height: 60rpx;
        line-height: 60rpx;
        /* #endif */
        /* #ifdef H5 */
        height: 58rpx;
        line-height: 58rpx;
        padding-bottom: 2rpx;
        /* #endif */
        padding-left: 15rpx;
        padding-right: 15rpx;
        text-align: center;
        border-radius: 10rpx;
        background-color: #eeeeee;
        color: #333333;
        font-size: 28rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .ivv-radio-select {
        width: 190rpx;
        /* #ifndef H5 */
        height: 60rpx;
        line-height: 60rpx;
        /* #endif */
        /* #ifdef H5 */
        height: 58rpx;
        line-height: 58rpx;
        padding-bottom: 2rpx;
        /* #endif */
        padding-left: 15rpx;
        padding-right: 15rpx;
        text-align: center;
        border-radius: 10rpx;
        background-color: #0076f6;
        color: #ffffff;
        font-size: 28rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .right-arrow-black {
        margin-left: 15rpx;
        color: #333333;
        width: 16rpx;
        height: 16rpx;
        position: relative;
        border-bottom: 4rpx solid #333333;
        border-right: 4rpx solid #333333;
        transform: rotate(-45deg);
        border-radius: 4rpx;
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
</style>
