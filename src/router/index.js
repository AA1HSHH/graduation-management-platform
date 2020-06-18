import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'

import Login from '@/components/Login'

import StudentIndex from '../views/Student/StudentIndex'
import StudentConfig from '../views/Student/StudentConfig' // eslint-disable-line no-unused-vars
import StudentWorkInfo from '../views/Student/StudentWorkInfo' // eslint-disable-line no-unused-vars
import StudentStudyInfo from '../views/Student/StudentStudyInfo' // eslint-disable-line no-unused-vars
import StudentInfo from '../views/Student/StudentInfo'

import TeacherIndex from '../views/Teacher/TeacherIndex'
import TeacherInfo from '../views/Teacher/TeacherInfo'
import TeacherDetailInfo from '../views/Teacher/TeacherDetailInfo'
import TeacherNotice from '../views/Teacher/TeacherNotice'

Vue.use(VueRouter)
  

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
	meta: {
	      // 页面标题title
	      title: '登录'
	    }
  },
  {
    path: '*',
    name: 'Home',
    component: Home,
	meta: {
	      // 页面标题title
	      title: '页面走丢了'
	    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  	meta: {
  	      // 页面标题title
  	      title: 'about'
  	    }
  },
  
  {
    path: '/studentindex',
    name: 'StudentIndex',
    component: StudentIndex,
	meta: {
	      // 页面标题title
	      title: '毕业生就业管理系统'
	    },
	children:[
		{
		  path: '/studentindex/studentinfo',
		  name: 'StudentInfo',
		  component: StudentInfo,
		  meta: {
		        // 页面标题title
		        title: '我的信息'
		      },
		},
		{
		  path: '/studentindex/studentworkinfo',
		  name: 'StudentWorkInfo',
		  component: StudentWorkInfo,
		  meta: {
		        // 页面标题title
		        title: '就业信息'
		      },
		},
		{
		  path: '/studentindex/studentconfig',
		  name: 'StudentConfig',
		  component: StudentConfig,
		  meta: {
		        // 页面标题title
		        title: '信息修改'
		      },
		},
		{
		  path: '/studentindex/studentstudyinfo',
		  name: 'StudentStudyInfo',
		  component: StudentStudyInfo,
		  meta: {
		        // 页面标题title
		        title: '学校信息'
		      },
		},
	]
  },
  {
    path: '/teacherindex',
    name: 'TeacherIndex',
    component: TeacherIndex,
	meta: {
	      // 页面标题title
	      title: '毕业生就业管理系统'
	    },
    children:[
      {
        path: '/teacherindex/teacherinfo',
        name: 'TeacherInfo',
        component: TeacherInfo,
		meta: {
		      // 页面标题title
		      title: '概况'
		    },
      },
      {
        path: '/teacherindex/teacherdetailinfo',
        name: 'TeacherDetailInfo',
        component: TeacherDetailInfo,
		meta: {
		      // 页面标题title
		      title: '详细信息'
		    },
      },
      {
        path: '/teacherindex/teachernotice',
        name: 'TeacherNotice',
        component: TeacherNotice,
		meta: {
		      // 页面标题title
		      title: '通知'
		    },
      }
    ]
  },
  
 
  /*{
    path: '/studentindex',
    name: 'StudentIndex',
    component: StudentIndex,
    children:[
      {
        path: '/studetindex/studentinfo',
        name: 'StudentInfo',
        component: StudentInfo
      },
     
    ]
  },*/
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
