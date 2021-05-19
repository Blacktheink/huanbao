<template>
    <div class="t_news_init">
        <div class="t_news_init_left">
            <template v-for="(v,i) in list.slice(0,Math.ceil(list.length / 2))">
                <div class="t_news_item" v-if="v['audit']===0" :key="i">
                    <div class="t_news_item_time" @click="openDetails(v,i)">{{v['updateTime']}}</div>
                    <div class="t_news_item_body" @click="openDetails(v,i)">
                        <div class="t_news_item_title">{{v['title']}}</div>
                        <div class="t_news_item_content">{{v['info']}}</div>
                    </div>
                </div>
            </template>
        </div>
        <div class="t_news_init_right">
            <template v-for="(v,i) in list.slice(Math.ceil(list.length / 2))">
                <div class="t_news_item" v-if="v['audit']===0" :key="i">
                    <div class="t_news_item_time __right" @click="openDetails(v,Math.ceil(list.length / 2) + i)">{{v['updateTime']}}</div>
                    <div class="t_news_item_body" @click="openDetails(v,Math.ceil(list.length / 2) + i)">
                        <div class="t_news_item_title">{{v['title']}}</div>
                        <div class="t_news_item_content">{{v['info']}}</div>
                    </div>
                </div>
            </template>
        </div>


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

    .t_news_init {
        width: 100%;
        display: flex;
        /*flex-wrap: wrap;*/
        /*justify-content: space-around;*/
        /*align-items: center;*/
    }

    .t_news_init_left {
        width: calc((100% - 20px) / 2);
        margin-right: 20px;
    }

    .t_news_init_right {
        margin-top: 50px;
        width: calc((100% - 20px) / 2);
    }

    .t_news_item {
        width: 100%;
        margin-bottom: 20px;

    }

    .t_news_item_title {
        width: 100%;
        min-height: 28px;
        line-height: 28px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;


        padding: 5px 10px;
        box-sizing: border-box;

        border-radius: 10px 10px 0 0;
        text-align: left;

    }

    .t_news_item_body {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        margin: 0 auto;
        background-color: $t-news-bgColor;
        cursor: pointer;

        /*display: flex;*/
        /*align-items: center;*/
        /*box-shadow: 2px 2px 4px rgba(0,0,0,.6);*/
        box-shadow: 0 10px 40px -10px rgba(0, 64, 128, .2);
        border-radius: 10px;
    }

    .t_news_item_time {
        width: fit-content;
        line-height: 20px;
        flex-shrink: 0;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;

        border-radius: 20px;

        background-color: $t-news-time;
        color: #ffffff;

        margin-bottom: 15px;
    }

    .t_news_item_content {
        min-height: 100px;
        line-height: 30px;
        padding: 0 0 0 10px;
        box-sizing: border-box;
        text-align: left;
        border-top: 1px dashed $t-news-borderColor;
    }
.__right{
    margin-left: auto;
}
</style>