import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({ 
  history: createWebHistory(),  // history 模式
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import("@/views/login/index.vue"),
      meta: {
        title: 'login',
      },
    }
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next)=>{
  if (to.meta.title) {
    document.title = `${to.meta.title}`;
  }
  next()
})

router.afterEach((to, from)=>{
  console.log('afterEach')
})

export default router