<template>
    <div class="index_init" ref="index" @scroll="watchScroll">
        <head_init ref="head" :pageNumber="$route.meta.id || 0" :isSlide="isSlide"></head_init>
        <div class="index_banner">
            <qy-banner></qy-banner>
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
            <div class="index_imgBox" @click="openDialog('feedback')">
                <img class="index_float_img" src="../assets/activity.png" alt="反馈" title="反馈"/>
            </div>
            <div class="index_imgBox" @click="openDialog('activity')">
                <img class="index_float_img" src="../assets/article.png" alt="活动申报" title="活动申报"/>
            </div>

        </div>
        <foot_init></foot_init>
        <qy-dialog :show.sync="show" :title="dialog[activeDialog]['label']" @confirmHook="confirmHook">
            <div class="dialog_body">
                <div class="dialog_body_item row border-b" v-if="activeDialog==='feedback'">
                    <div class="dialog_body_item_label">{{dialog[activeDialog]['title_label']}}</div>
                    <input class="dialog_body_item_input" v-model="dialog[activeDialog]['title']" placeholder="请填写"/>
                </div>
                <div class="dialog_body_item row border-b" v-else>
                    <div class="dialog_body_item_label">{{dialog[activeDialog]['title_label']}}</div>
                    <select ref="select" class="select_init" :selectedIndex="selectedIndex" @change="changeSelect">
<!--                        <option disabled selected>-&#45;&#45;请选择-&#45;&#45;</option>-->
                        <option v-for="(o,i) in options" :key="i"   :value="o['title']">{{o['title']}}</option>
                    </select>
                </div>
                <div class="dialog_body_item" v-if="activeDialog!=='activity'">
                    <div class="dialog_body_item_label row mb-5">{{dialog[activeDialog]['content_label']}}</div>
                    <textarea class="textarea_init" v-model="dialog[activeDialog]['content']" placeholder="请填写"></textarea>
                </div>
                <div class="dialog_body_item row border-b">
                    <div class="dialog_body_item_label">{{dialog[activeDialog]['phone_label']}}</div>
                    <input class="dialog_body_item_input" v-model="dialog[activeDialog]['phone']" placeholder="请填写"/>
                </div>
                <div class="dialog_body_item row">
                    <div class="dialog_body_item_label __error">{{error_msg}}</div>
                </div>
            </div>
        </qy-dialog>

    </div>
</template>

