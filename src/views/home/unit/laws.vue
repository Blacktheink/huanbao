<template>
    <div class="laws_init">
        <div v-if="list.length>0" class="laws_body">
            <div class="laws_show">
                <img class="laws_image" :src="require('../../../assets/banner_8.png')" alt=""/>
                <div class="laws_mask"></div>
            </div>
            <div class="laws_list">
                <div class="laws_items">
                    <template v-for="(v,i) in list.slice(0,5)">
                        <div class="laws_item mb-10" :key="i" @click="openDetails(i)">
                            <div class="laws_item_title ">{{v['title']}}</div>
                            <div class="laws_item_info">{{v['info']}}</div>
                        </div>
                    </template>
                </div>
                <div class="laws_btn" @click="openMore('flfg')">
                    更多 +
                </div>
            </div>
        </div>
        <error_svg v-else></error_svg>
    </div>
</template>

<script>
    import {news} from "@/tool/mnData";
    import {http_async} from "@/tool/http";

    export default {
        name: "laws",
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
                    url: `/regulations/regulations/list`
                }).then(res => {
                    if (res.code === 0) {
                        _this.list = res.rows;
                        window.sessionStorage.setItem('flfg', JSON.stringify(res.rows))
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
                        name: '法律法规',
                        page: 'flfg',
                        number: 2,
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
        margin-bottom: 10px;
    }

    .laws_init {
        width: 100%;
    }

    .laws_body {
        width: 100%;
        min-height: 200px;
        max-height: 500px;
        overflow: hidden;
        display: flex;
        justify-content: center;

    }

    .laws_show {
        width: 40%;
        position: relative;
        cursor: default;
        overflow: hidden;
        /*display: flex;*/
        /*justify-content: flex-end;*/
        .laws_image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            margin: 0 0 0 auto;
        }

        .laws_mask {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: $mask-bgColor;
        }
    }

    .laws_list {
        flex-shrink: 0;
        width: 40%;
        padding: 10px 15px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .laws_item {
            cursor: pointer;
            padding: 10px 15px;
            box-sizing: border-box;
            border-radius: 15px;
            border: 1px solid $borderColor;
            background-color: $bgrColor;
            box-shadow: 3px 3px 5px 0 rgba(0,0,0,.15), inset 3px 5px 0 0 #fff;
        }
        .laws_item_title{
            font-size: 20px;
            line-height: 24px;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 5px;
        }
        .laws_item_info{
            font-size: 18px;
            line-height: 20px;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .laws_btn{
            padding: 10px 15px;
            box-sizing: border-box;
            width: fit-content;
            border-radius: 15px;
            border: 1px solid $borderColor;
            background-color: $bgrColor;
            margin: 0 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

    }


</style>