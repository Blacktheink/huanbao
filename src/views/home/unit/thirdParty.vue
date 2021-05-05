<template>
    <div class="thirdParty_init">
        <template v-for="(v,i) in thirdParty">
            <div class="thirdParty_item" :key="i" @click="openPage(v,i)">
                <img class="thirdParty_image" :src="v.img" :alt="v.label"/>
                <div class="thirdParty_item_mask">
                    <div class="thirdParty_label">{{v.label}}</div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {thirdParty} from "@/tool/mnData";

    export default {
        name: "thirdParty",
        data() {
            return {
                thirdParty,
            }
        },
        methods: {
            /**
             * 打开第三方网站
             * @param v
             * @param i
             */
            openPage(v, i) {
                if (v.url) {
                    window.open(v.url)
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "src/assets/theme-color";

    .thirdParty_init {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .thirdParty_item {
        position: relative;
        flex-shrink: 0;
        flex-basis: 22%;
        height: 100px;
        margin-bottom: 20px;
        border-radius: 20px;
    }

    .thirdParty_image {
        width: 100%;
        height: 100%;
        border-radius: 20px;
    }

    .thirdParty_item_mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;

        word-break: break-all;
        border-radius: 20px;
        color: $focus-textColor;
        background-color: rgba(29,40,52,0.7);
    }

    .thirdParty_label{
        width: 100%;
        height: 100%;
        display: none;
        align-items: center;
        justify-content: center;
    }

    .thirdParty_item {
        &:hover {
            .thirdParty_label {
                display: flex;
            }
        }
    }
</style>
