<template>
    <div class="activity_init">
        <div v-if="list.length>0" class="activity_body">
            <div class="activity_show">
                <img class="activity_image" :src="require('../../../assets/banner_7.png')" alt=""/>
                <div class="activity_mask">
                    <div class="activity_items">
                        <template v-for="(v,i) in list.slice(0,5)">
                            <div class="activity_item mb-10" :key="i" @click="openDetails(i)">
                                <div class="activity_item_title ">{{v['title']}}</div>
                                <div class="activity_item_info">{{v['info']}}</div>
                            </div>
                        </template>
                    </div>
                    <div class="activity_btn mb-10" @click="openMore('qwhd')">
                        更 多 内 容
                    </div>
                </div>
            </div>
        </div>
        <error_svg v-else></error_svg>
    </div>
</template>

<script>
    import {news} from "@/tool/mnData";
    import {http, http_async} from "@/tool/http";

    export default {
        name: "activity",
        components: {
            Error_svg: r => require.ensure([], () => r(require("@/components/error_svg")), 'news_init'),
        },
        data() {
            return {
                list: [],
            }
        },
        beforeMount() {
            // this.list = news
            this.getData();
        },
        methods: {
            /**
             * 获取数据
             */
            getData() {
                const _this = this;
                http_async({
                    method: 'post',
                    url: `/regulations/regulations/list`
                }).then(res => {
                    if (res.code === 0) {
                        _this.list = res.rows;
                        window.sessionStorage.setItem('qwhd', JSON.stringify(res.rows))
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
                        name: '趣味活动',
                        page: 'qwhd',
                        number: 3,
                    },
                }).catch(() => {

                })
            },


            openMore(url) {
                this.$router.push({
                    path: `/${url}`
                }).catch(() => {

                })
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "src/assets/theme-color";

    .mb-10 {
        margin-bottom: 10px !important;
    }

    .activity_init {
        width: 100%;
    }

    .activity_body {
        width: 100%;
        min-height: 200px;
        overflow: hidden;
        display: flex;
        justify-content: center;

    }

    .activity_show {
        width: 80%;
        position: relative;
        cursor: default;
        overflow: hidden;
        margin: 0 auto;
        /*display: flex;*/
        /*justify-content: flex-end;*/
        .activity_image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            margin: 0 0 0 auto;
        }

        .activity_mask {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: $mask-bgColor;

            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }
    }

    .activity_items {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .activity_item {
        flex-shrink: 0;
        flex-basis: 45%;
        cursor: pointer;
        max-height: 300px;
        min-height: 150px;
        overflow: hidden;

        padding: 10px 15px;
        box-sizing: border-box;
        border-radius:0 0 15px 15px;
        border: 1px solid transparent;
        background-color: #1d2834;
        color: #ffffff;
        box-shadow: 4px 4px 6px rgba(0,0,0,.6);
        &:hover{
            /*box-shadow: unset;*/
        }
    }
    .activity_item_title{
        font-size: 20px;
        line-height: 24px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding:  0 0 10px 0;
        box-sizing: border-box;
    }
    .activity_item_info{
        padding:  10px 0 0 0 ;
        box-sizing: border-box;
        font-size: 18px;
        line-height: 20px;
        border-top: 1px dashed $borderColor;
    }
    .activity_btn {
        padding: 10px 15px;
        box-sizing: border-box;
        width: fit-content;
        border-radius: 15px;
        border: 1px solid transparent;
        background-color: $active-bgColor;
        color: #ffffff;
        margin: 0   auto;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }


</style>