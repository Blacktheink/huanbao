<template>
    <div>
        <title_template class="mb-10" title="新 闻 资 讯" subTitle="NEWS AND INFORMATION"></title_template>
        <news class="mb-10"></news>
        <div class="home_more mb-40" @click="openMore('xwzx')">更多内容</div>
        <title_template class="mb-10" title="法 律 法 规" subTitle="LAWS AND REGULATIONS"></title_template>
        <laws class="mb-40"></laws>
        <title_template class="mb-10" title="趣 味 活 动" subTitle="FUN ACTIVITIES"></title_template>
        <activity class="mb-40"></activity>
        <title_template class="mb-10" title="第 三 方" subTitle="THIRD PARTY"></title_template>
        <third-party></third-party>
    </div>
</template>

<script>
    export default {
        name: "index",
        components: {
            Title_template: r => require.ensure([], () => r(require('@/components/title_template')), 'home_init'),
            ThirdParty: r => require.ensure([], () => r(require('@/views/home/unit/thirdParty')), 'home_init'),
            News: r => require.ensure([], () => r(require('@/views/home/unit/news')), 'home_init'),
            laws: r => require.ensure([], () => r(require('@/views/home/unit/laws')), 'home_init'),
            Activity: r => require.ensure([], () => r(require('@/views/home/unit/activity')), 'home_init'),
        },
        data() {
            return {}
        },
        methods: {
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

    .mb-20 {
        margin-bottom: 20px !important;
    }

    .mb-40 {
        margin-bottom: 40px !important;
    }

    .home_more {
        border: 1px solid $borderColor;
        padding: 10px 15px;
        box-sizing: border-box;
        border-radius: 20px;
        width: fit-content;
        margin: 0 auto;
        cursor: pointer;
    }
</style>