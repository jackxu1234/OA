<template>
	<div>
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>员工管理</el-breadcrumb-item>
			<el-breadcrumb-item>添加员工</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片视图区域 -->
		<el-card>
			<!-- 提示区域 -->
			<el-alert title="添加员工" type="info" center show-icon :closable="false">
			</el-alert>
			<el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
				<el-step title="员工编号"></el-step>
				<el-step title="员工姓名"></el-step>
				<el-step title="性别"></el-step>
				<el-step title="联系电话"></el-step>
				<el-step title="居住地址"></el-step>
				<el-step title="完成"></el-step>
			</el-steps>

			<el-form ref="form" :model="form" :rules="FormRules" label-width="100px">
				<el-form-item label="员工编号" prop="empNo">
					<el-input v-model="form.empNo"></el-input>
				</el-form-item>
				<el-form-item label="部门编号" prop="deptNo">
					<el-input v-model="form.deptNo"></el-input>
					
				</el-form-item>
				<el-form-item label="员工姓名" prop="empName">
					<el-input v-model="form.empName"></el-input>
				</el-form-item>
				<el-form-item label="员工性别" prop="gender">
					<el-input v-model="form.gender"></el-input>
				</el-form-item>
				<el-form-item label="出生日期" prop="birth">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%">
						</el-date-picker>
					</el-col>
				</el-form-item>
				
				<el-form-item label="联系电话" prop="phoneNumber">
					<el-input v-model="form.phoneNumber"></el-input>
				</el-form-item>

				<el-form-item label="居住地址" prop="address">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
				<el-form-item label="所属部门" prop="empDept">
					<el-input v-model="form.empDept"></el-input>
				</el-form-item>
				<el-form-item label="负责人" prop="userId">
					<el-input v-model="form.userId"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add">立即添加</el-button>
					<el-button @click="resetform">取消</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import _ from 'lodash'
	export default {
		data() {
			return {
				form: {
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
				FormRules: {
					address: [{
							required: true,
							message: '请输入居住地址',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 10,
							message: '长度在 0 到 10 个字符',
							trigger: 'blur'
						},
					],
					birth: [{
						required: true,
						message: '请选择出生年月',
						trigger: 'blur'
					}, ],
					deptNo: [{
							required: true,
							message: '请输入部门编号',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 10,
							message: '长度在 0 到 10 个字符',
							trigger: 'blur'
						},
					],
					empDept: [{
							required: true,
							message: '请输入员工所属部门',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 10,
							message: '长度在 0 到 10 个字符',
							trigger: 'blur'
						},
					],
					empName: [{
							required: true,
							message: '请输入员工姓名',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 10,
							message: '长度在 0 到 10 个字符',
							trigger: 'blur'
						},
					],
					empNo: [{
							required: true,
							message: '请输入员工编号',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 10,
							message: '长度在 0 到 10 个字符',
							trigger: 'blur'
						},
					],
					gender: [{
						required: true,
						message: '请输入员工性别',
						trigger: 'blur'
					}, ],
					phoneNumber: [{
						required: true,
						message: '请输入联系电话',
						trigger: 'blur'
					}, ],
					userId: [{
							required: true,
							message: '请输入管理员ID',
							trigger: 'blur'
						},
						{
							min: 0,
							max: 10,
							message: '长度在 0 到 10 个字符',
							trigger: 'blur'
						},
					],
				},
			}
		},
		created() {},
		methods: {
			onSubmit() {
				console.log('submit!')
			},
			add() {
				this.$refs.form.validate(async (valid) => {
					if (!valid) {
						return this.$message.error('请填写必要的表单项!')
					}
					let data = {
						address: this.form.address,
						birth: this.form.birth,
						deptNo: this.form.deptNo,
						empDept: this.form.empDept,
						empName: this.form.empName,
						empNo: this.form.empNo,
						gender: this.form.gender,
						phoneNumber: this.form.phoneNumber,
						userId: this.form.userId,
					}
					const {
						data: res
					} = await this.$http.post(
						'/oa/Employee/insertEmployee',
						data
					)
					// console.log(data);
					if (res !== 'success') {
						return this.$message.error('添加失败！')
					}
					this.$message.success('添加成功！')
					this.$router.push('/emp/queryEmp')
				})
			},
			resetform() {
				this.$refs['form'].resetFields()
			}
		},
	}
</script>

<style lang="less" scoped>
	.el-checkbox {
		margin: 0 10px 0 0 !important;
	}

	.previewImg {
		width: 100%;
	}

	.btnAdd {
		margin-top: 15px;
	}
</style>
