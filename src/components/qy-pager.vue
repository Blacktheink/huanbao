<template>
    <div class="qy-pager_init" v-if="pages>1" :class="{
    '__center':position === 'center',
    '__left':position === 'left',
    '__right':position === 'right',
    }">
        <slot :page="{
        position,
        total,
        pageSize,
        current,
        omit,
        }">
            <div class="qy-pager_item" :class="{'__none':current===1}" @click="changePage(current!==1,current-1)"><</div>
            <template v-if="pages <= omit ">
                <template v-for="(item,index) in pages">
                    <div class="qy-pager_item" :class="{'__active':current === item}" :key="index"
                         @click="changePage(true,item)">
                        {{item}}
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="qy-pager_item"
                     :class="{'__active':current === 1}"
                     @click="changePage(true,1)">
                    {{1}}
                </div>
                <div class="qy-pager_ellipsis" v-show="current > 1 + Math.abs(Math.ceil((omit / 2)))"
                     @click="changePage(true,current - omit)">···
                </div>
                <template v-for="(item,index) in dynamic">
                    <div class="qy-pager_item"
                         :class="{'__active':current === item}"
                         :key="index"
                         @click="changePage(true,item)">
                        {{item}}
                    </div>
                </template>
                <div class="qy-pager_ellipsis" v-show="current < pages- Math.abs(Math.ceil((omit / 2)))"
                     @click="changePage(true,current + omit)">···
                </div>
                <div class="qy-pager_item"
                     :class="{'__active':current === pages}"
                     @click="changePage(true,pages)">
                    {{pages}}
                </div>
            </template>
            <div class="qy-pager_item" :class="{'__none':current===pages}" @click="changePage(current!==pages,current+1)">>
            </div>
        </slot>
    </div>
</template>

<script>
    export default {
        name: "qy-pager",
        computed: {
            //计算一共有几页
            pages() {
                return Math.ceil((this.total) / (this.pageSize))
            },
            dynamic() {
                const _this = this;
                let pageList = [];
                let isStart = 2 + Math.abs(Math.ceil((_this.omit / 2))); //4
                let isEnd = _this.pages - 1 - Math.abs(Math.ceil((_this.omit / 2))); //7
                let end = _this.current + Math.abs(Math.floor((_this.omit / 2))); //3
                let start = _this.current - Math.abs(Math.floor((_this.omit / 2)));//-1
                if (_this.current < isStart) {
                    end = isStart
                } else if (_this.current > isEnd) {
                    start = isEnd;
                }
                let i;
                for (i = start; i <= end; i++) {
                    if (i > 1 && i < _this.pages) {
                        pageList.push(i)
                    }
                }
                return pageList
            },
        },
        props: {
            //位置
            position: {
                type: String,
                default: 'center',
            },
            // 总数据
            total: {
                type: Number,
                default: 80,
            },
            //  每页数据
            pageSize: {
                type: Number,
                default: 10,
            },
            //  当前页面
            current: {
                type: Number,
                default: 1,
            },
            //超过几页省略
            omit: {
                type: Number,
                default: 5,
            },
        },
        methods: {
            /**
             * 切换页码
             */
            changePage(isClick, i) {
                if (isClick) {
                    if (i < 1) {
                        i = 1
                    }
                    if (i > this.pages) {
                        i = this.pages
                    }
                    console.warn('当前页码', i);
                    this.$emit('update:current', i)
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/theme-color.scss";
    .qy-pager_init {
        width: 100%;
        height: 40px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .__center {
        justify-content: center;
    }

    .__left {
        justify-content: flex-start;
    }

    .__right {
        justify-content: flex-end;
    }

    .qy-pager_item {
        width: 30px;
        height: 30px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        /*padding: 10px;*/
        border: 1px solid $borderColor;
        border-radius: 3px;

        font-size: 16px;
        font-weight: bolder;
        cursor: pointer;

        margin-right: 10px;

        &:last-child {
            margin-right: 0;
        }

        &:hover {
            opacity: 0.7;
        }
    }

    .__active {
        border-color: $active-borderColor;
        color:$active-textColor;
        background-color: $active-bgColor;
    }

    .__none {
        opacity: 0.4;
        cursor: not-allowed;
        &:hover {
            opacity: 0.4;
        }
    }

    .qy-pager_ellipsis {
        font-size: 16px;
        font-weight: bolder;
        cursor: pointer;

        margin-right: 10px;

        &:hover {
            opacity: 0.4;
        }
    }
</style>