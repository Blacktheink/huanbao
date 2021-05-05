<template>
    <div class="index_init" ref="index" @scroll="watchScroll">
        <head_init ref="head" :pageNumber="$route.meta.id || 0" :isSlide="isSlide"></head_init>
        <div class="index_banner">
            <qy-banner ></qy-banner>
        </div>
        <div class="index_body">
            <div class="index_body_init">
                <router-view name="content"></router-view>

            </div>
        </div>
        <div class="index_float">
            <div class="index_imgBox " :class="{
                'index_float_top':isSlide ===1,
                'index_float_top_close':isSlide !==1,
            }" v-show="isSlide ===1 " @click="toTop">
                <img class="" src="../assets/toTop.png" alt="返回顶部"
                     title="返回顶部"
                />
            </div>
            <div class="index_imgBox" @click="openDialog">
                <img class="index_float_img" src="../assets/activity.png" alt="活动申报" title="活动申报"/>
            </div>

        </div>
        <foot_init></foot_init>
        <qy-dialog :show.sync="show" title="反馈信息" @confirm="confirmHook">
            <div class="dialog_body">
                <div class="dialog_body_item row">
                    <div class="dialog_body_item_label">反馈主题</div>
                    <qy-input v-model="information.title" placeholder="请填写"></qy-input>
                </div>
                <div class="dialog_body_item">
                    <div class="dialog_body_item_label row mb-5">反馈详情</div>
                    <qy-input v-model="information.content" type="textarea" placeholder="请填写"></qy-input>
                </div>
            </div>
        </qy-dialog>
    </div>
</template>

<script>
    export default {
        name: "index",
        components: {
            QyBanner: r => require.ensure([], () => r(require('@/components/qy-banner')), 'index_init'),
            foot_init: r => require.ensure([], () => r(require('@/components/foot_init')), 'index_init'),
            head_init: r => require.ensure([], () => r(require('@/components/head_init')), 'index_init'),
            QyDialog: r => require.ensure([], () => r(require('@/components/qy-dialog')), 'dialog_init'),
            QyInput: r => require.ensure([], () => r(require('@/components/qy-input')), 'dialog_init'),
        },
        data() {
            return {
                //是否滚动 （0：没有；1：滚动）
                isSlide: 0,
                timer: null,
                //
                show: false,
                information:{
                    title:'',
                    content:''
                },
            };
        },
        // beforeRouteEnter(to,from,next){
        //     console.warn(to)
        //     next();
        // },
        beforeMount() {
            // console.warn(this.$route)
        },
        methods: {
            /**
             * 监听页面滚动
             * @param e
             */
            watchScroll(e) {
                const _this = this;
                if (e.target.scrollTop > _this.$refs.head.$el.scrollHeight - 5) {
                    _this.isSlide = 1;
                } else {
                    _this.isSlide = 0;
                }
            },

            /**
             * 返回顶部
             */
            toTop() {
                const _this = this;
                cancelAnimationFrame(_this.timer);
                _this.timer = requestAnimationFrame(function fn() {
                    let oTop = _this.$refs.index.scrollTop;
                    if (oTop > 0) {
                        _this.$refs.index.scrollTop = oTop - 50;
                        _this.timer = requestAnimationFrame(fn);
                    } else {
                        cancelAnimationFrame(_this.timer);
                    }
                })
            },
            /**
             * 打开活动申报
             */
            openDialog() {
                const _this = this;
                _this.show = true;
            },
            confirmHook(){
                console.warn(this.information)
            }


        },
    }
</script>

<style scoped lang="scss">
    @import "src/assets/theme-color";
    .index_init {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;

        .index_banner {
            flex-shrink: 0;
            width: 100%;
            /*height: 200px;*/
            /*background-color: red;*/
        }

        .index_body {
            flex: 1;
            width: 100%;
            flex-shrink: 0;
            box-sizing: border-box;
            padding: 24px 50px;
            background-color:$body-bgColor;

            .index_body_init {
                height: 100%;
                width: 1200px;
                /*background-color: #2c9678;*/
                margin: 0 auto;
            }
        }

        .index_float {
            position: fixed;
            right: 50px;
            bottom: 50px;
            width: 50px;
            min-height: 100px;

            display: flex;
            flex-direction: column;
            justify-content: flex-end;

            .index_imgBox {
                cursor: pointer;
                border-radius: 50%;
                box-sizing: border-box;
                background-color: white;
                transition: all .3s;
                margin-bottom: 20px;

                position: relative;
                width: 100%;
                height: 0;
                padding-bottom: 100%;

                box-shadow: 12px 12px 20px -12px rgba(0, 0, 0, .35);

                img {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: calc(100% - 20px);
                    height: calc(100% - 20px);
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }


            .index_float_top {
                animation: slide-top .5s cubic-bezier(.25, .46, .45, .94) both
            }

            .index_float_top_close {
                animation: slide-top-close .5s cubic-bezier(.25, .46, .45, .94) both
            }
        }

        @keyframes slide-top {
            0% {
                transform: translateY(-100px);
                opacity: 0.4;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
        @keyframes slide-top-close {
            0% {
                transform: translateY(0);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px);
                opacity: 0;
            }
        }

        .dialog_body{
            padding: 0 10px;
            box-sizing: border-box;
            .dialog_body_item{
                /*display: flex;*/
                /*flex-wrap: wrap;*/
                /*align-items: center;*/
                margin-bottom: 15px;
                .dialog_body_item_label{
                    margin-right: 15px;
                }
            }
        }


    }

    .row{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .mb-5{
        margin-bottom: 5px;
    }
</style>