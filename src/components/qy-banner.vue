<template>
    <div class="qy-banner_init">

        <div class="swiper-container" id="mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in list">
                    <slot :item="{item,index}">
<!--                        {{item}}-->
                        <img class="swiper_image" :src="item.src" alt="" />
                    </slot>

                </div>

            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <!--            <div class="swiper-button-prev"></div>&lt;!&ndash;左箭头。如果放置在swiper-container外面，需要自定义样式。&ndash;&gt;-->
            <!--            <div class="swiper-button-next"></div>&lt;!&ndash;右箭头。如果放置在swiper-container外面，需要自定义样式。&ndash;&gt;-->

            <!-- 如果需要滚动条 -->
            <!--            <div class="swiper-scrollbar"></div>-->
        </div>

    </div>
</template>

<script>

    import {Swiper, Navigation, Pagination, Autoplay, Scrollbar} from 'swiper'
    import 'swiper/swiper-bundle.min.css'

    export default {
        name: "qy-banner",
        data() {
            return {
                swiper: null,
            }
        },
        props: {
            list: {
                type: Array,
                default: () => [{
                    src: require('@/assets/banner_1.png'),
                }, {
                    src: require('@/assets/banner_2.png'),
                },{
                    src: require('@/assets/banner_3.png'),
                },{
                    src: require('@/assets/banner_4.png'),
                }]
            },

        },
        mounted() {
            this._initSwiper();
        },
        methods: {
            _initSwiper() {
                const _this = this;
                Swiper.use([
                    // Navigation,
                    Pagination,
                    // Scrollbar,
                    Autoplay]);
                _this.swiper = new Swiper('#mySwiper', {
                    loop: true,
                    // // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        clickableClass: 'my-pagination-clickable',
                    },
                    // // 如果需要前进后退按钮
                    // navigation: {
                    //     nextEl: '.swiper-button-next',
                    //     prevEl: '.swiper-button-prev',
                    // },
                    // // 如果需要滚动条
                    // scrollbar: '.swiper-scrollbar',
                    // //如果需要自动切换海报
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    //切换效果
                    effect: 'fade',
                })
            },


        },
    }
</script>

<style scoped lang="scss">
    .qy-banner_init {
        width: 100%;
        height: 100%;
    }

    .swiper-container {
        --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
        --swiper-navigation-color: #00ff33; /* 单独设置按钮颜色 */
        --swiper-navigation-size: 30px; /* 设置按钮大小 */
    }

    .swiper-container {
        height: 600px;
        width: 100%;

        .swiper-wrapper {
            .swiper-slide {
                width: 100%;
                height: 100%;
                /*background-color: #42b983;*/
                text-align: center;
                line-height: 600px;
            }
        }
    }
    .swiper_image{
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
</style>