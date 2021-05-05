<template>
    <div class="crumbs_init">
        <div class="crumbs_body" :class="[position === 'left'?'_left':'_right']">
            <img class="crumbs_icon" v-if="leftIcon" :src="leftIcon" alt=""/>
            <template v-for="(n,i) in nav">
                <div class="crumbs_item" :key="i">
                    <div class="crumbs_title" :class="{'__click':n.url,'__active':i===nav.length-1 &&isActive}" @click="openPage(n,i)">
                        {{n.label}}
                    </div>
                    <div v-if="i!==nav.length-1" class="crumbs_split">{{split}}</div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "crumbs",
        props: {
            nav: {
                type: Array,
                default: () => [
                    {
                        label: '首页',
                        url: '/home',
                    },
                    {
                        label: '新闻资讯',
                        url: '/xwzx',
                    }
                ],
            },
            split: {
                type: String,
                default: '/',
            },
            leftIcon: {
                type: String,
                default: require('../assets/home.png'),
            },
            position: {
                type: String,
                default: 'right',
            },
            isActive: {
                type: Boolean,
                default: true,
            },
        },
        methods:{
            /**
             * 导航跳转
             * @param item
             * @param index
             */
            openPage(item,index){
                if(item.url){
                    this.$router.push({
                        path:item.url
                    })
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "src/assets/theme-color";
    .crumbs_init {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .crumbs_body {
        width: 100%;
        display: flex;
        align-items: center;

        .crumbs_icon {
            width: 25px;
            height: 25px;
            margin-right: 10px;
        }

        .crumbs_item {
            display: flex;
            align-items: center;

            .__click {
                cursor: pointer;
            }

            .__active {
                font-weight: bolder;
                color: $focus-borderColor;
            }

            .crumbs_split {
                margin: 0 10px;
            }
        }
    }

    ._left {
        justify-content: flex-start;
    }

    ._right {
        justify-content: flex-end;
    }
</style>