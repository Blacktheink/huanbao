<template>
    <div class="huodong_init">
        <crumbs class="huodong_crumbs" :nav="nav"></crumbs>
        <newsList class="huodong_list" theme="huodong" :news="list" @openDetails="openDetails"></newsList>
        <qy-pager v-if="list.length>0&&list.length<=pageSize" :total="total" :pageSize="pageSize" :current="current"
                  @changePage="changePage"></qy-pager>
    </div>
</template>

<script>
    import {http, http_async} from "@/tool/http";
    import {news} from "@/tool/mnData";

    export default {
        name: "index",
        components: {
            QyPager: r => require.ensure([], () => r(require('@/components/qy-pager')), 'wz_init'),
        },
        data() {
            return {
                nav: [
                    {
                        label: '首页',
                        url: '/home',
                    },
                    {
                        label: '趣味活动',
                        url: '/qwhd',
                    }
                ],
                total: 10,
                pageSize: 10,
                current: 1,
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
                http({
                    method: 'post',
                    url: `/activities/activities/list`
                }).then(res => {
                    if (res.code === 0) {
                        _this.list = res.rows;
                        _this.total = res.total;
                        window.localStorage.setItem('qwhd',JSON.stringify(res.rows))
                    }
                })
            },
            /**
             * 切换页码
             * @param i
             */
            changePage(i) {
                this.current = i;
                this.getData();
            },
            /**
             * 打开详情
             * @param v
             */
            openDetails(v){
                const _this = this;
                _this.$router.push({
                    path:'/details',
                    query:{
                        index:v.index,
                        name:_this.$route.meta.label||'法律法规',
                        page:_this.$route.name||'flfg',
                        number:_this.$route.meta.id||2,
                    },
                }).catch(()=>{

                })
            },


        },
    }
</script>

<style scoped lang="scss">
    .huodong_init {
        width: 100%;
        min-height: 100%;
        padding: 0 0 20px;
        box-sizing: border-box;

        .huodong_crumbs {
            height: 40px;
        }

        .huodong_list {
            margin-top: 20px;
            margin-bottom: 20px;
        }
    }
</style>