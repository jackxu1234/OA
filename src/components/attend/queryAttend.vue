<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>考勤管理</el-breadcrumb-item>
      <el-breadcrumb-item>考勤查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :data="atedForm">
      <el-input
        placeholder="请输入员工编号"
        v-model="input"
        style="width: 500px"
        clearable>
      </el-input>
        <el-button type="info" @click="displayDialog2();outerVisible = true"
          >查询</el-button
        >
        <el-dialog title="员工信息" :visible.sync="outerVisible">
          <el-row>员工编号:<input
              v-model="atedForm.empNo"
              prop="empNo"
              placeholder="员工编号"
              readonly
            /></el-row>
            <el-row>员工姓名:<input
              v-model="atedForm.attendEmpName"
              prop="attendEmpName"
              placeholder="员工姓名"
            /></el-row>
            <el-row>考勤编号:<input
              v-model="atedForm.attendEmpNo"
              prop="attendEmpNo"
              placeholder="考勤编号"
            /></el-row>
            <el-row>签到时间:<input
              v-model="atedForm.checkInTime"
              prop="checkInTime"
              placeholder="签到时间"
            /></el-row>
            <el-row>签退时间:<input
              v-model="atedForm.checkOutTime"
              prop="checkOutTime"
              placeholder="签退时间"
            /></el-row>
            <el-row>负责人ID:<input
              v-model="atedForm.userId"
              prop="userId"
              placeholder="负责人ID"
            /></el-row>
          <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">取 消</el-button>
            <el-button @click="outerVisible = false">确 认</el-button>
            <!-- <el-button type="primary" @click="innerVisible = true"
              >打开内层 Dialog</el-button
            > -->
          </div>
        </el-dialog>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="attendEmpNo" label="考勤编号" width="150">
      </el-table-column>
      <el-table-column prop="empNo" label="员工编号" width="150">
      </el-table-column>
      <el-table-column prop="attendEmpName" label="考勤员工姓名" width="150">
      </el-table-column>
      <el-table-column prop="checkInTime" label="签到时间" width="150">
      </el-table-column>
      <el-table-column prop="checkOutTime" label="签退时间" width="150">
      </el-table-column>
      <el-table-column prop="userId" label="审批人编号" width="150">
      </el-table-column>
      <el-table-column fixed="right" :data="atedForm" label="操作" width="150">
        <template slot-scope="scope">
          <!-- <el-button
            @click.native.prevent="deleteAted(scope.$index, tableData)"
            type="text"
            size="small"
          >
            审批删除
          </el-button> -->
          <!-- <el-button
            type="text"
            @click.native.prevent="
              displayDialog(scope.$index, tableData)
              dialogVisible = true
            "
            >编辑</el-button
          > -->
          <!-- <el-dialog
            title="修改考勤信息"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
            :append-to-body="true"
          >
            <el-row>员工编号:<input
              v-model="atedForm.empNo"
              prop="empNo"
              placeholder="员工编号"
              readonly
            /></el-row>
            <el-row>员工姓名:<input
              v-model="atedForm.attendEmpName"
              prop="attendEmpName"
              placeholder="员工姓名"
            /></el-row>
            <el-row>考勤编号:<input
              v-model="atedForm.attendEmpNo"
              prop="attendEmpNo"
              placeholder="考勤编号"
            /></el-row>
            <el-row>签到时间:<input
              v-model="atedForm.checkInTime"
              prop="checkInTime"
              placeholder="签到时间"
            /></el-row>
            <el-row>签退时间:<input
              v-model="atedForm.checkOutTime"
              prop="checkOutTime"
              placeholder="签退时间"
            /></el-row>
            <el-row>负责人ID:<input
              v-model="atedForm.userId"
              prop="userId"
              placeholder="负责人ID"
            /></el-row>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updata()">确 定</el-button>
            </span>
          </el-dialog> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-row>
      <el-button type="info" plain @click="toAdd">添加员工</el-button>
    </el-row> -->
  </div>
</template>


<script>
import { get } from '../../main-dev'
import axios from 'axios'
export default {
  data() {
    return {
      input: '',
      outerVisible: false,
      innerVisible: false,
      dialogVisible: false,
      tableData: [],
      multipleSelection: [],
      atedForm: {
        empNo: '',
        attendEmpName: '',
        attendEmpNo: '',
        checkInTime: '',
        checkOutTime: '',
        userId: '',
      },
    }
  },
  created() {
    this.getAtedData()
  },
  methods: {
    displayDialog2() {
      let attend_EmpNo = this.input
      axios.get('/oa/Attendance/selectAttendanceByAttendEmpNo/' + attend_EmpNo)
      .then(
      (result) => {
        // console.log(result.data);
        this.atedForm = result.data
        }
    )
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    async getAtedData() {
      let AtedData = await get('/oa/Attendance/allAttendanceList')
      this.tableData = AtedData.data
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteAted(index, rows) {
      this.$confirm('确认要删除吗?', '提示', { type: 'warning' })
        //获取要删除的数据索引
        .then((data) => {
          let attendEmpNo = this.tableData[index].attendEmpNo
          axios.delete(
            '/oa/Attendance/deleteAttendanceByAttendEmpNo/' + attendEmpNo
          )
          rows.splice(index, 1)
        })
    },
    toAdd() {
      this.$router.push('/ated/AddAted')
    },
    displayDialog(index) {
      let attendEmpNo = this.tableData[index].attendEmpNo
      axios.get('/oa/Attendance/selectAttendanceByAttendEmpNo/' + attendEmpNo)
      this.atedForm = this.tableData[index]
    },
    updata() {
      let data = {
        empNo: this.atedForm.empNo,
        attendEmpName: this.atedForm.attendEmpName,
        attendEmpNo: this.atedForm.attendEmpNo,
        checkInTime: this.atedForm.checkInTime,
        checkOutTime: this.atedForm.checkOutTime,
        userId: this.atedForm.userId,
      }
      axios.put('/oa/Attendance/updateAttendance', data)
      this.dialogVisible = false
      // if(res.data == success)
      this.$confirm('修改成功')
    },
  },
}
</script>

<style lang="less" scoped>
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