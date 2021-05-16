<template>
    <div class="wenzhang_init">
        <crumbs class="wenzhang_crumbs"></crumbs>
        <newsList class="wenzhang_list" :news="news" @openDetails="openDetails"></newsList>
        <qy-pager v-if="news.length>0&&news.length<=pageSize" :total="total" :pageSize="pageSize" :current="current"
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
                total: 10,
                pageSize: 10,
                current: 1,
                news: [],
            }
        },
        beforeMount() {
            // this.news = news
            // window.sessionStorage.setItem('xwzx', JSON.stringify(news))
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
                    url: `/invitation/invitation/list`
                }).then(res => {
                    if (res.code === 0) {
                        _this.news = res.rows;
                        _this.total = res.total;
                        window.sessionStorage.setItem('xwzx', JSON.stringify(res.rows))
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
            openDetails(v) {
                const _this = this;
                _this.$router.push({
                    path: '/details',
                    query: {
                        index: v.index,
                        name: _this.$route.meta.label || '法律法规',
                        page: _this.$route.name || 'flfg',
                        number: _this.$route.meta.id || 2,
                    },
                }).catch(() => {

                })
            },


        },
    }
</script>

<style scoped lang="scss">
    .wenzhang_init {
        width: 100%;
        min-height: 100%;
        padding: 0 0 20px;
        box-sizing: border-box;

        .wenzhang_crumbs {
            height: 40px;
        }

        .wenzhang_list {
            margin-top: 20px;
            margin-bottom: 20px;
        }
    }
</style>