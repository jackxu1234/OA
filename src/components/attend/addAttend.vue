<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/leave/leavue' }"
        >考勤管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>发布考勤</el-breadcrumb-item>
    </el-breadcrumb>
	<el-button type="success" icon="el-icon-suitcase-1" @click="dialogVisible1 = true">签到</el-button>
	<el-divider><i class="el-icon-star-off">上班签到签退</i></el-divider>
	<el-button type="primary" icon="el-icon-suitcase" @click="dialogVisible2 = true">签退</el-button>
	<el-dialog
	  title="考勤签到信息填写"
	  :visible.sync="dialogVisible1"
	  width="80%"
	  >
	  <el-card>
	    <el-form ref="form" :model="form" :rules="FormRules" label-width="100px">
	      <!-- <el-form-item label="考勤编号" prop="attendEmpNo">
	        <el-input v-model="form.attendEmpNo"></el-input>
	      </el-form-item> -->
	      <el-form-item label="员工编号" prop="empNo">
	        <el-input v-model="form.empNo"></el-input>
	      </el-form-item>
	      <el-form-item label="负责人标号" prop="userId">
	        <el-input v-model="form.userId"></el-input>
	      </el-form-item>
	  
	      <el-form-item label="员工姓名" prop="attendEmpName">
	        <el-input v-model="form.attendEmpName"></el-input>
	      </el-form-item>
	  
	      <el-form-item label="签到时间" prop="checkInTime">
	        <el-col :span="11">
	          <el-date-picker
	            type="datetime"
	            placeholder="选择日期"
	            v-model="form.checkInTime"
	            style="width: 100%"
	          ></el-date-picker>
	       </el-col>
	      </el-form-item>
	      <!-- <el-form-item label="考勤结束时间" prop="checkOutTime">
	        <el-col :span="11">
	          <el-date-picker
	            type="datetime"
	            placeholder="选择日期"
	            v-model="form.checkOutTime"
	            style="width: 100%"
	          ></el-date-picker>
	        </el-col>
	      </el-form-item> -->
	  
	      <el-form-item>
	        <el-button type="primary" @click="addLeave">签到</el-button>
	        <el-button @click="resetForm">重置</el-button>
	      </el-form-item>
	    </el-form>
	  </el-card>
	</el-dialog>
    <!-- 考勤签退 -->
	<el-dialog
	  title="考勤签退"
	  :visible.sync="dialogVisible2"
	  width="80%"
	  >
	  <el-card>
	    <el-form ref="form" :model="form" :rules="FormRules" label-width="100px">
	      <!-- <el-form-item label="考勤编号" prop="attendEmpNo">
	        <el-input v-model="form.attendEmpNo"></el-input>
	      </el-form-item> -->
	      <el-form-item label="员工编号" prop="empNo">
	        <el-input v-model="form.empNo"></el-input>
	      </el-form-item>
	      <el-form-item label="负责人标号" prop="userId">
	        <el-input v-model="form.userId"></el-input>
	      </el-form-item>
	  
	      <el-form-item label="员工姓名" prop="attendEmpName">
	        <el-input v-model="form.attendEmpName"></el-input>
	      </el-form-item>
	  
	      <el-form-item label="签退时间" prop="checkOutTime">
	        <el-col :span="11">
	          <el-date-picker
	            type="datetime"
	            placeholder="选择日期"
	            v-model="form.checkOutTime"
	            style="width: 100%"
	          ></el-date-picker>
	        </el-col>
	      </el-form-item>
	  
	      <el-form-item>
	        <el-button type="primary" @click="addLeave1">完成签退</el-button>
			<el-button @click="resetForm">重置</el-button>
	      </el-form-item>
	    </el-form>
	  </el-card>
	</el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { post_json } from '../../main-dev'
	import axios from 'axios'
export default {
  data() {
    return {
		dialogVisible1: false,
		dialogVisible2: false,
      form: {
        empNo: '',
        attendEmpName: '',
        attendEmpNo: '',
        checkInTime: '',
        checkOutTime: '',
        userId: '',
      },
      FormRules: {
        empNo: [
          { required: true, message: '请输入员工编号', trigger: 'blur' },
          {
            min: 0,
            max: 10,
            message: '长度在 0 到 10 个字符',
            trigger: 'blur',
          },
        ],
        attendEmpName: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
        ],
        // attendEmpNo: [
        //   { required: true, message: '请输入考勤编号', trigger: 'blur' },
        //   {
        //     min: 0,
        //     max: 10,
        //     message: '长度在 0 到 10 个字符',
        //     trigger: 'blur',
        //   },
        // ],
        checkInTime: [
          { required: true, message: '请输入签到时间', trigger: 'blur' },
        ],
        checkOutTime: [
          { required: true, message: '请输入签退时间', trigger: 'blur' },
        ],
        userId: [
          { required: true, message: '请输入管理者编号', trigger: 'blur' },
          {
            min: 0,
            max: 10,
            message: '长度在 0 到 10 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
	  
    onSubmit() {
      console.log('submit!')
    },
	// 考勤签到
    async addLeave() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项!')
        }
        let data = {
          empNo: this.form.empNo,
          attendEmpName: this.form.attendEmpName,
          attendEmpNo: this.form.attendEmpNo,
          checkInTime: this.form.checkInTime,
          // checkOutTime: this.form.checkOutTime,
          userId: this.form.userId,
        }

        let res = await post_json('/oa/Attendance/insertAttendance', data)
        console.log(data)
        if (res.status !== 200) {
          return this.$message.error('操作失败！')
        }
        this.$message.success('操作成功！')
      })
    },
	//考勤签退
	async addLeave1() {
	  this.$refs.form.validate(async (valid) => {
	    if (!valid) {
	      return this.$message.error('请填写必要的表单项!')
	    }
	    let data = {
	      empNo: this.form.empNo,
	      attendEmpName: this.form.attendEmpName,
	      attendEmpNo: this.form.attendEmpNo,
	      // checkInTime: this.form.checkInTime,
	      checkOutTime: this.form.checkOutTime,
	      userId: this.form.userId,
	    }
	
	    let res = await post_json('/oa/Attendance/insertAttendance', data)
	    console.log(data)
	    if (res.status !== 200) {
	      return this.$message.error('操作失败！')
	    }
	    this.$message.success('操作成功！')
	  })
	},
	deleteLeave(){
		this.$confirm('确认要删除吗?', '提示', {
				type: 'warning'
			})
			//获取要删除的数据索引
			.then((data) => {
				let attendEmpNo = this.form.attendEmpNo
				
				 axios.delete('/oa/Attendance/deleteAttendanceByAttendEmpNo/{attendEmpNo}' + attendEmpNo)
				console.log(this.form.attendEmpNo);
				 rows.splice(index, 1)
				 this.$confirm('删除成功')
			})
	},
    resetForm() {
      console.log(this)
      this.$refs['form'].resetFields()
    },
  },
}
</script>

<style lang="less" scoped>
</style>