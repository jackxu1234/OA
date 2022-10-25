<template>
	<div class="container">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>员工管理</el-breadcrumb-item>
			<el-breadcrumb-item>信息展示</el-breadcrumb-item>
		</el-breadcrumb>
		<el-row :data="empForm">
			<el-input placeholder="请输入员工编号" v-model="input" style="width: 500px" clearable>
			</el-input>
			<el-button type="info" @click="displayDialog2();outerVisible = true">查询</el-button>
			
			<el-dialog title="员工信息" :visible.sync="outerVisible">
				<el-row>
					员工编号：<input v-model="empForm.empNo" prop="empNo" placeholder="员工编号" readonly /></el-row>
				<el-row>
					员工姓名：<input v-model="empForm.empName" prop="empName" placeholder="员工姓名" /></el-row>
				<el-row>
					&nbsp;&nbsp;性&nbsp;&nbsp;别&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;<input v-model="empForm.gender"
						prop="gender" placeholder="性别" /></el-row>
				出生日期：<input v-model="empForm.birth" prop="birth" placeholder="出生日期" />
				<el-row>
					居住地址：<input v-model="empForm.address" prop="address" placeholder="居住地址" />
				</el-row>
				<el-row>所属部门：<input v-model="empForm.empDept" prop="empDept" placeholder="所属部门" /></el-row>
				<el-row>联系方式:&nbsp;&nbsp; <input v-model="empForm.phoneNumber" prop="phoneNumber" placeholder="联系方式" />
				</el-row>
				<el-row>负责人编号:<input v-model="empForm.userId" prop="userId" placeholder="负责人编号" /></el-row>
				<el-row>部门编号:&nbsp;&nbsp;&nbsp;<input v-model="empForm.deptNo" prop="deptNo" placeholder="部门编号" />
				</el-row>
				<!-- <el-dialog
            width="30%"
            title="内层 Dialog"
            :visible.sync="innerVisible"
            append-to-body
          >
          </el-dialog> -->
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
			<el-table-column fixed prop="empNo" label="员工编号" width="120" v-model="tableData.empNo">
			</el-table-column>
			<el-table-column prop="empName" label="员工姓名" width="150" v-model="tableData.empName">
			</el-table-column>
			<el-table-column prop="gender" label="性别" width="120" v-model="tableData.gender">
			</el-table-column>
			<el-table-column prop="birth" label="出生日期" width="150" v-model="tableData.birth">
			</el-table-column>
			<el-table-column prop="address" label="居住地址" width="300" v-model="tableData.address">
			</el-table-column>
			<el-table-column prop="empDept" label="所属部门" width="120" v-model="tableData.empDept">
			</el-table-column>
			<el-table-column prop="phoneNumber" label="联系方式" width="120" v-model="tableData.phoneNumber">
			</el-table-column>
			<el-table-column prop="userId" label="负责人" width="120" v-model="tableData.userId">
			</el-table-column>
			<el-table-column prop="deptNo" label="部门编号" width="120" v-model="tableData.deptNo">
			</el-table-column>
			<el-table-column :data="empForm" fixed="right" label="操作" width="120">
				<template slot-scope="scope">
					<el-button type="text" @click.native.prevent="
              displayDialog(scope.$index, tableData)
              dialogVisible = true
            ">编辑</el-button>

					<el-dialog title="修改员工信息" :visible.sync="dialogVisible" width="50%" :before-close="handleClose"
						:append-to-body="true">
						<el-row>
							员工编号：<input v-model="empForm.empNo" prop="empNo" placeholder="员工编号" readonly /></el-row>
						<el-row>
							员工姓名：<input v-model="empForm.empName" prop="empName" placeholder="员工姓名" /></el-row>
						<el-row>
							&nbsp;&nbsp;性&nbsp;&nbsp;别&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;<input v-model="empForm.gender"
								prop="gender" placeholder="性别" /></el-row>
						出生日期：<input v-model="empForm.birth" prop="birth" placeholder="出生日期" />
						<el-row>
							居住地址：<input v-model="empForm.address" prop="address" placeholder="居住地址" />
						</el-row>
						<el-row>所属部门：<input v-model="empForm.empDept" prop="empDept" placeholder="所属部门" /></el-row>
						<el-row>联系方式:&nbsp;&nbsp; <input v-model="empForm.phoneNumber" prop="phoneNumber"
								placeholder="联系方式" /></el-row>
						<el-row>负责人编号:<input v-model="empForm.userId" prop="userId" placeholder="负责人编号" /></el-row>
						<el-row>部门编号:&nbsp;&nbsp;&nbsp;<input v-model="empForm.deptNo" prop="deptNo"
								placeholder="部门编号" /></el-row>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="updata()">确 定</el-button>
						</span>
					</el-dialog>
				</template>
			</el-table-column>
		</el-table>
		<el-row>
			<el-button type="info" plain @click="toAddEmp">添加员工</el-button>
		</el-row>
	</div>
</template>

<script>
	import {
		get
	} from '../../main-dev'
	import axios from 'axios'
	import _ from 'lodash'
	export default {
		data() {
			return {
				input: '',
				outerVisible: false,
				innerVisible: false,
				dialogVisible: false,
				tableData: [],
				empForm: {
					address: '',
					birth: '',
					deptNo: '',
					empDept: '',
					empName: '',
					empNo: '',
					gender: '',
					phoneNumber: '',
					userId: '',
				},
				//查询列表的参数对象
				queryInfo: {
					query: '',
					pagenum: 1,
					pagesize: 10,
				},
				queryEmp: [],
				total: 0, //总数据条数
			}
		},
		created() {
			this.display()
		},
		methods: {
			// goAddpage() {
			//   //路由导航对象，调用push()函数跳转到对应的路由页面
			//   this.$router.push('/emp/addEmp')
			// },
			operation() {},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then((_) => {
						done()
					})
					.catch((_) => {})
			},
			async display() {
				// 发送请求
				let empData = await get('/oa/Employee/allEmployeeList')
				// console.log(empData.data)
				this.tableData = empData.data
				// console.log(this.tableData);
			},
			toAddEmp() {
				this.$router.push('/emp/addEmp')
			},
			// editEmp(emp_No) {
			//   this.$router.push({
			//     name: 'edit',
			//     query: { emp_No },
			//   })
			// },
			displayDialog(index) {
				let empNo = this.tableData[index].empNo
				axios.get('/oa/Employee/selectEmployeeByEmpNo/' + empNo)
				// console.log(this.tableData[index].empNo);
				this.empForm = this.tableData[index]
				// console.log(this.empForm);
			},
			updata() {
				// let empNo = this.empForm.empNo
				let data = {
					address: this.empForm.address,
					birth: this.empForm.birth,
					deptNo: this.empForm.deptNo,
					empDept: this.empForm.empDept,
					empName: this.empForm.empName,
					empNo: this.empForm.empNo,
					gender: this.empForm.gender,
					phoneNumber: this.empForm.phoneNumber,
					userId: this.empForm.userId,
				}
				axios.put('/oa/Employee/updateEmployee', data)
				this.dialogVisible = false
				// if(res.data == success)
				this.$confirm('修改成功')
			},
			displayDialog2() {
				let emp_No = this.input
				axios.get('/oa/Employee/selectEmployeeByEmpNo/' + emp_No)
					.then(
						(result) => {
							// console.log(result.data);
							this.empForm = result.data
						}
					)
			},
		},
	}
</script>

<style lang="less" scoped>
	el-row input {
		width: 50;
		height: 30;
	}

	input {
		width: 78%;
		height: 35px;
		background-color: #e9edf1;
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
