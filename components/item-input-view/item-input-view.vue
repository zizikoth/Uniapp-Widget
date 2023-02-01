<template>
    <view class="iiv-box-h" :class="{'iiv-box-v':type=='textarea'||type=='image'||type=='customV', 'iiv-line' :line }">
        <view class="iiv-title-box">
            <text class="iiv-title-must">{{must?'*':''}}</text>
            <text :style="{'width':titleWidth+'rpx'}">{{title}}</text>
        </view>

        <view v-if="type=='customH'" class="iiv-extra">
            <slot></slot>
        </view>

        <view v-if="type=='customV'" class="iiv-customv-box">
            <slot></slot>
        </view>

        <view v-if="type=='text'" class="iiv-extra" @click="onTextClick">
            <text v-if="value">{{value}}</text>
            <text class="iiv-hint" v-else>{{hint?hint:'请选择'+title}}</text>
            <view class="iiv-arrow">
                <arrow :arrow="arrow" color="#666666" />
            </view>
        </view>

        <view v-if="type=='either'" class="iiv-extra">
            <view class="iiv-either-box">
                <view class="iiv-either-item" v-for="(item,index) in range" :key="index" @click="onEitherClick(item)">
                    <view class="iiv-either-check" :class="{'iiv-either-checked':item.id===value}" />
                    <text class="iiv-either-text"
                        :class="{'iiv-either-text-checked':item.id===value}">{{rangeKey?item[rangeKey]:item}}</text>
                </view>
            </view>
        </view>

        <view v-if="type=='input'" class="iiv-extra">
            <input v-if="enable" class="iiv-input-text" :enableNative="'{{false}}'" :value="value"
                :placeholder="hint==''?'请输入'+title:hint" placeholder-class="iiv-input-hint" :maxlength="maxLength"
                @input="onInputChange" />
            <text v-if="!enable">{{value?value:hint?hint:'请输入'+title}}</text>
        </view>

        <view v-if="type=='textarea'" class="iiv-textarea-box">
            <textarea :disabled="!enable" class="iiv-textarea-text" :enableNative="'{{false}}'" :value="value"
                :placeholder="hint==''?'请输入'+title:hint" placeholder-class="iiv-textarea-hint" :maxlength="maxLength"
                @input="onInputChange" />
        </view>

        <view v-if="type=='image'" class="iiv-image-box">
            <nine-grid-image :mode="enable?'add':'show'" :height="imageHeight" :images="value"
                @change="onImageChange" />
        </view>

    </view>
</template>

<script>
    /**
     * @property {String}   type        类型           默认：text
     *      @value customH      开放右边空间 <slot/>
     *      @value customV      开放下边空间 <slot/>
     *      @value text         文本类型
     *      @value either       多选一
     *      @value input        单行输入
     *      @value textarea     多行输入
     *      @value image        九宫格图片选择
     * @property {Boolean}  enable      是否可输入               默认：true
     * @property {Boolean}  line        是否显示下划线            默认：true
     * @property {String}   must        必填标识                 默认：false
     * @property {String}   title       标题                    默认：""
     * @property {String}   titleWidth  标题宽度，超过200后会形变  默认：120
     * @property {String}   arrow       text模式的箭头方向        默认：""
     *      @value left         向左
     *      @value top          向上
     *      @value right        向右
     *      @value bottom       向下
     * @property {String}   value       text,input,textarea模式传入的文字，either模式传入选中的id，image模式传入图片列表    默认：null
     * @property {String}   hint        text,input,textarea模式的提示文字             默认：请选择/请输入+标题
     * @property {String}   range       either模式的数据源             默认：[]     
     * @property {String}   rangeKey    either模式的显示文字           默认：''
     * @property {String}   maxLength   input,textarea模式文字长度    默认：200
     * @property {String}   imageHeight image模式下图片高度            默认：200
     */
    export default {
        name: "item-input-view",
        props: {
            type: {
                type: String,
                default: "text"
            },
            enable: {
                type: Boolean,
                default: true
            },
            line: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: ""
            },
            titleWidth: {
                type: String | Number,
                default: 120
            },
            must: {
                type: Boolean,
                default: false
            },
            arrow: {
                type: String,
                default: ""
            },
            value: {
                default: null
            },
            hint: {
                type: String,
                default: ""
            },
            range: {
                type: Array,
                default: () => []
            },
            rangeKey: {
                type: String,
                default: ""
            },
            maxLength: {
                type: String | Number,
                default: 200
            },
            images: {
                type: Array,
                default: () => []
            },
            imageHeight: {
                type: String | Number,
                default: 220
            }
        },
        data() {
            return {
                startTime: "",
                endTime: ""
            }
        },
        methods: {
            onTextClick() {
                this.$emit('change', this.value)
            },
            onEitherClick(item) {
                this.$emit('change', item)
            },
            onInputChange(e) {
                this.$emit('change', e.detail.value)
            },
            onImageChange(e) {
                this.$emit('change', e)
            }
        }
    }
