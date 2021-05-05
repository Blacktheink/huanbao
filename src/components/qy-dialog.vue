<template>
    <div class="qy-dialog_mask" v-show="show" @click.self="closeDialog">
        <div class="qy-dialog_body" ref="body" :class="{'__open':show,'__close':isClose,}">
            <div class="qy-dialog_head">
                <slot name="head">
                    <div class="qy-dialog_head__title">{{title}}</div>
                </slot>
            </div>
            <div class="qy-dialog_inner">
                <slot></slot>
            </div>
            <div class="qy-dialog_foot">
                <slot name="foot">
                    <div class="qy-dialog_foot__inner">
                        <div class="qy-dialog_foot__btn __confirm" @click="confirm">
                            确认
                        </div>
                        <div class="qy-dialog_foot__btn __cancel" @click="cancel">
                            取消
                        </div>
                    </div>
                </slot>
            </div>
        </div>


        <!--       关闭         -->
        <div class="qy-dialog_body__closeIcon">
            <slot name="closeIcon">
                <svg t="1618545176695" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="32307" width="128" height="128">
                    <path d="M0 0m512 0l0 0q512 0 512 512l0 0q0 512-512 512l0 0q-512 0-512-512l0 0q0-512 512-512Z"
                          p-id="32308" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"
                          fill="#cdcdcd"></path>
                    <path d="M541.320533 516.846933l154.624-154.624a20.241067 20.241067 0 0 0 0-28.4672l-0.853333-0.853333a20.241067 20.241067 0 0 0-28.4672 0L512 487.765333l-154.624-154.8288a20.241067 20.241067 0 0 0-28.4672 0l-0.853333 0.853334a19.8656 19.8656 0 0 0 0 28.4672l154.624 154.624-154.624 154.624a20.241067 20.241067 0 0 0 0 28.4672l0.853333 0.853333a20.241067 20.241067 0 0 0 28.4672 0L512 546.133333l154.624 154.624a20.241067 20.241067 0 0 0 28.4672 0l0.853333-0.853333a20.241067 20.241067 0 0 0 0-28.4672l-154.624-154.624z"
                          p-id="32309" data-spm-anchor-id="a313x.7781069.0.i0" class="" fill="#ffffff"></path>
                </svg>
            </slot>
        </div>

    </div>
</template>

<script>
    export default {
        name: "qy-dialog",
        data() {
            return {
                isClose: false,
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false,
            },
            title: {
                type: String,
                default: '标题'
            },
            beforeClose:{
                type:Function
            } ,
        },
        methods: {
            closeDialog() {
                this.isClose = true;
                setTimeout(() => {
                    this.isClose = false;
                    if(typeof this.beforeClose == "function")
                    {
                        this.beforeClose(this.$emit('update:show', false))
                    }else {
                        this.$emit('update:show', false)
                    }
                }, 300)
            },
            confirm(){
                this.$emit('confirm');
                this.closeDialog();
            },
            cancel(){
                this.$emit('cancel');
                this.closeDialog();
            },


        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/theme-color.scss";

    .qy-dialog_mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: default;
        background-color: $mask-bgColor;
        z-index: 2020;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .__open {
        animation: scale-in-br .3s cubic-bezier(0.175, 0.885, 0.320, 1.275);
    }

    .__close {
        animation: scale-out-center .3s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
    }

    .qy-dialog_body {
        position: relative;
        min-width: 300px;
        min-height: 300px;
        max-width: 90%;
        max-height: 90%;
        z-index: 2021;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: $bgrColor;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .qy-dialog_head {
            padding: 24px 15px 10px;
            box-sizing: border-box;

            .qy-dialog_head__title {
                color: $textColor;
                font-weight: bold;
                font-size: 18px;
                display: flex;
                align-items: center;
            }
        }

        .qy-dialog_inner {
            padding: 0 15px;
            box-sizing: border-box;
        }

        .qy-dialog_foot {
            padding: 10px 15px 24px;
            box-sizing: border-box;
            .qy-dialog_foot__inner{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                flex-wrap: wrap;
                .qy-dialog_foot__btn{
                    border: 1px solid #2c3e50;
                    cursor: pointer;
                    padding: 0 10px;
                    box-sizing: border-box;
                    border-radius: 5px;
                    height: 34px;
                    line-height: 34px;
                    font-size: 16px;
                    margin-right: 10px;
                    &:last-child{
                        margin-right: 0;
                    }
                    &:hover{
                        opacity: 0.6;
                    }
                }
                .__confirm{
                    border-color:$active-borderColor ;
                    background-color:$active-bgColor ;
                    color:$active-textColor;
                }
                .__cancel{}
            }
        }
    }

    .qy-dialog_body__closeIcon {
        position: absolute;
        right: 200px;
        top: 100px;
        width: 22px;
        height: 22px;
        z-index: 2022;

        svg {
            cursor: pointer;
            width: 100%;
            height: 100%;
        }

    }

    @keyframes scale-in-br {
        0% {
            transform: scale(0);
            transform-origin: 100% 100%;
            opacity: 0;
        }
        100% {
            transform: scale(1);
            transform-origin: 100% 100%;
            opacity: 1;
        }
    }

    @keyframes scale-out-center {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
</style>