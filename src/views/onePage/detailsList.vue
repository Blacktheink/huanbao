<template>
    <div class="details_init">
        <crumbs :nav="nav" class="details_crumbs" position="left"></crumbs>
        <div class="details_body" v-if="content" >
            <div class="details_title">{{content['title']}}</div>
            <div class="details_status">
                <div class="details_status_item __time">{{content['updateTime']}}</div>
                <div class="details_status_item">{{content['note']}}</div>
                <div class="details_status_item">{{nav[1]['label']}}</div>
            </div>
            <div class="details_content" v-html="content['content']"></div>
        </div>
        <div v-else class="details_error">
            <div>
                <svg t="1618141650905" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="6195" width="200" height="200">
                    <path d="M975.36 491.52c0-7.68-2.56-12.8-5.12-20.48L798.72 135.68c-7.68-17.92-25.6-30.72-46.08-30.72H273.92c-20.48 0-38.4 12.8-46.08 30.72L53.76 476.16c-2.56 5.12-5.12 12.8-5.12 20.48v404.48c0 15.36 10.24 25.6 25.6 25.6h875.52c15.36 0 25.6-10.24 25.6-25.6v-409.6zM102.4 486.4l163.84-320c5.12-7.68 12.8-12.8 23.04-12.8l448 2.56c10.24 0 17.92 5.12 23.04 12.8L921.6 486.4c2.56 2.56 2.56 7.68 2.56 12.8v15.36H742.4c-15.36 0-25.6 10.24-25.6 25.6v76.8H307.2v-76.8c0-15.36-10.24-25.6-25.6-25.6H99.84v-12.8c0-5.12 0-10.24 2.56-15.36z m821.76 384H99.84V563.2H256V640c0 15.36 10.24 25.6 25.6 25.6h460.8c15.36 0 25.6-10.24 25.6-25.6v-76.8h156.16v307.2zM512 307.2c12.8 0 25.6-10.24 25.6-25.6v-51.2c0-15.36-12.8-25.6-25.6-25.6s-25.6 10.24-25.6 25.6v51.2c0 15.36 12.8 25.6 25.6 25.6z m0 256c12.8 0 25.6-10.24 25.6-25.6v-51.2c0-15.36-12.8-25.6-25.6-25.6s-25.6 10.24-25.6 25.6v51.2c0 15.36 12.8 25.6 25.6 25.6zM588.8 384c0 15.36 12.8 25.6 25.6 25.6h51.2c12.8 0 25.6-10.24 25.6-25.6s-12.8-25.6-25.6-25.6h-51.2c-12.8 0-25.6 10.24-25.6 25.6z m-230.4 25.6h51.2c12.8 0 25.6-10.24 25.6-25.6s-12.8-25.6-25.6-25.6h-51.2c-12.8 0-25.6 10.24-25.6 25.6s12.8 25.6 25.6 25.6zM409.6 307.2a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0z m153.6 0a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0z m43.52 171.52c10.24-10.24 10.24-25.6 0-35.84-10.24-10.24-25.6-10.24-35.84 0-10.24 10.24-10.24 25.6 0 35.84s25.6 10.24 35.84 0zM486.4 384a25.6 25.6 0 1 0 51.2 0 25.6 25.6 0 1 0-51.2 0z m-33.28 58.88c-10.24-10.24-25.6-10.24-35.84 0-10.24 10.24-10.24 25.6 0 35.84s25.6 10.24 35.84 0 10.24-25.6 0-35.84z"
                          p-id="6196" fill="#63bbd0"></path>
                </svg>
            </div>
            <div>暂无数据</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "detailsList",
        data() {
            return {
                nav: [
                    {
                        label: '首页',
                        url: '/home',
                    },
                    {
                        label: '法律法规',
                        url: '/flfg',
                    },
                    {
                        label: '详情',
                    },
                ],
                content: '',
            }
        },
        beforeMount() {
            const _this = this;
            _this.$route.meta.id = _this.$route.query.number
            _this.nav[1] = {
                label: _this.$route.query.name,
                url: `/${_this.$route.query.page}`,
            }
            _this.content = JSON.parse(window.sessionStorage.getItem(_this.$route.query.page))[_this.$route.query.index]
        },


    }
</script>

<style scoped lang="scss">
    @import "src/assets/theme-color";

    .details_init {
        width: 100%;
    }

    .details_crumbs {
        margin-bottom: 20px;
    }

    .details_body {
        padding: 10px;
        box-sizing: border-box;
        min-height: 600px;
        border-radius: 20px;
        box-shadow: 0 30px 30px 10px rgba(0, 64, 128, .2);
    }

    .details_title {
        font-weight: bolder;
        word-break: break-all;
        line-height: 28px;
        font-size: 24px;
        color: $detail_text;
        padding: 10px;
        box-sizing: border-box;
    }

    .details_status {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
    }

    .details_status_item{
        line-height: 24px;
        font-size: 20px;
        min-width: 200px;
        margin-bottom: 20px;
    }
    .__time{
        flex-shrink: 0;
    }

    .details_content{
        line-height: 24px;
        font-size: 18px;
        word-break: break-all;
        img{
            max-width: 100%;
        }
        video{
            max-width: 100%;
        }
    }

    .details_error {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #63bbd0;
    }

</style>