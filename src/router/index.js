import Vue from 'vue'
import Router from 'vue-router'
/* import { resolve } from 'dns'; */
import Index from '@/components/Index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/externalizaEffect',
      name:'ExternalizaEffect',
      component:(resolve)=>require(['@/components/externalizaEffect/externalizaEffect'],resolve)
    },
    {
      path:'/rewardGold',
      name:'RewardGold',
      component:(resolve)=>require(['@/components/rewardGold/rewardGold'],resolve)
    },
    {
      path:'/studyReport',
      name:'StudyReport',
      component:(resolve)=>require(['@/components/studyReport/StudyReport'],resolve),
      redirect:'/studyReport/listenReport',
      children:[
        {
          path:'/studyReport/listenReport',
          name:'ListenReport',
          component:(resolve)=>require(['@/components/studyReport/ListenReport'],resolve),
        },
        {
          path:'/studyReport/voiceReport',
          name:'VoiceReport',
          component:(resolve)=>require(['@/components/studyReport/VoiceReport'],resolve),
        }
      ]
    },
    {
      path:'/voiceDetail',
      name:'VoiceDetail',
      component:(resolve)=>require(['@/components/studyReport/VoiceDetail'],resolve)
    },
    {
      path:'/videoDetail',
      name:'VideoDetail',
      component:(resolve)=>require(['@/components/studyReport/VideoDetail'],resolve)
    },
    {
      path:'/word',
      name:'Word',
      component:(resolve)=>require(['@/components/studyReport/word'],resolve)
    },
    {
      path:'/phrase',
      name:'Phrase',
      component:(resolve)=>require(['@/components/studyReport/phrase'],resolve)
    },
    {
      path:'/externalizaEffect',
      name:'ExternalizaEffect',   
      component:(resolve)=>require(['@/components/externalizaEffect/externalizaEffect'],resolve)
    },
    {
      path:'/rewardGold',
      name:'RewardGold',
      component:(resolve)=>require(['@/components/rewardGold/rewardGold'],resolve)
    },
    {
      path:'/noviceOnRoad',
      name:'NoviceOnRoad',
      component:(resolve)=>require(['@/components/noviceOnRoad/noviceOnRoad'],resolve)
    },
    {
      path:'/noviceDetail',
      name:'NoviceDetail',
      component:(resolve)=>require(['@/components/noviceOnRoad/noviceDetail'],resolve)
    },
    {
      path:'/timePicker',
      name:'TimePicker',
      component:(resolve)=>require(['@/components/timePicker/timePicker'],resolve)
    },
    {
      path:'/modelTest',
      name:'ModelTest',
      component:(resolve)=>require(['@/components/modelTest/index'],resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router