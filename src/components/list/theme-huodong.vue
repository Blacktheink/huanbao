<template>
    <div class="t_huodong_init">
        <template v-for="(v,i) in list">
            <div class="t_huodong_item" :key="i" @click="openDetails(v,i)">
                <div class="t_huodong_item_title">{{v['title']}}</div>
                <div class="t_huodong_item_body">
                    <div class="t_huodong_item_content">{{v['info']}}</div>
                    <div class="t_huodong_item_foot">{{v['updateTime']}}</div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {news} from "@/tool/mnData";

    export default {
        name: "theme-huodong",
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
            openDetails(v,i){
                this.$emit('openDetails', {item:v,index:i})
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "src/assets/theme-color";

    .t_huodong_init {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        /*align-items: center;*/
    }

    .t_huodong_item {
        flex-shrink: 0;
        flex-basis: 30%;
        margin-bottom: 20px;
        cursor: pointer;
    }

    .t_huodong_item_title {
        width: 100%;
        min-height: 28px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        background-color: $t-huodong-title;
        color: #ffffff;

        padding: 5px 10px;
        box-sizing: border-box;

        position: relative;

        &:after {
            content: ' ';
            width: 0;
            height: 90%;
            position: absolute;

            /* 小球形状 */
            border-right: 6px dotted $body-bgColor;
            left: -3px;
            top: 0px;
        }

        &:before {
            content: ' ';
            width: 0;
            height: 90%;
            position: absolute;

            /* 小球形状 */
            border-right: 6px dotted $body-bgColor;
            right: -3px;
            top: 0px;
        }
    }

    .t_huodong_item_body {
        /*padding: 10px;*/
        /*box-sizing: border-box;*/
        width: 90%;
        margin: 0 auto;
        background-color: $t-huodong-bgColor;
        /*box-shadow: 2px 2px 4px rgba(0,0,0,.6);*/
        box-shadow: 0 10px 40px -10px rgba(0, 64, 128, .2);
    }
    .t_huodong_item_foot{
        line-height: 20px;
        padding: 10px;
        box-sizing: border-box;
        border-top: 2px dashed $t-huodong-borderColor;
    }
    .t_huodong_item_content{
        line-height: 30px;
        word-break: break-all;
        padding: 10px;
        box-sizing: border-box;
    }

</style>