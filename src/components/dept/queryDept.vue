<template>
	<div class="contener">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>部门管理</el-breadcrumb-item>
			<el-breadcrumb-item>部门编辑</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row :data="deptForm">
			<el-input placeholder="请输入员工编号" v-model="input" style="width: 500px" clearable>
			</el-input>
			<el-button type="info" @click="displayDialog2();outerVisible = true">查询</el-button>
			<el-dialog title="员工信息" :visible.sync="outerVisible">
				<el-row>部门编号:<input v-model="deptForm.deptNo" prop="deptNo" placeholder="部门编号" readonly /></el-row>
				<el-row>部门名称:<input v-model="deptForm.deptName" prop="deptName" placeholder="部门名称" /></el-row>
				<el-row>部门主任:<input v-model="deptForm.deptLeader" prop="deptLeader" placeholder="部门主任" /></el-row>
				<el-row>部门人数:<input v-model="deptForm.deptNum" prop="deptNum" placeholder="部门人数" /></el-row>
				<el-row>备&nbsp;&nbsp;注&nbsp;&nbsp;&nbsp;&nbsp;:<input v-model="deptForm.deptRemark" prop="deptRemark"
						placeholder="备注" /></el-row>
				<el-row>状&nbsp;&nbsp;态&nbsp;&nbsp;&nbsp;&nbsp;:<input v-model="deptForm.status" prop="status"
						placeholder="状态" /></el-row>
				<el-row>管理员ID:<input v-model="deptForm.userId" prop="userId" placeholder="管理员ID" /></el-row>
				<div slot="footer" class="dialog-footer">
					<el-button @click="outerVisible = false">取 消</el-button>
					<el-button @click="outerVisible = false">确 认</el-button>
					<!-- <el-button type="primary" @click="innerVisible = true"
              >打开内层 Dialog</el-button
            > -->
				</div>
			</el-dialog>
		</el-row>
		<el-table :data="tableData" style="width: 100%" max-height="450">
			<el-table-column fixed prop="deptNo" label="部门编号" width="120">
			</el-table-column>
			<el-table-column prop="deptName" label="部门名称" width="120">
			</el-table-column>
			<el-table-column prop="deptLeader" label="部门主任" width="120">
			</el-table-column>
			<el-table-column prop="deptNum" label="部门人数" width="150">
			</el-table-column>
			<el-table-column prop="deptRemark" label="备注" width="300">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="120">
			</el-table-column>
			<el-table-column prop="userId" label="管理员" width="120">
			</el-table-column>
			<el-table-column :data="deptForm" fixed="right" label="操作" width="60">
				<template slot-scope="scope">
					<el-button type="text"
						@click.native.prevent="displayDialog(scope.$index, tableData);dialogVisible = true">编辑
					</el-button>

					<el-dialog title="修改员工信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose"
						:append-to-body="true">
						<el-row>部门编号:<input v-model="deptForm.deptNo" prop="deptNo" placeholder="部门编号" readonly />
						</el-row>
						<el-row>部门名称:<input v-model="deptForm.deptName" prop="deptName" placeholder="部门名称" /></el-row>
						<el-row>部门主任:<input v-model="deptForm.deptLeader" prop="deptLeader" placeholder="部门主任" />
						</el-row>
						<el-row>部门人数:<input v-model="deptForm.deptNum" prop="deptNum" placeholder="部门人数" /></el-row>
						<el-row>备&nbsp;&nbsp;注&nbsp;&nbsp;&nbsp;&nbsp;:<input v-model="deptForm.deptRemark"
								prop="deptRemark" placeholder="备注" /></el-row>
						<el-row>状&nbsp;&nbsp;态&nbsp;&nbsp;&nbsp;&nbsp;:<input v-model="deptForm.status" prop="status"
								placeholder="状态" /></el-row>
						<el-row>管理员ID:<input v-model="deptForm.userId" prop="userId" placeholder="管理员ID" /></el-row>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="updata()">确 定</el-button>
						</span>
					</el-dialog>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="60">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-row>
			<el-button type="info" plain @click="toAddDept">添加部门</el-button>
		</el-row>
	</div>
</template>

<script>
	import _ from 'lodash'
	import {
		get,
		post
	} from '../../main-dev'
	import axios from 'axios'
	export default {
		data() {
			return {
				input: '',
				outerVisible: false,
				innerVisible: false,
				dialogVisible: false,
				state: '',
				tableData: [],
				deptForm: {
					deptLeader: '',
					deptName: '',
					deptNo: '',
					deptNum: '',
					deptRemark: '',
					status: '',
					userId: '',
				},
			}
		},
		created() {
			this.display()
		},
		methods: {
			displayDialog2() {
				let dept_No = this.input
				axios.get('/oa/Department/selectDepartmentByDeptNo/' + dept_No)
					.then(
						(result) => {
							// console.log(result.data);
							this.deptForm = result.data
						}
					)
			},
			toAddDept() {
				this.$router.push('/dept/AddDept')
			},
			createFilter(queryString) {
				return (restaurant) => {
					return (
						restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
						0
					)
				}
			},
			loadAll() {
				return []
			},
			handleSelect(item) {
				console.log(item)
			},
			handleIconClick(ev) {
				console.log(ev)
			},
			deleteRow(index, rows) {
				this.$confirm('确认要删除吗?', '提示', {
						type: 'warning'
					})
					//获取要删除的数据索引
					.then((data) => {
						let deptNo = this.tableData[index].deptNo
						axios.delete('/oa/Department/deleteDepartmentByDeptNo/' + deptNo)
						rows.splice(index, 1)
					})
			},
			async display() {
				// 发送请求
				let deptData = await get('/oa/Department/allDepartmentList')
				console.log(deptData.data)
				this.tableData = deptData.data
			},
			displayDialog(index) {
				let deptNo = this.tableData[index].deptNo
				axios.get('/oa/Department/selectDepartmentByDeptNo/' + deptNo)
				this.deptForm = this.tableData[index]
			},
			updata() {
				let data = {
					deptLeader: this.deptForm.deptLeader,
					deptName: this.deptForm.deptName,
					deptNo: this.deptForm.deptNo,
					deptNum: this.deptForm.deptNum,
					deptRemark: this.deptForm.deptRemark,
					status: this.deptForm.status,
					userId: this.deptForm.userId
				}
				axios.put('/oa/Department/updateDepartment', data)
				this.dialogVisible = false
				// if(res.data == success)
				this.$confirm('修改成功')
			},
		},
		mounted() {
			this.restaurants = this.loadAll()
		},
	}
</script>

<style lang="less" scoped>
	.my-autocomplete {
		li {
			line-height: normal;
			padding: 7px;

			.name {
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.addr {
				font-size: 12px;
				color: #b4b4b4;
			}

			.highlighted .addr {
				color: #ddd;
			}
		}
	}

	input {
		width: 78%;
		height: 35px;
		background-color: #E9EDF1;
		border-bottom-left-radius: 50px;
		border-top-left-radius: 50px;
		margin-top: 5px;
		margin-left: 2%;
		font-size: 16px;
		padding-left: 15px;
		border: 0px;
		color: black;
		padding-left: 15px;
	}
</style>
