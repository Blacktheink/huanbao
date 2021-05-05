<template>
    <div class="title_init">
        <div class="title_sub">{{subTitle}}</div>
        <div class="title_title">{{title}}</div>
    </div>
</template>

<script>
    export default {
        name: "title_template",
        props: {
            title: {
                type: String,
                default: '标 题',
            },
            subTitle: {
                type: String,
                default: 'TITLE',
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "src/assets/theme-color";

    .title_init {
        width: 100%;
        cursor: default;
        position: relative;
        height: 40px;
    }

    .title_sub {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        font-size: 28px;
        line-height: 32px;
        font-weight: bolder;
        z-index: 1;
        height: 100%;
        color: $sub-color;
        margin: auto 0 0;
    }

    .title_title {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        line-height: 28px;
        font-weight: bolder;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        color: $title-color;
        z-index: 10;
    }

</style>