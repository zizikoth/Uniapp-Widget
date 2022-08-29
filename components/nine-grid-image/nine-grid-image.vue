<template>
    <view>
        <view class="nine-container" v-model="images">
            <view class="nine-image-box" :style="{'height':height+'rpx'}" v-for="(item,index) in curImages"
                :key="index">
                <image v-if="item!=''" @click="onImageClick(index)" :src="item" mode="aspectFill" class="nine-image"
                    :class="{'margin-auto-left':index%3==0,'margin-auto-mid':index%3==1,'margin-auto-right':index%3==2}" />
                <view v-if="mode=='add' && item==''" @click="onImageAdd()" class="nine-add">
                    <text class="nine-add-text">×</text>
                </view>
                <text v-if="mode=='add' && item!=''" @click="onImageDelete(index)" class="nine-delete"
                    :class="{'nine-delete-left':index%3==0,'nine-delete-right':index%3==2}">×</text>
            </view>
        </view>
    </view>
</template>

<script>
    /**
     * NineGridView 
     * @description 九宫格图片控件 
     * @property	{String} 	mode = [show | add]
     * 		@value	show	只展示图片
     * 		@value	add		展示初始图片并且添加图片
     * @property	{Number} 	maxLength 	图片的最大显示数量
     * @property	{Array} 	images  	初始化传入的图片，实际的图片使用curImages
     */
    export default {
        name: "nine-grid-image",
        props: {
            mode: {
                type: String,
                default: 'show'
            },
            maxLength: {
                type: Number,
                default: 9
            },
            images: {
                type: Array,
                default: () => []
            },
            height: {
                type: String,
                default: '230'
            }
        },
        watch: {
            images: {
                handler(newImages) {
                    // 创建临时变量存储图片
                    let temp = []
                    if (newImages != null && newImages.length != 0) {
                        temp = temp.concat(newImages)
                    }
                    // 判断是否超出长度 进行切割
                    if (temp.length > this.maxLength) {
                        temp = temp.slice(0, this.maxLength)
                    }
                    // 判断是否添加模式 添加+号
                    if (this.mode == 'add' && temp.length < this.maxLength) {
                        temp.push('')
                    }
                    this.curImages = temp
                },
                immediate: true
            }
        },
        data() {
            return {
                curImages: []
            }
        },
        methods: {
            onImageClick(index) {
                let temp = this.filterImage(this.curImages, '')
                this.previewImage(index, temp)
            },
            onImageAdd() {
                if (this.mode == 'add') {
                    let temp = this.filterImage(this.curImages, '')
                    this.chooseImage(this.maxLength - temp.length).then(res => {
                        temp = temp.concat(res.tempFilePaths)
                        this.$emit('change', this.filterImage(temp, ''))
                        if (temp.length < this.maxLength) {
                            temp.push('')
                        }
                        this.curImages = temp
                    })
                }
            },
            onImageDelete(index) {
                if (this.mode == 'add') {
                    let temp = this.filterImage(this.curImages, '')
                    temp.splice(index, 1)
                    this.$emit('change', this.filterImage(temp, ''))
                    if (temp.length < this.maxLength) {
                        temp.push('')
                    }
                    this.curImages = temp
                }
            },
            getCurImages() {
                return this.filterImage(this.curImages, '')
            },
            chooseImage(count) {
                return new Promise((resolve, reject) => {
                    uni.chooseImage({
                        count: count,
                        success(res) {
                            resolve(res)
                        },
                        fail() {
                            reject()
                        }
                    })
                })
            },
            previewImage(current, images) {
                uni.previewImage({
                    current: current,
                    urls: images
                })
            },
            filterImage(list, defaultAddPicture) {
                return list.filter(item => item != defaultAddPicture)
            }
        }
    }
</script>

<style>
    .nine-container {
        display: flex;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #FFFFFF;
    }

    .nine-image-box {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        width: 33.33%;
    }

    .nine-image {
        width: 96%;
        height: 94%;
        border-radius: 10rpx;
    }

    .margin-auto-left {
        margin-top: auto;
        margin-bottom: auto;
        margin-right: auto;
    }

    .margin-auto-mid {
        margin: auto;
    }

    .margin-auto-right {
        margin-top: auto;
        margin-bottom: auto;
        margin-left: auto;
    }

    .nine-add {
        display: flex;
        width: 96%;
        height: 94%;
        margin: auto;
        border-radius: 10rpx;
        background-color: #eeeeee;
        align-items: center;
        justify-content: center;
    }

    .nine-add-text {
        font-size: 140rpx;
        padding-bottom: 35rpx;
        color: #666;
        transform: rotate(45deg);
    }

    .nine-delete {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        border-top-right-radius: 10rpx;
        border-bottom-left-radius: 10rpx;
        top: 4%;
        right: 2%;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.6);
        color: #dd524d;
        font-weight: bold;
        line-height: 33rpx;
        font-size: 40rpx;
        text-align: center;
    }

    .nine-delete-left {
        top: 4%;
        right: 4%;
    }

    .nine-delete-right {
        top: 4%;
        right: 0;
    }
</style>
