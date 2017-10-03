import Vue from 'vue'
import VueRouter from 'vue-router'

// component
import TopView from '@/components/Top'
import MemberView from '@/components/Member'
import LoginView from '@/components/Login'
import FileView from '@/components/File'
import LoginResultView from '@/components/LoginResult'

Vue.use(VueRouter)

var routes = [
  { path: '/', name: 'TOP', component: TopView },
  { path: '/member', name: 'MEMBER', component: MemberView },
  { path: '/login', name: 'LOGIN', component: LoginView },
  { path: '/file', name: 'FILE', component: FileView },
  { path: '/loginresult', name: 'LOGIN_RESULT', component: LoginResultView }
]

var router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // to /loginresult is only from /login
  if (to.name === 'LOGIN_RESULT' && from.name !== 'LOGIN') {
    next('/')
  }

  // normal
  next()
})

export default router
