<template>
    <view>
        <view class="tree-node-list" :class="{'tree-node-first-cell':firstCell}" v-for="(item,index) in data"
            :key="index">
            <view class="tree-node-item">
                <text class="tree-node-open" @click.stop="onItemOpen(item)">
                    {{item.isOpen?'-':'+'}}
                </text>
                <text class="tree-node-title">{{titleKey?item[titleKey]:item}}</text>
                <view v-if="select"
                    :class="selectIds.some(id=>id==item.id)?'tree-node-check-check':'tree-node-check-normal'"
                    @click.stop="onItemCheck(item)" />
            </view>
            <tree-node :data="item.children" :titleKey="titleKey" :select="select" :multi="multi" :firstCell="false"
                :selectIds="selectIds" v-if="item.children!=null&&item.children.length>0&&item.isOpen" />
        </view>
    </view>

</template>

<script>
    import TreeNode from '@/components/tree/tree-node.vue'
    export default {
        name: "tree-node",
        components: {
            TreeNode
        },
        props: {
            data: {
                type: Array,
                default: () => []
            },
            titleKey: {
                type: String,
                default: 'title'
            },
            select: {
                type: Boolean,
                default: true
            },
            multi: {
                type: Boolean,
                default: false
            },
            firstCell: {
                type: Boolean,
                default: true
            },
            selectIds: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            onItemOpen(item) {
                uni.$emit('treeOpen', item)
            },
            onItemCheck(item) {
                if (this.select) uni.$emit('treeCheck', item)
            }
        }
    }
</script>

<style>
    .tree-node-list {
        display: flex;
        flex-direction: column;
        width: calc(100% - 40rpx);
        padding-left: 40rpx;
    }

    .tree-node-first-cell {
        width: 100%;
        padding-left: 0rpx;
    }

    .tree-node-item {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 70rpx;
        align-items: center;
    }

    .tree-node-title {
        flex: 1;
        font-size: 30rpx;
        color: #333;
        height: 70rpx;
        line-height: 70rpx;
    }

    .tree-node-open {
        border-radius: 8rpx;
        line-height: 25rpx;
        width: 30rpx;
        height: 30rpx;
        border: solid 2rpx #666;
        color: #666;
        text-align: center;
        margin-right: 15rpx;
    }

    .tree-node-check-normal {
        width: 30rpx;
        height: 30rpx;
        border-radius: 30rpx;
        border: solid 2rpx #0076f6;
    }

    .tree-node-check-check {
        width: 30rpx;
        height: 30rpx;
        border-radius: 30rpx;
        border: solid 2rpx #0076f6;
        background-color: #0076f6;
    }
</style>
