<template>
  <div class="contener">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>删除员工</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" style="width: 100%" max-height="450">
      <el-table-column
        fixed
        prop="deptNo"
        label="部门编号"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="deptName"
        label="部门名称"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="deptLeader"
        label="部门主任"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="deptNum"
        label="部门人数"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="deptRemark"
        label="备注"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="userId"
        label="管理员"
        width="120"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _ from 'lodash'
import { get, post } from '../../main-dev'
import axios from 'axios'
export default {
  data() {
    return {
      state: '',
      tableData: [],
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
      this.$confirm('确认要删除吗?', '提示', { type: 'warning' })
        //获取要删除的数据索引
        .then((data) => {
          let deptNo = this.tableData[index].deptNo
          axios.delete('/oa/Department/deleteDepartmentByDeptNo/'+deptNo)
          rows.splice(index, 1)
        })
    },
    async display() {
      // 发送请求
      let deptData = await get('/oa/Department/allDepartmentList')
      console.log(deptData.data)
      this.tableData = deptData.data
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