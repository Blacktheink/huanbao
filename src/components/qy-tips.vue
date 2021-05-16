<template>
    <div class="qy-tips" @click="clickClose">
        <div class="loader_body" v-if="type==='loading'">
            <div class="loader" id="loader-3">
            </div>
            <div class="loader_title">{{message}}</div>
        </div>
        <div class="tips_box" v-else-if="type==='error'">
            <img class="tips_img" :src="require('../assets/notiy_error.png')" alt=""/>
            <div class="tips_title">{{message}}</div>
        </div>
        <div class="tips_box" v-else-if="type==='success'">
            <img class="tips_img" :src="require('../assets/notiy_success.png')" alt=""/>
            <div class="tips_title">{{message}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "qy-tips",
        data() {
            return {
                type: 'loading',
                message: "正在加载中，请稍后",
            }
        },
        methods:{
            clickClose(){
                if(type!=='loading'){
                    this.close()
                }
            },
        }
    }
</script>

<style scoped lang="scss">

    .qy-tips {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        cursor: default;
        z-index: 2021;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .loader_body {
        position: relative;
    }

    .loader_title {
        color: #3498db;
        font-size: 20px;
        position: absolute;
        bottom: -150px;
        left: 50%;
        transform: translateX(-50%);
        width: 90vw;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }


    .loader:before,
    .loader:after {
        content: "";
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        left: calc(50% - 10px);
        background-color: #3498db;
        animation: squaremove 1s ease-in-out infinite;
    }

    .loader:after {
        bottom: 0;
        animation-delay: 0.5s;
    }

    @keyframes squaremove {
        0%, 100% {
            -webkit-transform: translate(0, 0) rotate(0);
            -ms-transform: translate(0, 0) rotate(0);
            -o-transform: translate(0, 0) rotate(0);
            transform: translate(0, 0) rotate(0);
        }
        25% {
            -webkit-transform: translate(40px, 40px) rotate(45deg);
            -ms-transform: translate(40px, 40px) rotate(45deg);
            -o-transform: translate(40px, 40px) rotate(45deg);
            transform: translate(40px, 40px) rotate(45deg);
        }
        50% {
            -webkit-transform: translate(0px, 80px) rotate(0deg);
            -ms-transform: translate(0px, 80px) rotate(0deg);
            -o-transform: translate(0px, 80px) rotate(0deg);
            transform: translate(0px, 80px) rotate(0deg);
        }
        75% {
            -webkit-transform: translate(-40px, 40px) rotate(45deg);
            -ms-transform: translate(-40px, 40px) rotate(45deg);
            -o-transform: translate(-40px, 40px) rotate(45deg);
            transform: translate(-40px, 40px) rotate(45deg);
        }
    }


    .tips_box {
        border-radius: 10px;
        background-color: white;
        box-sizing: border-box;
        padding: 20px;
        min-height: 100px;
        min-width: 300px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .tips_img {
        width: 40px;
        height: 40px;
        margin-bottom: 20px;
    }

    .tips_title {
        color: #3498db;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>