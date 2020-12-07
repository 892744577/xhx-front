import Home from '@/views/Home/Home.vue';
import Record from '@/views/Record/Record.vue';
import Setting from '@/views/Setting/Setting.vue';
import Mine from '@/views/Mine/Mine.vue';
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "Mine" */ '../views/Login/Login.vue'),
    meta: { footShow: false },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { footShow: true },
  },
  {
      path: '/record',
      name: 'record',
      component: Record,
      meta: { footShow: true },
  },
  {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: { footShow: true },
  },
  {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: { footShow: true },
  }
];

export default routes
