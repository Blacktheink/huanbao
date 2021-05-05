<template>
    <div class="foot_init">
        <div class="foot_left">保护环境</div>
        <div class="foot_init_body">
            <div class="foot_line"></div>
            <img class="foot_code" src="../assets/qrcode.png" alt=""/>
        </div>
        <div class="foot_right">人人有责</div>
    </div>
</template>

<script>
    export default {
        name: "foot_init"
    }
</script>

<style scoped lang="scss">
    @import "src/assets/theme-color";
    .foot_init {
        box-sizing: border-box;
        background-color:$active-borderColor;
        padding: 0 50px 20px;
        display: flex;
        justify-content: space-around;

        .foot_left,.foot_right{
            height: 100%;
            display: flex;
            align-items: center;
            font-size: 25px;
            color: white;
        }

        .foot_init_body {
            display: flex;
            flex-direction: column;
            align-items: center;

            .foot_line {
                width: 2px;
                height: 30px;
                background-color: white;
            }

            .foot_code {
                padding: 10px;
                box-sizing: border-box;
                background-color: white;
                border-radius: 8px;
                width: 80px;
                height: 80px;
            }
        }


    }
</style>