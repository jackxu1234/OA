<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/leave/leavue' }"
        >请假管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>填写请假单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
		<el-alert title="添加公告" type="info" center show-icon :closable="false">
		</el-alert>
		<el-steps
		  :space="200"
		  :active="active"
		  finish-status="success"
		  align-center
		>
		  <el-step title="请假单编号"></el-step>
		  <el-step title="请假人姓名"></el-step>
		  <el-step title="请假时间"></el-step>
		  <el-step title="请假天数"></el-step>
		  <el-step title="请假原因"></el-step>
		  <el-step title="所属部门"></el-step>
		  <el-step title="负责人"></el-step>
		</el-steps>
      <el-form ref="form" :model="form" :rules="FormRules" label-width="100px">
        <el-form-item label="请假单编号" prop="leaveId">
          <el-input v-model="form.leaveId"></el-input>
        </el-form-item>

        <el-form-item label="请假人姓名" prop="leaveEmpName">
          <el-input v-model="form.leaveEmpName"></el-input>
        </el-form-item>

        <el-form-item label="请假时间" prop="leaveTime">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.leaveTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="请假天数" prop="leaveDays">
          <el-input v-model="form.leaveDays" @change="next"></el-input>
        </el-form-item>

        <el-form-item label="请假原因" prop="leaveCause">
          <el-input type="textarea" v-model="form.leaveCause"></el-input>
        </el-form-item>
		
        <el-form-item label="所属部门" prop="leaveDeptName">
          <el-input v-model="form.leaveDeptName"></el-input>
        </el-form-item>
		
        <el-form-item label="负责人" prop="userId">
			<el-input v-model="form.userId" placeholder="负责人编号(格式如1001)"></el-input>
        </el-form-item>
	
        <el-form-item>
          <el-button type="primary" @click="addLeave">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import _ from 'lodash'
import {post_json} from '../../main-dev'
export default {
  data() {
    return {
		active : 0,
      form: {
        leaveCause: '',
        leaveDays: '',
        leaveDeptName: '',
        leaveEmpName: '',
        leaveId: '',
        leaveTime: '',
        userId: '',
      },
      FormRules: {
        leaveCause: [
          { required: true, message: '请输入请假原因', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 20 个字符', trigger: 'blur' },
        ],
        leaveDays: [
          { required: true, message: '请输入请假天数', trigger: 'blur' },
          { min: 0, max: 3, message: '长度在 0 到 3 个字符', trigger: 'blur' },
        ],
        leaveDeptName: [
          { required: true, message: '请输入所属部门', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
        ],
        leaveEmpName: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
        ],
        leaveId: [
          { required: true, message: '请输入请假编号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
        ],
        leaveTime: [
          { required: true, message: '请输入请假时间', trigger: 'blur' },
        ],
        userId: [
          { required: true, message: '请输入管理员编号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    async addLeave() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项!')
        }
        let data = {
          leaveCause: this.form.leaveCause,
          leaveDays: this.form.leaveDays,
          leaveDeptName: this.form.leaveDeptName,
          leaveEmpName: this.form.leaveEmpName,
          leaveId: this.form.leaveId,
		  leaveState: '未审批',
          leaveTime: this.form.leaveTime,
          userId: this.form.userId,
        }
        let res =await post_json('/oa/LeaveOfAbsence/insertLeaveOfAbsence', data)
        console.log(data);
        if (res.status !== 200) {
          return this.$message.error('添加失败！')
        }
        this.$message.success('添加成功！')
      })
    },
     resetForm() {
      console.log(this);
        this.$refs['form'].resetFields()
      },
	  next(){
		  if (this.active++ > 2) this.active = 0;
	  }
  }
}
</script>

<style lang="less" scoped>
</style>