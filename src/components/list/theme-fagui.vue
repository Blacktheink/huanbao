<template>
    <div class="t_fagui_init">
        <template v-for="(v,i) in list">
            <div class="t_fagui_item" :key="i" @click="openDetails(v,i)">
                <div class="t_fagui_item_title">{{v['title']}}</div>
                <div class="t_fagui_item_body">
                    <div class="t_fagui_item_time">{{v['updateTime']}}</div>
                    <div class="t_fagui_item_content">{{v['info']}}</div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {news} from "@/tool/mnData";

    export default {
        name: "theme-fagui",
        props: {
            list: {
                type: Array,
                default: () => news
            },
        },
        methods: {
            /**
             * 打开详情
             * @param v
             * @param i
             */
            openDetails(v, i) {
                this.$emit('openDetails', {item:v,index:i})
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "src/assets/theme-color";

    .t_fagui_init {
        width: 100%;
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        /*justify-content: space-around;*/
        /*align-items: center;*/
    }

    .t_fagui_item {
        width: 100%;
        margin-bottom: 20px;
        cursor: pointer;

    }

    .t_fagui_item_title {
        width: 100%;
        min-height: 28px;
        line-height: 28px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: $t-fagui-title;
        color: #ffffff;

        padding: 5px 10px;
        box-sizing: border-box;

        border-radius: 10px 10px 0 0;
        text-align: left;

    }

    .t_fagui_item_body {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        margin: 0 auto;
        background-color: $t-fagui-bgColor;

        display: flex;
        align-items: center;
        /*box-shadow: 2px 2px 4px rgba(0,0,0,.6);*/
        box-shadow: 0 10px 40px -10px rgba(0, 64, 128, .2);
        border-radius: 0 0 10px 10px;
    }

    .t_fagui_item_time {
        line-height: 20px;
        flex-shrink: 0;
        padding: 0 10px 0 0;
        box-sizing: border-box;
        border-right: 2px dashed $t-fagui-borderColor;
    }

    .t_fagui_item_content {
        line-height: 30px;
        padding: 0 0 0 10px;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>