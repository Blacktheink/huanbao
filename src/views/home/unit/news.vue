<template>
    <div class="news_init">
        <div v-if="list.length>0" class="news_body">
            <div class="__left">
                <template v-for="(v,i) in list.slice(0,Math.ceil(list.length / 2))">
                    <div class="news_item mb-10" :key="i">
                        <div class="news_item_body mb-10" @click="openDetails(i)">
                            <div class="news_item_title">{{v['title']}}</div>
                            <div class="news_item_content">{{v['info']}}</div>
                        </div>
                        <div class="news_item_time" @click="openDetails(i)">{{v['updateTime']}}</div>
                    </div>
                </template>
            </div>
            <div class="split"></div>
            <div class="__right">
                <template v-for="(v,i) in list.slice(Math.ceil(list.length / 2))">
                    <div class="news_item mb-10" :key="i">
                        <div class="news_item_body mb-10" @click="openDetails(Math.ceil(list.length / 2) + i)">
                            <div class="news_item_title">{{v['title']}}</div>
                            <div class="news_item_content">{{v['info']}}</div>
                        </div>
                        <div class="news_item_time" @click="openDetails(Math.ceil(list.length / 2) + i)">
                            {{v['updateTime']}}
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <error_svg v-else></error_svg>
    </div>
</template>

<script>
    import {news} from "@/tool/mnData";
    import {http_async} from "@/tool/http";

    export default {
        name: "news",
        components: {
            Error_svg: r => require.ensure([], () => r(require("@/components/error_svg")), 'news_init'),
        },
        data() {
            return {
                list: [],
            }
        },
        beforeMount() {
            this.list = news
            // this.getData();
        },
        methods: {
            /**
             * 获取数据
             */
            getData() {
                const _this = this;
                http_async({
                    methods: 'post',
                    url: `/invitation/invitation/list`
                }).then(res => {
                    if (res.code === 0) {
                        _this.list = res.rows;
                        window.sessionStorage.setItem('xwzx', JSON.stringify(res.rows))
                    }
                })
            },
            /**
             * 打开详情
             * @param v
             */
            openDetails(v) {
                const _this = this;
                _this.$router.push({
                    path: '/details',
                    query: {
                        index: v,
                        name: '新闻资讯',
                        page: 'xwzx',
                        number: 1,
                    },
                }).catch(() => {

                })
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "src/assets/theme-color";

    .mb-10 {
        margin-bottom: 10px;
    }

    .news_init {
        width: 100%;
    }

    .news_body {
        width: 100%;
        display: flex;

    }

    .__left, .__right {
        width: calc((100% - 20px) / 2);
    }

    .news_item {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .news_item_body {
            width: 100%;
            font-size: 18px;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
            border-radius: 20px;
            background-color: #eee;
            cursor: pointer;
            position: relative;

            &:after {
                position: absolute;
                content: '';
                display: block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                right: -14px;
                top: 50%;
                transform: translate(0, -50%);
                background-color: $borderColor;
            }
        }

        .news_item_title {
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 24px;
            padding: 10px;
            box-sizing: border-box;
        }

        .news_item_content {
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 24px;
            padding: 10px;
            box-sizing: border-box;
        }

        .news_item_time {
            padding: 10px 15px;
            box-sizing: border-box;
            font-size: 20px;
            line-height: 20px;
            border-radius: 20px;
            background-color: $t-news-time;
            color: #ffffff;
            cursor: pointer;


        }
    }

    .__right {
        .news_item {
            align-items: flex-start;
        }

        .news_item_title {
            text-align: right;
        }

        .news_item_content {
            text-align: right;
        }

        .news_item_body {
            width: 100%;
            font-size: 18px;
            box-shadow: 2px 2px 4px rgba(0, 0, 0, .6);
            border-radius: 20px;
            background-color: #eee;
            cursor: pointer;
            position: relative;

            &:after {
                position: absolute;
                content: '';
                display: block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                left: -14px;
                top: 50%;
                transform: translate(0, -50%);
                background-color: $borderColor;
            }
        }
    }

    .split {
        width: 0;
        border-right: 2px dashed $borderColor;
        /*height: 100%;*/
        margin: 0 9px;
        cursor: default;
        position: relative;

        &:after {
            position: absolute;
            content: '';
            height: 0;
            width: 0;
            border-top: 6px solid $borderColor;
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;
            border-bottom: 6px solid transparent;
            bottom: -8px;
            left: -5.2px;

        }
    }
</style>