<template>
	<div class="contener">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>员工管理</el-breadcrumb-item>
			<el-breadcrumb-item>删除员工</el-breadcrumb-item>
		</el-breadcrumb>
		<el-table :data="tableData" style="width: 100%" max-height="450">
			<el-table-column fixed prop="empNo" label="员工编号" width="120" v-model="tableData.empNo">
			</el-table-column>
			<el-table-column prop="empName" label="员工姓名" width="120" v-model="tableData.empName">
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
			<el-table-column fixed="right" label="操作" width="120">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
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
				state: '',
				tableData: [],
				emp: {
					address: '',
					birth: '',
					deptNo: '',
					empDept: '',
					empName: '',
					empNo: '',
					gender: '',
					phoneNumber: '',
					userId: '',
				}
			}
		},
		created() {
			this.display()
		},
		methods: {
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
						let empNo = this.tableData[index].empNo
						axios.delete('/oa/Employee/deleteEmployeeByEmpNo/' + empNo)
						// console.log(this.tableData[index].empNo);
						rows.splice(index, 1)
						this.$confirm('删除成功')
					})
			},
			async display() {
				// 发送请求
				let empData = await get('/oa/Employee/allEmployeeList')
				console.log(empData.data)
				this.tableData = empData.data
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
</style>
