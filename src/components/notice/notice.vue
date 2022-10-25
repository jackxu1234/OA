<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      <el-breadcrumb-item>公告设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :data="noticeForm">
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
          <el-row>公告号&nbsp;&nbsp;&nbsp;:&nbsp;<input
                v-model="noticeForm.noticeId"
                prop="noticeId"
                placeholder="公告号"
                readonly
              /></el-row>
              <el-row>发布人&nbsp;&nbsp;&nbsp;:&nbsp;<input
                v-model="noticeForm.noticePublisher"
                prop="noticePublisher"
                placeholder="发布人"
              /></el-row>
              <el-row>公告详情:<input
                v-model="noticeForm.noticeContent"
                prop="noticeContent"
                placeholder="公告详情"
              /></el-row>
              <el-row>发布时间:<input
                v-model="noticeForm.noticeTime"
                prop="noticeTime"
                placeholder="发布时间"
              /></el-row>
              <el-row>主&nbsp;&nbsp;题&nbsp;&nbsp;&nbsp;&nbsp;:<input
                v-model="noticeForm.noticeTopic"
                prop="noticeTopic"
                placeholder="主题"
              /></el-row>
              <el-row>管理者ID:<input
                v-model="noticeForm.userId"
                prop="userId"
                placeholder="管理者ID"
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
    <el-table :data="tableData" style="width: 100%" max-height="450">
      <el-table-column fixed prop="noticeId" label="编号" width="150">
      </el-table-column>
      <el-table-column prop="noticeTopic" label="主题" width="200">
      </el-table-column>
      <el-table-column prop="noticeContent" label="具体内容" width="300">
      </el-table-column>
      <el-table-column prop="noticePublisher" label="发布人/编辑" width="200">
      </el-table-column>
      <el-table-column prop="noticeTime" label="发布时间" width="300">
      </el-table-column>
      <el-table-column prop="userId" label="负责人" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
			  
			  <el-button
			    @click.native.prevent="deleteNotice(scope.$index, tableData)"
			    type="text"
			  >
			    发布
			  </el-button>
           
            <el-button
              type="text"
              @click.native.prevent="
                displayDialog(scope.$index, tableData)
                dialogVisible = true
              "
              >编辑</el-button
            >
			<el-button
			  @click.native.prevent="deleteNotice(scope.$index, tableData)"
			  type="text"
			>
			  删除
			</el-button>
			
            <el-dialog
              title="修改公告信息"
              :visible.sync="dialogVisible"
              width="50%"
              :before-close="handleClose"
              :append-to-body="true"
            >
              <el-row>公告号&nbsp;&nbsp;&nbsp;:&nbsp;<input
                v-model="noticeForm.noticeId"
                prop="noticeId"
                placeholder="公告号"
                readonly
              /></el-row>
              <el-row>发布人&nbsp;&nbsp;&nbsp;:&nbsp;<input
                v-model="noticeForm.noticePublisher"
                prop="noticePublisher"
                placeholder="发布人"
              /></el-row>
              <el-row>公告详情:<input
                v-model="noticeForm.noticeContent"
                prop="noticeContent"
                placeholder="公告详情"
              /></el-row>
              <el-row>发布时间:<input
                v-model="noticeForm.noticeTime"
                prop="noticeTime"
                placeholder="发布时间"
              /></el-row>
              <el-row>主&nbsp;&nbsp;题&nbsp;&nbsp;&nbsp;&nbsp;:<input
                v-model="noticeForm.noticeTopic"
                prop="noticeTopic"
                placeholder="主题"
              /></el-row>
              <el-row>管理者ID:<input
                v-model="noticeForm.userId"
                prop="userId"
                placeholder="管理者ID"
              /></el-row>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updata()">确 定</el-button>
              </span>
            </el-dialog>
          </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-button type="info" plain @click="toNoticeAdd">公告发布</el-button>
    </el-row>
  </div>
</template>

<script>
import { get } from '../../main-dev'
import axios from 'axios'
import router from '../../router'
export default {
  data() {
    return {
      input: '',
      outerVisible: false,
      innerVisible: false,
      tableData: [],
      dialogVisible: false,
      noticeForm: {
        noticeContent: '',
        noticeId: '',
        noticePublisher: '',
        noticeTime: '',
        noticeTopic: '',
        userId: '',
      },
    }
  },
  created() {
    this.display()
  },
  methods: {
    displayDialog2() {
      let notice_id = this.input
      axios.get('/oa/Notice/selectNoticeByNoticeId/' + notice_id)
      .then(
      (result) => {
        // console.log(result.data);
        this.noticeForm = result.data
        }
    )
    },
	// 添加并发布公告
	addNotice(){
		
	},
	// 删除公告
    deleteNotice(index, rows) {
      this.$confirm('确认要删除吗?', '提示', { type: 'warning' })
        //获取要删除的数据索引
        .then(() => {
          let noticeId = this.tableData[index].noticeId
          axios.delete('/oa/Notice/deleteNoticeByNoticeId/' + noticeId)
          rows.splice(index, 1)
        })
    },
    toNoticeAdd(){
      this.$router.push('/notice/activity')
    },
    async display() {
      // 发送请求
      let NoticeData = await get('/oa/Notice/allNoticeList')
      console.log(NoticeData.data)
      this.tableData = NoticeData.data
    },
    displayDialog(index) {
      let noticeId = this.tableData[index].noticeId
      axios.get('/oa/Notice/selectNoticeByNoticeId/' + noticeId)
      this.noticeForm = this.tableData[index]
    },
    updata() {
      let data = {
        noticeContent: this.noticeForm.noticeContent,
        noticeId: this.noticeForm.noticeId,
        noticePublisher: this.noticeForm.noticePublisher,
        noticeTime: this.noticeForm.noticeTime,
        noticeTopic: this.noticeForm.noticeTopic,
        userId: this.noticeForm.userId,
      }
      axios.put('/oa/Notice/updateNotice', data)
      this.dialogVisible = false
      // if(res.data == success)
      this.$confirm('修改成功')
    },
    addNotice() {
      this.$router.push('/notice/activity')
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