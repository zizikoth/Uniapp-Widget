<template>
    <view>
        <tree-node :data="tree" :titleKey="titleKey" :select="select" :multi="multi" :firstCell="true"
            :selectIds="ids" />
    </view>
</template>

<script>
    import TreeNode from '@/components/tree/tree-node.vue'
    export default {
        name: "tree",
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
                default: false
            },
            multi: {
                type: Boolean,
                default: false
            }
        },
        created() {
            uni.$on('treeOpen', item => {
                console.log('tree-open', item)
                this.loopChild(this.tree, item)
            })
            uni.$on('treeCheck', item => {
                console.log('tree-check', item)
                if (this.select) {
                    let has = this.ids.some(id => id == item.id)
                    if (this.multi) {
                        if (has) {
                            this.selectItems = this.selectItems.filter(child => child.id != item.id)
                        } else {
                            this.selectItems.push(item)
                        }
                    } else {
                        if (has) {
                            this.selectItems = []
                        } else {
                            this.selectItems = [item]
                        }
                    }
                    this.ids = this.selectItems.map(item => item.id)
                    this.$emit("change", this.selectItems)
                }
            })
        },
        beforeDestroy() {
            uni.$off('treeOpen')
            uni.$off('treeCheck')
        },
        data() {
            return {
                tree: this.data,
                ids: [],
                selectItems: []
            };
        },
        methods: {
            loopChild(list, target) {
                list.forEach(item => {
                    if (item.id == target.id) {
                        item.isOpen = !item.isOpen
                        return
                    }
                    if (item.children != null && item.children.length > 0) {
                        this.loopChild(item.children, target)
                    }
                })
            }
        }
    }
</script>

<style>

</style>
