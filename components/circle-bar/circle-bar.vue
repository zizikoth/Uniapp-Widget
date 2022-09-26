<template>
    <view class="circle-bar-box" :style="{
        'width':`${size}rpx`,
        'height':`${size}rpx`,
    }">

        <view class="circle-bar-bg" :style="{
        'width':`${size-width*2}rpx`,
        'height':`${size-width*2}rpx`,
        'border':`solid ${width}rpx ${background}`
    }" />

        <canvas class="circle-bar-canvas" type="2d" :canvas-id="canvasId" :id="canvasId" />

        <view class="circle-bar-slot" :style="{
            'width':`${size}rpx`,
            'height':`${size}rpx`
        }">
            <slot></slot>
        </view>
    </view>
</template>

<script>
    /**
     * @description 圆环进度条，canvas绘制
     * @property {String|Number}    size            200                 组件的宽高
     * @property {String|Number}    width           20                  圆环的粗细
     * @property {String}           background      #EEEEEE             圆环背景色
     * @property {String}           active          #0076f6             圆环进度条颜色
     * @property {String|Number}    progress        [0,100]             圆环进度
     * @property {Boolean}          anim            false               圆环进度改变是否显示过渡动画
     * @property {String}           canvasId        'circleBarProgress' 如果当前页面有多个组件需要指定不同的canvasId,单个可不用
     */
    export default {
        name: "circle-bar",
        props: {
            size: {
                type: String | Number,
                default: 200
            },
            width: {
                type: String | Number,
                default: 20
            },
            background: {
                type: String,
                default: "#EEEEEE"
            },
            active: {
                type: String,
                default: "#0076f6"
            },
            progress: {
                // [0,100]
                type: String | Number,
                default: 0
            },
            anim: {
                type: Boolean,
                default: false
            },
            canvasId: {
                type: String,
                default: 'circleBarProgress'
            },
        },
        mounted() {
            this.drawProgress()
        },
        watch: {
            progress: {
                handler(newProgress) {
                    clearInterval(this.timer)
                    if (this.anim) {
                        let offset = newProgress - this.rate
                        let step = offset / 15
                        this.timer = setInterval(() => {
                            if (this.rate >= newProgress) {
                                this.rate = newProgress
                                clearInterval(this.timer)
                            } else {
                                this.rate = this.rate + step
                            }
                            this.drawProgress()
                        }, 20)
                    } else {
                        this.rate = newProgress
                        this.drawProgress()
                    }
                }
            }
        },
        data() {
            return {
                timer: '',
                rate: this.progress
            }
        },
        methods: {
            drawProgress() {
                let endAngle = (this.rate / 50 - 0.5) * Math.PI
                let ctx = uni.createCanvasContext(this.canvasId, this)
                ctx.setLineWidth(uni.upx2px(this.width))
                ctx.setStrokeStyle(this.active)
                ctx.setLineCap('round')
                ctx.beginPath()
                let x = uni.upx2px(this.size) / 2
                let r = uni.upx2px(this.size - this.width) / 2
                ctx.arc(x, x, r, -(Math.PI / 2), endAngle, false)
                ctx.stroke()
                ctx.draw()
            }
        }
    }
</script>

<style>
    .circle-bar-box {
        display: flex;
        position: relative;

        border-radius: 50%;
    }

    .circle-bar-bg {
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 50%;
    }

    .circle-bar-canvas {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .circle-bar-slot {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
    }
</style>
