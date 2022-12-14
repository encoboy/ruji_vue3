<template>
  <div class="dashboard-container" id="member-app">
    <div class="container">
      <div class="tableBar">
        <el-input
          v-model="$thisData.input"
          placeholder="请输入员工姓名"
          style="width: 250px"
          clearable
          @keyup.enter.native="handleQuery"
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"
            style="cursor: pointer"
            @click="handleQuery"
          ></i>
        </el-input>
        <el-button type="primary" @click="addMemberHandle('add')">
          + 添加员工
        </el-button>
      </div>
      <el-table :data="$thisData.tableData" stripe class="tableBox">
        <el-table-column prop="name" label="员工姓名"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            {{ String(scope.row.status) === "0" ? "已禁用" : "正常" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="blueBug"
              @click="addMemberHandle(scope.row.id)"
              :class="{ notAdmin: user !== 'admin' }"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              class="delBut non"
              @click="statusHandle(scope.row)"
              v-if="user === 'admin'"
            >
              {{ scope.row.status == "1" ? "禁用" : "启用" }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageList"
        :page-sizes="[2]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
        :current-page.sync="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/assets/page.css";
import { ref, onMounted } from "vue";
import { getMemberList } from "@/api/member";

let userRef = ref();

const $thisData = {
  input: "",
  counts: 0,
  page: 1,
  pageSize: 2,
  tableData: [],
  id: "",
  status: "",
};
const $thisDataRef = ref($thisData);

const init = async () => {
  const params = {
    page: $thisDataRef.value.page,
    pageSize: $thisDataRef.value.pageSize,
    name: $thisDataRef.value.input ? $thisDataRef.value.input : undefined,
  };
  console.log(2);
  await getMemberList(params)
    .then(({ data }: any) => {
      if (String(data.code) === "1") {
        $thisDataRef.value.tableData = data.data.records || [];
        $thisDataRef.value.counts = data.data.total;
      }
    })
    .catch((err: any) => {});
};
const handleQuery = () => {};
const addMemberHandle = () => {};
const statusHandle = () => {};
onMounted(() => {
  console.log("22");
  init();
  if (localStorage.getItem("userInfo") != null) {
    //获取当前登录员工的账号，并赋值给模型数据user
    userRef.value = JSON.parse(localStorage.getItem("userInfo")).username;
  }
});
</script>

<style lang="scss">
#member-app .notAdmin::after {
  border: 0 !important;
}
</style>
