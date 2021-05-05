<template>
    <div class="head_init" :class="[isSlide?'_isSlide_now':'']">
        <div class="head_left">
            <img class="head_logo" src="../assets/logo.png" alt="" @click="openPage(0)"/>
            <span class="head_title">环境保护，从我做起</span>
        </div>
        <div class="head_nav">
            <template v-for="(item,index) in navigation">
                <div class="head_nav_item head_title"
                     v-if="item['meta']['show']"
                     :class="{'__active':Number(pageNumber) === index}"
                     @click="openPage(index)">{{item['meta']['label']}}
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import {navigation} from "@/tool/mnData";

    export default {
        name: "head_init",
        data() {
            return {
                navigation,
            }
        },
        props: {
            pageNumber: {
                type: [String, Number],
                default: 0,
            },
            isSlide: {
                type: Number,
                default: 0,
            },
        },
        methods: {
            openPage(index) {
                const _this = this;
                if (index !== '' && navigation[index].path) {
                    _this.$router.push({
                        path: navigation[index].path
                    }).catch(()=>{

                    })
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "src/assets/theme-color";
    .head_init {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        height: 80px;
        display: flex;
        padding: 10px 50px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        background-color:$mask-bgColor;
        /*background-color: #394867;*/
        transition: all .3s;

        .head_title {
            color:$textColor;
            font-size: 24px;
            font-weight: bolder;
        }

        .head_left {
            cursor: default;
            height: 100%;
            display: flex;
            align-items: center;

            .head_logo {
                cursor: pointer;
                height: 100%;
                margin-right: 30px;
            }
        }


        .head_nav {
            display: flex;
            height: 100%;
            align-items: center;

            .head_nav_item {
                cursor: pointer;
                min-width: 85px;
                height: 80%;
                min-height: fit-content;
                padding: 8px;
                margin-right: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                border-radius: 10px;
                border: 2px solid transparent;

                &:last-child {
                    margin-right: 0;
                }

                &:hover {
                    color: $textColor;
                    border-bottom-color: transparent;
                    background-color: rgba(255, 255, 255, 0.7);
                    opacity: 0.8;
                }
            }

            .__active {
                color: #394867;
                border-bottom-color: $focus-borderColor;
            }
        }
    }

    ._isSlide_now {
        position: fixed;
        background-color:$focus-bgColor !important;

        .head_title {
            color: #9BA4B4 !important;
        }

        .head_nav_item {
            &:hover {
                color: #394867 !important;
                background-color: rgba(255, 255, 255, 1) !important;
            }
        }

        .__active {
            color: #fff !important;
            border-bottom-color: #fff !important;
        }
    }
</style>