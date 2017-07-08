import Vue from 'vue'
import Router from 'vue-router'
import ModuleHome from '@/components/ModuleHome.vue'
import ModuleCanvas from '@/components/ModuleCanvas.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: ModuleHome
        },
        {
            path: '/canvas',
            name: 'Canvas',
            component: ModuleCanvas
        }
    ]
})
