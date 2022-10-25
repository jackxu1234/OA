<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加部门</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert title="添加部门" type="info" center show-icon :closable="false">
      </el-alert>
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="部门编号"></el-step>
        <el-step title="部门名称"></el-step>
        <el-step title="部门主任"></el-step>
        <el-step title="部门人数"></el-step>
        <el-step title="状态"></el-step>
        <el-step title="备注"></el-step>
        <el-step title="管理员"></el-step>
      </el-steps>

      <el-form ref="form" :model="form" :rules="FormRules" label-width="100px">
        <el-form-item label="部门编号" prop="deptNo">
          <el-input v-model="form.deptNo"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="form.deptName"></el-input>
        </el-form-item>
        <el-form-item label="部门主任" prop="deptLeader">
          <el-input v-model="form.deptLeader"></el-input>
        </el-form-item>
        <el-form-item label="部门人数" prop="deptNum">
          <el-input v-model="form.deptNum"></el-input>
        </el-form-item>
		 <el-form-item label="状态" prop="status">
		    <el-radio-group v-model="form.status">
		      <el-radio label="运行"></el-radio>
		      <el-radio label="待机"></el-radio>
			  <el-radio label="休假"></el-radio>
		    </el-radio-group>
		  </el-form-item>
        <el-form-item label="备注" prop="deptRemark">
          <el-input v-model="form.deptRemark"></el-input>
        </el-form-item>
        <el-form-item label="管理员" prop="userId">
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
        deptLeader: '',
        deptName: '',
        deptNo: '',
        deptNum: '',
        deptRemark: '',
        status: '',
        userId: '',
      },
      FormRules: {    
        deptName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
        ],
        deptLeader: [
          { required: true, message: '请输入主任编号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
        ],
        deptNo: [
          { required: true, message: '请输入部门编号', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
        ],
        deptNum: [
          { required: true, message: '请输入部门人数', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
        ],
        deptRemark: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 20 个字符', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请输入状态', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 20 个字符', trigger: 'blur' },
        ],
        userId: [
          { required: true, message: '请输入管理员ID', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' },
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
            deptLeader:this.form.deptLeader,
            deptName:this.form.deptName,
            deptNo:this.form.deptNo,
            deptNum:this.form.deptNum,
            deptRemark:this.form.deptRemark,
            status:this.form.status,
            userId:this.form.userId
        }
        const { data: res } = await this.$http.post(
          '/oa/Department/insertDepartment',
          data
        )
        console.log(data)
        if (res !== 'success') {
          return this.$message.error('添加失败！')
        }
        this.$message.success('添加成功！')
      })
    },
    resetform() {
      this.$refs['form'].resetFields()
    },
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