<template>
	<el-container class="home-container">
		<!-- 头部区域 -->
		<el-header>
			<div style="white-space:nowrap;margin-left: 15px;">
				<img src="../../assets/me.png" alt="" style="height: 40px; border-radius: 50%" />
				<span>企业OA办公管理系统</span>
				<div class=""><i class="el-icon-user">普通用户</i></div>
			</div>
			<!-- <div class="data" style="float: right">
				{{ dateFormat(date) }}
			</div> -->
			<!-- 系统公告展示 -->
			<el-badge :value="noticeDataList.length" type="warning">
				<el-button round size="medium" type="info" @click.native.prevent="
			    	outerVisible = true">
					<i class="el-icon-message-solid"></i>
					系统公告
				</el-button>
			</el-badge>
			<el-dialog title="公告" :visible.sync="outerVisible" top="10px" width="65%">
				<el-table :data="noticeDataList" style="width: 100%" max-height="450">
					<!-- <el-table-column fixed prop="noticeId" label="编号" width="150">
					</el-table-column> -->
					<el-table-column prop="noticeTopic" label="主题" width="200">
					</el-table-column>
					<el-table-column prop="noticeContent" label="具体内容" width="300">
					</el-table-column>
					<el-table-column prop="noticePublisher" label="发布人/编辑" width="200">
					</el-table-column>
					<el-table-column prop="noticeTime" label="发布时间" width="250">
					</el-table-column>
					<!-- <el-table-column prop="userId" label="负责人" width="200">
					</el-table-column> -->
				</el-table>
			</el-dialog>
			<!-- <el-drawer
			  :data="noticeData"
			    :title="noticeData.noticeTopic"
			    :visible.sync="drawer"
			    direction="ttb"
			    >
			    <span>{{noticeData.noticeContent}}</span>
			  </el-drawer> -->
			<el-button type="danger" @click="logout"><i class="el-icon-switch-button">退出</i></el-button>
		</el-header>
		<!-- 页面主体区域 -->
		<el-container>
			<!-- 侧边栏 -->
			<el-aside :width="isCollapse ? '64px' : '230px'">
				<!-- <div class="toggle-button" @click="toggleCollapse">
					<i class="el-icon-menu"></i>目录
				</div> -->
				<el-col :span="30">
					<el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
						background-color="#323744" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true">
						<!-- 首页模块 -->
						<!-- <el-submenu index="1" style="margin-left: 25px">
							<span slot="title"><i @click="autoToIndex" class="el-icon-s-home"></i>首页</span>
						</el-submenu> -->
						<el-menu-item index="1" @click="autoToIndex" style="margin-left: 25px">
							<span slot="title"><i class="el-icon-s-home"></i>首页</span>
						</el-menu-item>

						<el-submenu index="2">
							<span slot="title"><i class="el-icon-s-order"></i>请假管理</span>
							<el-menu-item index="4-1" @click="addLeave"><i class="el-icon-s-promotion"></i>填写请假单
							</el-menu-item>
							<el-menu-item index="4-2" @click="queryLeave"><i class="el-icon-s-comment"></i>请假单管理
							</el-menu-item>
						</el-submenu>

						<el-submenu index="3">
							<span slot="title"><i class="el-icon-date"></i>考勤管理</span>
							<el-menu-item index="5-1" @click="addAttend"><i class="el-icon-edit-outline"></i>考勤签到登记
							</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-col>
				<!-- </el-menu> -->
			</el-aside>
			<el-main>
				<!-- 路由占位符 -->
				<router-view> </router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {
		get
	} from '../../main-dev.js'
	export default {
		data() {
			return {
				noticeDataList: [],
				noticeData: [],
				date: new Date(),
				//是否折叠
				isCollapse: false,
				activePath: '',
				// 通知公告弹出
				outerVisible: false,
			}
		},
		created() {
			// this.autoToIndex()
			// 需要自动执行获取数据的方法 放到这个生命周期里执行就可以了
			// this.activePath = window.sessionStorage.getItem('activePath')
			// 自动获取部门信息
			// this.getDeptData()
			// 自动获取员工信息
			// this.getEmpData()
			this.getNoticeList();
		},
		methods: {
			// queryDept() {
			// 	this.$router.push('/dept/queryDept')
			// },
			// 通知公告弹出
			openNotice() {

			},
			// 获取后台公告列表
			async getNoticeList() {
				// 发送请求
				let noticeData = await get('/oa/Notice/allNoticeList')
				// console.log(noticeData.data)
				this.noticeDataList = noticeData.data
			},
			// 普通用户主页
			autoToIndex() {
				this.$router.push('/comuser/userIndex')
			},
			// 考勤签到登记
			addAttend() {
				this.$router.push('/comuser/addAttend')
			},
			toAtedPage() {
				this.$router.push('/ated/ated')
			},
			dateFormat(time) {
				var date = new Date(time)
				var year = date.getFullYear()
				/* 在日期格式中，月份是从0开始的，因此要加0
				 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				 * */
				var month =
					date.getMonth() + 1 < 10 ?
					'0' + (date.getMonth() + 1) :
					date.getMonth() + 1
				var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
				var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
				var minutes =
					date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
				var seconds =
					date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
				// 拼接
				return (
					year +
					'-' +
					month +
					'-' +
					day +
					' ' +
					hours +
					':' +
					minutes +
					':' +
					seconds
				)
			},
			// addDept() {
			// 	this.$router.push('/dept/addDept')
			// },
			handleOpen(key, keyPath) {
				console.log(key, keyPath)
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath)
			},
			// 填写请假单
			addLeave() {
				this.$router.push('/comuser/addLeave')
			},
			// 查询请假单状态
			queryLeave() {
				this.$router.push('/comuser/queryLeave')
			},
			logout() {
				window.sessionStorage.clear()
				this.$router.push('/login')
			},
			//点击按钮，切换菜单的折叠与展开
			// toggleCollapse() {
			// 	this.isCollapse = !this.isCollapse
			// },
			// async getDeptData(){
			// 1.发送网络请求 获取对应的数据
			// let deptData = await get('/oa/department/deptList')
			// console.log(deptData.data);
			// 2.对请求成功返回的数据进行筛选 对data中的对应的变量进行赋值
			// this.deptData = deptData.data
			// },

			// 获取员工信息
			// async getEmpData() {
			// 设置参数
			// let data = {
			// page: 1,
			// pageSize: 6,
			// }
			// 发送请求
			//   let empData = await get('/oa/Employee/list', data)
			//   this.empData = empData.data.list
			// },

		},
		mounted() {
			//显示当前日期时间
			let _this = this // 声明一个变量指向Vue实例this，保证作用域一致
			this.timer = setInterval(() => {
				_this.date = new Date() // 修改数据date
			}, 1000)
		},
		beforeDestroy() {
			if (this.timer) {
				clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
			}
		},
	}
</script>

<style lang="less" scoped>
	.home-container {
		height: 100%;
	}

	.el-header {
		background-color: #373d41;
		display: flex;
		justify-content: space-between;
		padding-left: 0;
		align-items: center;
		color: #fff;
		font-size: 20px;

		>div {
			display: flex;
			align-items: center;

			span {
				margin-left: 15px;
			}
		}
	}

	.el-aside {
		background-color: #333744;

		.el-menu {
			border-right: none;
		}
	}

	.el-main {
		background-color: #eaedf1;
	}

	.toggle-button {
		background-color: #4a5064;
		font-size: 10px;
		line-height: 24px;
		color: #fff;
		text-align: center;
		letter-spacing: 0.2em;
		cursor: pointer;
	}

	/deep/.el-submenu {
		color: aquamarine;
	}

	.data {
		margin-left: 900px;
		float: right;
	}

	.el-submenu {
		margin-left: 20px;
	}

	// .el-menu-item {
	//   margin-left: 10px;
	// }
</style>
