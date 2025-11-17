import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        // 聊天界面
        path: '/',
        name: 'home',
        component: () => import('@/page/home/home.vue')
    },
    {
        // 商品详情页
        path: '/goodsDetail',
        name: 'goodsDetail',
        component: () => import('@/page/goodsDetail/index.vue')
    },
    {
        // 投诉页
        path: '/complaintPage',
        name: 'complaintPage',
        component: () => import('@/page/complaintPage/index.vue')
    },
]

// 创建路由实例
const router= createRouter({
    history: createWebHistory(),
    routes,
})

export default router