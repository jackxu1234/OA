<template>
<div class="container">
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>请假管理</el-breadcrumb-item>
      <el-breadcrumb-item>请假单审批</el-breadcrumb-item>
    </el-breadcrumb>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    max-height="450"
    @selection-change="handleSelectionChange">
    <el-table-column
      prop="leaveId"
      label="请假条编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="leaveEmpName"
      label="请假人姓名"
      width="100">
    </el-table-column>
    <el-table-column
    prop="leaveTime"
      label="请假申请日期"
      width="120">
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
      prop="leaveDeptName"
      label="所属部门"
      width="120">
    </el-table-column>
    <el-table-column
      prop="leaveCause"
      label="请假原因"
      width="120">
    </el-table-column>
    <el-table-column
      prop="leaveDays"
      label="请假天数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="userId"
      label="审批人编号"
      width="120">
    </el-table-column>
	<el-table-column
	  label="审批结果"
	  width="120">
	  <template slot-scope="scope">
	          <el-tag type="warning" effect="plain">{{scope.row.leaveState}}</el-tag>
	        </template>
	</el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
        <!-- <template slot-scope="scope">
          <el-button
            @click.native.prevent="solveLeave(scope.$index, tableData)"
            type="text"
            size="small"
          >
            审批
          </el-button>
        </template> -->
    <!-- </el-table-column> -->
	<!-- <el-table-column :data="empForm" fixed="right" label="操作" width="120"> -->
		<template slot-scope="scope">
			<el-button type="text" @click.native.prevent="
	  solveLeave(scope.$index, tableData)
	  dialogVisible = true
	">编辑</el-button>
		</template>
	</el-table-column>
  </el-table>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->
</div>
</template>


<script>
import {get} from '../../main-dev'
import axios from 'axios'
    export default {
    data() {
      return {
        tableData: [],
        multipleSelection: []
      }
    },
    created() {
      this.getLeaveData()
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      async getLeaveData(){
      let leaveData = await get('/oa/LeaveOfAbsence/allLeaveOfAbsenceList')
      // 2.对请求成功返回的数据进行筛选 对data中的对应的变量进行赋值
      this.tableData = leaveData.data
      console.log(this.tableData);
    },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    solveLeave(index, rows){
      this.$confirm('确认同意审批吗?', '提示', 
	  { distinguishCancelAndClose: true,
		confirmButtonText: '确定',
        cancelButtonText: '取消',
		type: 'warning' ,
		})
        .then((data) => {
			if(data == 'confirm'){
				this.tableData[index].leaveState = "同意审批"
				let leaveData = this.tableData[index];
				axios.put('/oa/LeaveOfAbsence/updateLeaveOfAbsence',leaveData)
				// console.log(this.tableData[index])
			}
			
		}).catch(() => {
			this.tableData[index].leaveState = "未通过审批"
			let leaveData = this.tableData[index];
			axios.put('/oa/LeaveOfAbsence/updateLeaveOfAbsence',leaveData)
			// console.log(this.tableData[index])
		})
    }
    }
  }
</script>

<style lang="less" scoped>
</style>