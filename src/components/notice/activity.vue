<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加公告</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert title="添加公告" type="info" center show-icon :closable="false">
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
        <el-step title="管理员"></el-step>
      </el-steps>

      <el-form ref="form" :model="form" :rules="FormRules" label-width="100px">
        <el-form-item label="公告编号" prop="noticeId">
          <el-input v-model="form.noticeId"></el-input>
        </el-form-item>
        <el-form-item label="具体内容" prop="noticeContent">
          <el-input v-model="form.noticeContent"></el-input>
        </el-form-item>
        <el-form-item label="发布人" prop="noticePublisher">
          <el-input v-model="form.noticePublisher"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="noticeTime">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.noticeTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="主题" prop="noticeTopic">
          <el-input v-model="form.noticeTopic"></el-input>
        </el-form-item>
        <el-form-item label="管理者ID" prop="userId">
          <el-input v-model="form.userId" placeholder="对应用户ID,如1001"></el-input>
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
        noticeContent: '',
        noticeId: '',
        noticePublisher: '',
        noticeTime: '',
        noticeTopic: '',
        userId: '',
      },
      FormRules: {
        noticeContent: [
          { required: true, message: '请输入具体内容', trigger: 'blur' },
          {
            min: 0,
            max: 50,
            message: '长度在 0 到 50 个字符',
            trigger: 'blur',
          },
        ],
        noticeId: [
          { required: true, message: '请输入公告ID编号', trigger: 'blur' },
          {
            min: 0,
            max: 10,
            message: '长度在 0 到 10 个字符',
            trigger: 'blur',
          },
        ],
        noticePublisher: [
          { required: true, message: '请输入发布人姓名', trigger: 'blur' },
          {
            min: 0,
            max: 10,
            message: '长度在 0 到 10 个字符',
            trigger: 'blur',
          },
        ],
        noticeTime: [
          { required: true, message: '请输入发布时间', trigger: 'blur' },
        ],
        noticeTopic: [
          { required: true, message: '请输入公告主题', trigger: 'blur' },
          {
            min: 0,
            max: 20,
            message: '长度在 0 到 20 个字符',
            trigger: 'blur',
          },
        ],
        userId: [
          { required: true, message: '请输入管理员ID', trigger: 'blur' },
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
          noticeContent: this.form.noticeContent,
          noticeId: this.form.noticeId,
          noticePublisher: this.form.noticePublisher,
          noticeTime: this.form.noticeTime,
          noticeTopic: this.form.noticeTopic,
          userId: this.form.userId,
        }
        const { data: res } = await this.$http.post(
          '/oa/Notice/insertNotice',
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