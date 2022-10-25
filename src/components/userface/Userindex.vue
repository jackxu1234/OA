<template>
	<el-card>
		<el-container>
			<el-header>
				<!-- <el-row> -->
				<!-- <el-collapse v-model="activeNames" @change="handleChange"> -->
				<!-- <div> -->
				<!-- <el-row> -->
				<img src="../../assets/1.png" alt="" style="height: 80px;" />
				<el-button style="height: 80px;top:-42px;left:0; background: #f4f7fa; position: relative;">0<br />今日签到次数
				</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
				<img src="../../assets/2.png" alt="" style="height: 80px;" />
				<el-button style="height: 80px;top:-42px;left:0; background: #f4f7fa; position: relative;">5<br />雇佣中人数
				</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
				<img src="../../assets/3.png" alt="" style="height: 80px;" />
				<el-button style="height: 80px;top:-42px;left:0; background: #f4f7fa; position: relative;">
					11<br />待审批请假单</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
				<!-- <img src="../../assets/4.png" alt="" style="height: 80px;" />
				<el-button style="height: 80px;top:-42px;left:0; background: #f4f7fa; position: relative;">
					31<br />待审批办公用品</el-button> -->
				<img src="../../assets/5.png" alt="" style="height: 80px;" />
				<el-button style="height: 80px;top:-42px;left:0; background: #f4f7fa; position: relative;">7<br />部门总数量
				</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
				<!-- </el-row> -->
				<!-- </div> -->
				<!-- </el-collapse> -->
				<!-- </el-row> -->
			</el-header>
			<el-container>
				<el-aside style="position: relative;top:20px;left:20px;width:400px">
					<div class="con">
						<div class="now-data-myself">
							<div class="now-data-myself-time">{{ date }}</div>
							<div class="now-data-myself-week">{{ week }}</div>
						</div>
						<Calendar :choseDay="clickDay" :changeMonth="changeDate" :isToday="clickToday">
						</Calendar>
					</div>
				</el-aside>
				<el-main style="top: 20px;left:0px;position: relative;">
					<el-input style="width: 700px" placeholder="更新日志" v-model="input" :disabled="true">
					</el-input>
					<el-empty description="暂无数据"></el-empty>
				</el-main>
			</el-container>
		</el-container>
	</el-card>
</template>

<script>
	/* eslint-disable */
	import Calendar from 'vue-calendar-component'
	export default {
		components: {
			Calendar,
		},
		data() {
			return {
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
		methods: {
			clickDay(data) {
				console.log(data) //选中某天
			},
			changeDate(data) {
				console.log(data) //左右点击切换月份
			},
			clickToday(data) {
				console.log(data) // 跳到了本月
			},
			handleChange(val) {
				console.log(val)
			},
		},
	}
</script>

<style lang="less" scoped>
	.now-data-myself {
		width: 40%;
		position: absolute;
		border-right: 1px solid rgba(227, 227, 227, 0.6);
		margin-left: 100px;

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
		height: 700px;
	}

	.el-header {
		height: 70px;
	}
</style>
