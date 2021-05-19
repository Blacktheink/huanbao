<template>
    <div class="t_huodong_init">
        <template v-for="(v,i) in list">
            <div class="t_huodong_item" :key="i" @click="openDetails(v,i)">
                <div class="t_huodong_item_title">{{v['title']}}</div>
                <div class="t_huodong_item_body">
                    <div class="t_huodong_item_content">活动对象：{{v['objects'] | showObject}}</div>
                    <div class="t_huodong_item_foot">活动人数：{{v['restrictionsNum'] }} 人</div>
                    <div class="t_huodong_item_foot">主办部门：{{v['hostDept'] | showDept }}</div>
                    <div class="t_huodong_item_foot">活动承办人：{{v['promoter'] }}</div>
                    <div class="t_huodong_item_foot">承办人电话：{{v['phone'] }}</div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {news} from "@/tool/mnData";

    export default {
        name: "theme-huodong",
        filters: {
            showObject(a) {
                switch (a.toString()) {
                    case "0":
                        return "中小学生"
                    case "1":
                        return "高中生"
                    case "2":
                        return "大学生"
                    case "3":
                        return "全体人员"
                    default:
                        return "其他"
                }
            },
            showDept(a) {
                switch (a.toString()) {
                    case "0":
                        return "个人"
                    case "1":
                        return "企业"
                    case "2":
                        return "政府部门"
                    default:
                        return "其他"
                }
            }
        },
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
                this.$emit('openDetails', {item: v, index: i})
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

    .t_huodong_item_foot {
        line-height: 20px;
        padding: 10px;
        box-sizing: border-box;
        border-top: 2px dashed $t-huodong-borderColor;
    }

    .t_huodong_item_content {
        line-height: 30px;
        word-break: break-all;
        padding: 10px;
        box-sizing: border-box;
    }

</style>