<script>
    import {tips} from "@/components";
    import {http, http_async} from "@/tool/http";

    export default {
        name: "index",
        components: {
            QyBanner: r => require.ensure([], () => r(require('@/components/qy-banner')), 'index_init'),
            foot_init: r => require.ensure([], () => r(require('@/components/foot_init')), 'index_init'),
            head_init: r => require.ensure([], () => r(require('@/components/head_init')), 'index_init'),
            QyDialog: r => require.ensure([], () => r(require('@/components/qy-dialog')), 'dialog_init'),
        },
        data() {
            return {
                selectedIndex:0,
                options:[],
                //是否滚动 （0：没有；1：滚动）
                isSlide: 0,
                timer: null,
                //
                show: false,
                activeDialog: 'feedback',
                error_msg: 'sss',
                dialog: {
                    feedback: {
                        label: '反馈信息',
                        title_label: '反馈主题',
                        content_label: '反馈详情',
                        phone_label: '联系方式',
                        title: '',
                        content: '',
                        phone: '',
                    },
                    activity: {
                        label: '活动申报',
                        title_label: '活动主题',
                        content_label: '活动详情',
                        phone_label: '联系方式',
                        title: '',
                        content: '',
                        phone: '',
                    },
                },
                information: {
                    title: '',
                    content: ''
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
            openDialog(e) {
                const _this = this;
                _this.activeDialog = e || 'feedback';
                _this.error_msg = ""
                _this.dialog[e]['phone'] = ""
                if(e==='feedback'){
                    _this.dialog[e]['title'] = ""
                    _this.dialog[e]['content'] = ""
                }
                if(e==='activity'){
                    _this.options =   JSON.parse((window.localStorage.getItem('qwhd')))
                    _this.selectedIndex = 0;
                }
                _this.show = true;
            },
            changeSelect(e){
                const _this = this;
                _this.selectedIndex = e.target.selectedIndex
            },
             async confirmHook(done) {
                const _this = this;
                if (!_this.dialog[_this.activeDialog]['phone']) {
                    _this.error_msg = "请填写联系方式"
                    return
                }
                // if(_this.dialog[ _this.activeDialog]['phone'].length!==11 &&_this.dialog[ _this.activeDialog]['phone'].length!==10){
                //     _this.error_msg= "联系方式不正确，请重新填写"
                //     return
                // }
                if (!/^[1-9]{1}[0-9]{9,10}$/g.test(_this.dialog[_this.activeDialog]['phone'])) {
                    _this.error_msg = "联系方式不正确，请重新填写"
                    return
                }
                _this.error_msg = "";

                  if (_this.activeDialog === 'feedback') {
                      let dataList = new FormData();
                      dataList.append('note', _this.dialog.feedback.title);
                      dataList.append('opinion', _this.dialog.feedback.content);
                      dataList.append('contact', _this.dialog.feedback.phone);
                      http({
                          method: 'post',
                          url: `/feedback/feedback/add`,
                          data: dataList,
                      }).then(res => {
                          if (res.code === 0) {
                              let success = tips({
                                  type: 'success',
                                  message: "反馈成功",
                              })
                              setTimeout(() => {
                                  done()
                                  success.close();
                              }, 1000)
                          }else{
                              let success = tips({
                                  type: 'error',
                                  message: "反馈失败，请重试",
                              })
                              setTimeout(() => {
                                  done()
                                  success.close();
                              }, 1000)
                          }
                      }).catch(err => {
                          let success = tips({
                              type: 'error',
                              message: "反馈失败，请重试",
                          })
                          setTimeout(() => {
                              done()
                              success.close();
                          }, 1000)
                      })





                }
                if (_this.activeDialog === 'activity') {
                    let dataList = new FormData();
                    dataList.append('id', _this.options[_this.selectedIndex]['id']);
                    dataList.append('title', _this.options[_this.selectedIndex]['title']);
                    dataList.append('phone', _this.dialog.activity.phone);
                    http({
                        method: 'post',
                        url: `/apply/apply/add`,
                        data: dataList,
                    }).then(res => {
                        if (res.code === 0) {
                            let success = tips({
                                type: 'success',
                                message: "申报成功",
                            })
                            setTimeout(() => {
                                done()
                                success.close();
                            }, 1000)
                        }else{
                            let success = tips({
                                type: 'error',
                                message: "申报失败，请重试",
                            })
                            setTimeout(() => {
                                done()
                                success.close();
                            }, 1000)
                        }
                    }).catch(err => {
                        let success = tips({
                            type: 'error',
                            message: "申报失败，请重试",
                        })
                        setTimeout(() => {
                            done()
                            success.close();
                        }, 1000)
                    })
                }
                 // done()

                // done()
            }
        },
        //新增反馈
        setFeedBack() {
            return new Promise((resolve, reject) => {
                const _this = this;
                let dataList = new FormData();
                dataList.append('note', _this.dialog.feedback.title);
                dataList.append('opinion', _this.dialog.feedback.content);
                dataList.append('contact', _this.dialog.feedback.phone);
                console.warn(this.dialog)

                http({
                    method: 'post',
                    url: `/feedback/feedback/add`,
                    data: dataList,
                }).then(res => {
                    if (res.code === 0) {
                        _this.list = res.rows;
                        window.localStorage.setItem('flfg', JSON.stringify(res.rows))
                        _this.total = res.total;

                        let success = tips({
                            type: 'success',
                            message: "反馈成功",
                        })
                        setTimeout(() => {
                            resolve()
                            success.close();
                        }, 1000)
                    }else{
                        let success = tips({
                            type: 'error',
                            message: "反馈失败，请重试",
                        })
                        setTimeout(() => {
                            resolve()
                            success.close();
                        }, 1000)
                    }

                }).catch(err => {
                    reject(err)
                    let success = tips({
                        type: 'error',
                        message: "反馈失败，请重试",
                    })
                    setTimeout(() => {
                        resolve()
                        success.close();
                    }, 1000)
                })
            })

        },
        //新增活动
        submitActivity() {
            const _this = this;
            return new Promise((resolve, reject) => {
                http_async({
                    method: 'post',
                    url: `/invitation/invitation/add`
                }).then(res => {
                    if (res.code === 0) {
                        _this.list = res.rows;
                        window.localStorage.setItem('flfg', JSON.stringify(res.rows))
                        _this.total = res.total;
                    }
                    let success = tips({
                        type: 'success',
                        message: "申报成功",
                    })
                    setTimeout(() => {
                        resolve()
                        success.close();
                    }, 1000)
                }).catch(err => {
                    reject(err)
                })
            })

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
            background-color: $body-bgColor;

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

        .dialog_body {
            width: 40vw;
            padding: 0 10px;
            box-sizing: border-box;

            .dialog_body_item {
                padding-bottom: 10px;
                /*display: flex;*/
                /*flex-wrap: wrap;*/
                /*align-items: center;*/
                margin-bottom: 15px;

                .dialog_body_item_label {
                    margin-right: 15px;
                    flex-shrink: 0;
                }

                .dialog_body_item_input {
                    flex: 1;
                }
            }
        }


    }

    .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .mb-5 {
        margin-bottom: 5px;
    }

    .__error {
        color: brown;
    }

    .border-b {
        border-bottom: 2px solid #2c3e50;
    }
    .textarea_init{
        resize: none;
        width: 100% !important;
        line-height: 40px;
        color: $textColor;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 0 15px;
        border: 1px solid $borderColor;
        &:focus,&:active{
            border-color: $focus-borderColor;
        }
    }
    .select_init{
        width: 50%;
        height: 40px;
        line-height: 40px;
    }
</style>