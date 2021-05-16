import Vue from 'vue'
import VueRouter from 'vue-router'
import {navigation} from "@/tool/mnData";

Vue.use(VueRouter)
//全局加载组件
Vue.component('newsList',r=>require.ensure([],()=>r(require('../components/news_list')),'page_init'))
Vue.component('crumbs',r=>require.ensure([],()=>r(require('../components/crumbs')),'page_init'))
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: r => require.ensure([], () => r(require('../views/index')), 'router-init'),
        children:navigation,
    },

    {
        path: '*',
        component: r => require.ensure([], () => r(require('../views/index')), 'router-init'),
        redirect: '/home',
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
