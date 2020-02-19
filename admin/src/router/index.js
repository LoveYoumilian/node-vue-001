import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Main',
        component: Main,
        children: [{
                path: '/categories/create',
                name: 'CategoryEdit',
                component: CategoryEdit
            },
            {
                path: '/categories/list',
                name: 'CategoryList',
                component: CategoryList
            },
            {
                path: '/categories/edit/:id',
                name: 'CategoryListDetail',
                component: CategoryEdit,
                props: true
            },
            {
                path: '/items/create',
                name: 'ItemEdit',
                component: ItemEdit
            },
            {
                path: '/items/list',
                name: 'ItemList',
                component: ItemList
            },
            {
                path: '/items/edit/:id',
                name: 'ItemListDetail',
                component: ItemEdit,
                props: true
            },
            {
                path: '/heroes/create',
                name: 'HeroEdit',
                component: HeroEdit
            },
            {
                path: '/heroes/list',
                name: 'HeroList',
                component: HeroList
            },
            {
                path: '/heroes/edit/:id',
                name: 'HeroListDetail',
                component: HeroEdit,
                props: true
            },
            { path: '/articles/create', component: ArticleEdit },
            { path: '/articles/edit/:id', component: ArticleEdit, props: true },
            { path: '/articles/list', component: ArticleList },

            { path: '/ads/create', component: AdEdit },
            { path: '/ads/edit/:id', component: AdEdit, props: true },
            { path: '/ads/list', component: AdList },

            { path: '/admin_users/create', component: AdminUserEdit },
            { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
            { path: '/admin_users/list', component: AdminUserList },
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: { isPublic: true }
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    console.log(111)
    if (!to.meta.isPublic && !localStorage.token) {
        // debugger
        next('/login')
    }
    next()
})
export default router