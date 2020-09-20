import Vue from 'vue'
import VueRouter from 'vue-router'


import Layout from '../layout'
// const Home = () => import('views')
const Psdesign = () => import('views/psdesign')
const Researchcenter = () => import('views/researchcenter')
const Computertechnology = () => import('views/computertechnology')
const Enterpriseplanningdepartment = () => import('views/enterpriseplanningdepartment')
const AIdepartment = () => import('views/AIdepartment')
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import('views/home')
      },
      {
        path: '/psdesign',
        component: Psdesign
      }
      ,
      {
        path: '/researchcenter',
        component: Researchcenter
      }
      ,
      {
        path: '/computertechnology',
        component: Computertechnology
      }
      ,
      {
        path: '/enterpriseplanningdepartment',
        component: Enterpriseplanningdepartment
      },
      {
        path: '/AIdepartment',
        component: AIdepartment
      }
    ],
    redirect: "/home"
  },


]

const scrollBehavior = function (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    };
  }
};

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior
}

)
export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}