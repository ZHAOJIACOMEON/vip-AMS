let helloWord = () => import('@/components/HelloWorld.vue')
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/'
    }, {
      path: '/helloWord',
      name: 'helloWord',
      component: helloWord,

    }
  ],
})

export default router