</script>

<style>
    .iiv-box-h {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        font-size: 28rpx;
        color: #333;
    }

    .iiv-box-v {
        display: flex;
        flex-direction: column;
        width: 100%;
        font-size: 28rpx;
        color: #333;
    }

    .iiv-line {
        border-bottom: solid 2rpx #eee;
    }

    .iiv-title-box {
        display: flex;
        flex-direction: row;
        max-width: 200rpx;
        min-height: 100rpx;
        align-items: center;
    }

    .iiv-title-must {
        width: 20rpx;
        font-size: 24rpx;
        color: #ff0000;
        margin-top: 4rpx;
    }

    .iiv-extra {
        display: flex;
        flex-direction: row;
        width: 400rpx;
        min-height: 100rpx;
        align-items: center;
        justify-content: flex-end;
    }

    .iiv-hint {
        display: flex;
        color: #999;
    }

    .iiv-arrow {
        margin-top: 4rpx;
    }

    .iiv-either-box {
        display: flex;
        flex-direction: row;
        width: 100%;
        flex-wrap: wrap;
        width: 400rpx;
    }

    .iiv-either-item {
        display: flex;
        flex-direction: row;
        width: 200rpx;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10rpx;
        margin-bottom: 10rpx;
    }

    .iiv-either-check {
        width: 20rpx;
        height: 20rpx;
        border: solid 6rpx #eee;
        background-color: #FFF;
        border-radius: 50%;
        margin-right: 10rpx;
        margin-left: 10rpx;
    }

    .iiv-either-checked {
        border-color: #0076f6;
    }

    .iiv-either-text {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-align: right;
        max-width: 140rpx;
        color: #999;
    }

    .iiv-either-text-checked {
        color: #333;
    }

    .iiv-input-text {
        width: 450rpx;
        font-size: 28rpx;
        color: #333;
        text-align: end;
    }

    .iiv-input-hint {
        text-align: end;
        font-size: 28rpx;
        color: #999;
    }

    .iiv-textarea-box {
        width: calc(100% - 40rpx);
        padding: 20rpx;
        /* #ifdef H5 */
        height: 220rpx;
        /* #endif */
        /* #ifndef H5 */
        height: 235rpx;
        /* #endif */
        border-radius: 16rpx;
        background-color: #f5f5f5;
        margin-bottom: 30rpx;
    }

    .iiv-textarea-text {
        background-color: #f5f5f5;
        width: 100%;
        height: 220rpx;
        font-size: 28rpx;
        color: #333;
        line-height: 45rpx;
        border-radius: 16rpx;
    }

    .iiv-textarea-hint {
        font-size: 28rpx;
        color: #999;
        line-height: 45rpx;
    }

    .iiv-image-box {
        width: 100%;
    }

    .iiv-customv-box {
        width: 100%;
    }
</style>
