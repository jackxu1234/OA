<template>
	<el-card>
		<el-container>
			<el-header>
				<!-- <el-row> -->
				<!-- <el-collapse v-model="activeNames" @change="handleChange"> -->
				<!-- <div> -->
				<!-- <el-row> -->
				<img src="../../assets/1.png" alt="" style="height: 80px" />
				<el-button @click="toAted" style="
            height: 80px;
            top: -42px;
            left: 0;
            background: #f4f7fa;
            position: relative;
          ">{{this.countData.atedNum}}<br />今日签到人数</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
				<img src="../../assets/2.png" alt="" style="height: 80px" />
				<el-button @click="toEmp" style="
            height: 80px;
            top: -42px;
            left: 0;
            background: #f4f7fa;
            position: relative;
          ">{{this.countData.empNum}}<br />雇佣中人数</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
				<img src="../../assets/3.png" alt="" style="height: 80px" />
				<el-button @click="toLeave" style="
            height: 80px;
            top: -42px;
            left: 0;
            background: #f4f7fa;
            position: relative;
          ">{{this.countData.leaveNum}}<br />待审批请假单</el-button>
				<img src="../../assets/4.png" alt="" style="height: 80px" />
				<el-button @click="toNotice" style="
            height: 80px;
            top: -42px;
            left: 0;
            background: #f4f7fa;
            position: relative;
          ">{{this.countData.noticeNum}}<br />活动公告统计</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
				<img src="../../assets/5.png" alt="" style="height: 80px" />
				<el-button @click="toDept" style="
            height: 80px;
            top: -42px;
            left: 0;
            background: #f4f7fa;
            position: relative;
          ">{{this.countData.deptNum}}<br />部门总数量</el-button>
				<!-- </el-row> -->
				<!-- </div> -->
				<!-- </el-collapse> -->
				<!-- </el-row> -->
			</el-header>
			<el-container>
				<!-- <el-aside style="position: relative;top:20px;left:20px;width:400px">
          <div class="con">
            <div class="now-data-myself">
              <div class="now-data-myself-time">{{ date }}</div>
              <div class="now-data-myself-week">{{ week }}</div>
            </div>
            <Calendar
              v-on:choseDay="clickDay"
              v-on:changeMonth="changeDate"
              v-on:isToday="clickToday"
            ></Calendar>
          </div>
        </el-aside> -->
				<el-main style="top: 20px; left: 0px; position: relative">
					<div id="main" style="width: 100%;height:400px;"></div>
				</el-main>
			</el-container>
			<el-footer>
				<!-- <el-row :gutter="[16, 16]">
        <el-col :lg="6" :md="6" :sm="6" :xs="12">
          <el-card :bordered="false">
            <el-statistic
              title="Active Users"
              :value="9.3"
              :precision="2"
              suffix="%"
              class="demo-class"
              :value-style="{ color: '#cf1322' }"
            >
              <template #prefix>
                <arrow-down-outlined />
              </template>
            </el-statistic>
          </el-card>
        </el-col>
        <el-col :lg="6" :md="6" :sm="6" :xs="12">
          <el-card :bordered="false">
            <el-statistic
              title="Feedback"
              :value="11.28"
              :precision="2"
              suffix="%"
              :value-style="{ color: '#3f8600' }"
              style="margin-right: 50px"
            >
              <template #prefix>
                <arrow-up-outlined />
              </template>
            </el-statistic>
          </el-card>
        </el-col>
        <el-col :lg="6" :md="6" :sm="6" :xs="12">
          <el-card :bordered="false">
            <el-statistic
              title="Unmerged"
              :value="1128"
              style="margin-right: 50px"
            >
              <template #suffix>
                <like-outlined />
              </template>
            </el-statistic>
          </el-card>
        </el-col>
        <el-col :lg="6" :md="6" :sm="6" :xs="12">
          <el-card :bordered="false">
            <el-statistic-countdown
              title="Countdown"
              :value="deadline"
              style="margin-right: 50px"
            />
          </el-card>
        </el-col>
      </el-row> -->
				<!-- <el-input style="width: 100%" placeholder="注意事项" v-model="input" :disabled="true">
				</el-input> -->
				<!-- <el-empty description="暂无数据"></el-empty> -->
				<!-- <el-table :data="tableData" height="400" ref="table" style="width: 100%">
					<el-table-column prop="noticeTopic" label="标题" width="180" align="center">
					</el-table-column>
					<el-table-column prop="noticeContent" label="内容" width="700" align="center">
					</el-table-column>
					<el-table-column prop="noticeTime" label="发布时间" align="center"> </el-table-column>
				</el-table> -->
			</el-footer>
		</el-container>
	</el-card>
</template>

