import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login.vue'
const Login = () => import('../components/Login.vue')
// import Home from '../components/Home.vue'
const Home = () => import('../components/Home.vue')

const Comuser = () => import('../components/userface/Comuser.vue')
const UserIndex = () => import('../components/userface/Userindex.vue')
// import Welcome from '../components/Welcome.vue'

const Welcome = () => import('../components/Welcome.vue')
const AddEmp = () => import('../components/emp/AddEmp.vue')
const DelEmp = () => import('../components/emp/DelEmp.vue')
const QueryEmp = () => import('../components/emp/QueryEmp.vue')

const Leave = () => import('../components/leave/leavue.vue')
const AddLeave = () => import('../components/leave/addLeave.vue')
const QueryLeave = () => import('../components/leave/queryLeave.vue')

const Notice = () => import('../components/notice/notice.vue')
const Activity = () => import('../components/notice/activity.vue')
const Index = () => import('../components/notice/index.vue')

const AddDept = () => import('../components/dept/AddDept.vue')
const DelDept = () => import('../components/dept/delDept.vue')
const QueryDept = () => import('../components/dept/queryDept.vue')

const AddAttend = () => import('../components/attend/addAttend.vue')
const QueryAttend = () => import('../components/attend/queryAttend.vue')
const Regis = () => import('../components/regis.vue')



Vue.use(VueRouter)

const routes = [{
		path: '/',
		redirect: '/login'
	}, //路由的重定向 自动跳转到此页面
	{
		path: '/login',
		component: Login
	},
	{
		path: '/home',
		component: Home,
		children: [{
				path: '/welcome',
				component: Welcome
			},
			{
				path: '/emp/addEmp',
				component: AddEmp
			},
			{
				path: '/emp/delEmp',
				component: DelEmp
			},
			{
				path: '/emp/queryEmp',
				component: QueryEmp
			},
			{
				path: '/leave/leavue',
				component: Leave
			},
			{
				path: '/notice/notice',
				component: Notice
			},
			{
				path: '/notice/activity',
				component: Activity
			},
			{
				path: '/dept/addDept',
				component: AddDept
			},
			{
				path: '/dept/delDept',
				component: DelDept
			},
			{
				path: '/dept/queryDept',
				component: QueryDept
			},
			{
				path: '/index',
				component: Index
			},
			{
				path: '/atted/queryAttend',
				component: QueryAttend
			},
			
		]
	},
	{
		path: '/regis',
		component: Regis
	},
	{
		path: '/comuser',
		component: Comuser,
		children: [{
			path: '/comuser/userIndex',
			component: UserIndex
		},
		{
			path: '/comuser/addLeave',
			component: AddLeave
		},
		{
			path: '/comuser/queryLeave',
			component: QueryLeave
		},
		{
			path: '/comuser/addAttend',
			component: AddAttend
		},
		]
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
	//   //to 将要访问的路径
	//   //from 代表从哪个路径跳转而来
	//   //next 是一个函数，表示放行
	//   //     next()  放行     next('/login')  强制跳转
	if (to.path == '/login') return next()
	//  //获取token
	//  const tokenStr = window.sessionStorage.getItem('token')
	//  if(!tokenStr) return next('/login')
	next()
})


export default router
