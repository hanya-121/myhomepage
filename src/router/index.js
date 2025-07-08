// router/index.ts
import { createRouter, createWebHistory } from 'vue-router/auto'
// import { routes } from 'vue-router/auto-routes' 자동 라우팅 사용 xx


// 수동 라우트 임포트
import Main from '../include/Main.vue'
import About from '../components/About.vue'
import Project from '../components/Project.vue'
import Contact from '../components/Contact.vue'


// 수동 라우트 정의
const routes = [
  { path: '/', component: Main },         // 홈페이지 진입 시
  { path: '/about', component: About },
  { path: '/project', component: Project },
  { path: '/contact', component: Contact },
]

// createRouter 설정 (라우터 생성)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})



// dynamic import 오류 대응 (그대로 유지)
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