<script>
	import {
		get
	} from '../../main-dev'
	import Calendar from 'vue-calendar-component'
	import axios from 'axios'
	export default {
		components: {
			Calendar,
		},
		data() {
			return {
				countData: {
					empNum: '',
					deptNum: '',
					noticeNum: '',
					leaveNum: '',
					atedNum: ''
				},
				tableData: [],
				activeNames: ['1'],
				date: '',
				week: '',
				input: '',
			}
		},
		created() {
			var now = new Date()
			this.date = now.getDate() //得到日期
			var day = now.getDay() //得到周几
			var arr_week = new Array(
				'星期日',
				'星期一',
				'星期二',
				'星期三',
				'星期四',
				'星期五',
				'星期六'
			)
			this.week = arr_week[day]
		},
		created() {
			this.display()
			this.getCountData()
		},
		methods: {
			getCountData() {
				axios.get('/oa/Employee/queryEmployeeCount').then((result) => {
					// console.log(result.data);
					this.countData.empNum = result.data
				})
				axios.get('/oa/Department/queryDepartmentCount').then((result) => {
					this.countData.deptNum = result.data
				})
				axios.get('/oa/LeaveOfAbsence/queryLeaveOfAbsenceCount').then((result) => {
					this.countData.leaveNum = result.data
				})
				axios.get('/oa/Notice/queryNoticeCount').then((result) => {
					this.countData.noticeNum = result.data
				})
				axios.get('/oa/Attendance/queryAttendanceCount').then((result) => {
					this.countData.atedNum = result.data
				})
			},
			// clickDay(data) {
				// console.log(data) 
				//选中某天
			// },
			// changeDate(data) {
				// console.log(data) 
				//左右点击切换月份
			// },
			// clickToday(data) {
				// console.log(data) 
				// 跳到了本月
			// },
			// handleChange(val) {
				// console.log(val)
			// },
			async display() {
				// 发送请求
				let noticeData = await get('/oa/Notice/allNoticeList')
				// console.log(noticeData.data)
				this.tableData = noticeData.data
				// console.log(this.tableData);
			},
			toAted() {
				this.$router.push('/ated/ated')
			},
			toEmp() {
				this.$router.push('/emp/QueryEmp')
			},
			toDept() {
				this.$router.push('/dept/queryDept')
			},
			toLeave() {
				this.$router.push('/leave/leavue')
			},
			toNotice() {
				this.$router.push('/notice/notice')
			},
			init() {
				// 拿到表格挂载后的真实DOM
				const table = this.$refs.table;
				// 拿到表格中承载数据的div元素
				const divData = table.bodyWrapper;
				// 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
				setInterval(() => {
					// 元素自增距离顶部1像素
					divData.scrollTop += 1;
					// 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
					if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
						// 重置table距离顶部距离
						divData.scrollTop = 0;
					}
				}, 50);
			},
			drawChart() {
				// 基于准备好的dom，初始化echarts实例  这个和上面的main对应
				let myChart = this.$echarts.init(document.getElementById("main"));
				// 指定图表的配置项和数据
				let option = {
					title: {
						text: ''
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['Epm', 'Dept', 'notice', 'leave', 'ated']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: 'emp',
							type: 'line',
							stack: 'Total',
							data: [12, 13, 10, 13, 9, 23, 21]
						},
						{
							name: 'Dept',
							type: 'line',
							stack: 'Total',
							data: [22, 18, 19, 23, 29, 33, 31]
						},
						{
							name: 'notice',
							type: 'line',
							stack: 'Total',
							data: [15, 23, 20, 15, 19, 33, 40]
						},
						{
							name: 'leave',
							type: 'line',
							stack: 'Total',
							data: [32, 32, 30, 33, 30, 30, 30]
						},
						{
							name: 'ated',
							type: 'line',
							stack: 'Total',
							data: [8, 9, 0, 9, 12, 13, 7]
						}
					]
				};
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},
		},
		mounted() {
			this.init();
			this.drawChart();
		},
	}
</script>

<style lang="less" scoped>
	.now-data-myself {
		width: 40%;
		position: absolute;
		border-right: 1px solid rgba(227, 227, 227, 0.6);
		margin-left: 80px;
	}

	.con {
		width: 400px;
		position: relative;
		max-width: 4000px;
		/* margin-left: 0px; */
		margin-right: 0px;
		margin-top: 20px;
	}

	.con .wh_content_all {
		background: transparent !important;
	}

	.wh_top_changge li {
		color: #f56c6c !important;
		font-size: 15px !important;
	}

	.wh_content_item,
	.wh_content_item_tag {
		color: #303133 !important;
	}

	.wh_content_item .wh_isToday {
		background: #00d985 !important;
		color: #fff !important;
	}

	.wh_content_item .wh_chose_day {
		background: #409eff !important;
		color: #ffff !important;
	}

	.wh_item_date:hover {
		background: rgb(217, 236, 255) !important;
		border-radius: 100px !important;
		color: rgb(102, 177, 255) !important;
	}

	.wh_jiantou1[data-v-2ebcbc83] {
		border-top: 2px solid #909399;
		border-left: 2px solid #909399;
		width: 7px;
		height: 7px;
	}

	.wh_jiantou2[data-v-2ebcbc83] {
		border-top: 2px solid #909399;
		border-right: 2px solid #909399;
		width: 7px;
		height: 7px;
	}

	.wh_top_tag[data-v-2ebcbc83] {
		color: #409eff;
		border-top: 1px solid rgba(227, 227, 227, 0.6);
		border-bottom: 1px solid rgba(227, 227, 227, 0.6);
	}

	.wh_container[data-v-2ebcbc83] {
		max-width: 280px;
	}

	.wh_top_changge[data-v-2ebcbc83] {
		display: flex;
		width: 50%;
		margin-left: 43%;
	}

	.now-data-myself-time {
		color: #f56c6c;
		font-size: 28px;
		height: 30px;
		font-family: 'Helvetica Neue';
		/* margin-left: 50px; */
	}

	.now-data-myself-week {
		font-size: 10px;
		color: #909399;
	}

	.wh_top_changge .wh_content_li[data-v-2ebcbc83] {
		font-family: Helvetica;
	}

	.el-card {
		height: 1500px;
	}

	.el-header {
		height: 70px;
	}
</style>
