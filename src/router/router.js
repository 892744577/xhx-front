import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './index'
Vue.use(VueRouter)


const router = new VueRouter({
    routes
})
const excludeRoutre = ['login', 'register', 'forgetpsd']
console.log(router)
// router.beforeEach((to, from, next) => {
//     // const { token } = getStorage('i_f', {})
//     let token = false
//     if (!token && !excludeRoutre.includes(to.name)) {
//         next({
//             name: 'login'
//         })
//     } else {
//         next()
//     }
// })

// router.afterEach(to => {
//   window.document.title = to.meta.title
//   window.scrollTo(0, 0)
// })

export default router
