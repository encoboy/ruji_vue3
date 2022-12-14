<template>
  <div class="app">
    <div class="app-wrapper openSidebar clearfix">
      <div class="sidebar-container">
        <div class="logo">
          <img
            src="@/assets/images/login/login-logo.png"
            style="width: 117px; height: 32px"
          />
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            :default-active="objData.defAct"
            :unique-opened="false"
            :collapse-transition="false"
            background-color="#343744"
            text-color="#bfcbd9"
            active-text-color="#f4f4f5"
          >
            <div v-for="item in objData.menuList" :key="item.id">
              <el-sub-menu
                :index="item.id"
                v-if="item.children && item.children.length > 0"
              >
                <template slot="title">
                  <span>{{ item.name }}</span>
                </template>
                <el-menu-item
                  v-for="sub in item.children"
                  :index="sub.id"
                  :key="sub.id"
                  @click="menuHandle(sub, false)"
                >
                  <span slot="title">{{ sub.name }}</span>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item
                v-else
                :index="item.id"
                @click="menuHandle(item, false)"
              >
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="main-container">
        <div class="navbar">
          <div class="head-lable">
            <span v-if="objData.goBackFlag" class="goBack" @click="goBack()"
              ><img src="@/assetx/images/icons/btn_back@2x.png" alt="" />
              返回</span
            >
            <span>{{ objData.headTitle }}</span>
          </div>
          <div class="right-menu">
            <div class="avatar-wrapper">{{ objData.userInfo.name }}</div>

            <img
              src="images/icons/btn_close@2x.png"
              class="outLogin"
              alt="退出"
              @click="logout"
            />
          </div>
        </div>
        <div class="app-main" v-loading="loadingRef">
          <div class="divTmp" v-show="loadingRef"></div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/assets/index.css";
import { ref, onMounted, onBeforeMount } from "vue";
import { logoutApi } from "@/api/login";
import { useRouter } from "vue-router";
const router = useRouter();

let timer: number | null = null;
let loading: boolean = true;

const loadingRef = ref(loading);

const objData = {
  defAct: "2",
  menuActived: "2",
  userInfo: {},
  menuList: [
    {
      id: "2",
      name: "员工管理",
      icon: "icon-member",
      url: "/home/member",
      children: [],
    },
    {
      id: "3",
      name: "分类管理",
      url: "/home/category",
      icon: "icon-category",
      children: [],
    },
    {
      id: "4",
      name: "菜品管理",
      url: "page/food/list.html",
      icon: "icon-food",
      children: [],
    },
    {
      id: "5",
      name: "套餐管理",
      url: "page/combo/list.html",
      icon: "icon-combo",
      children: [],
    },
    {
      id: "6",
      name: "订单明细",
      url: "page/order/list.html",
      icon: "icon-order",
      children: [],
    },
  ],
  headTitle: "员工管理",
  url: "/home/member",
  goBackFlag: false,
};

const objDataRef = ref(objData);

const menuHandle = (item: any, goBackFlag: any) => {
  loadingRef.value = true;
  objDataRef.value.menuActived = item.id;
  objDataRef.value.headTitle = item.name;
  objDataRef.value.goBackFlag = goBackFlag;
  router.push(item.url);
  closeLoading();
};

const goBack = () => {
  const menu = objDataRef.value.menuList.find(
    (item) => item.id === objDataRef.value.menuActived
  );
  menuHandle(menu, false);
};
const logout = () => {
  logoutApi().then(({ data }) => {
    if (data.code === 1) {
      localStorage.removeItem("userInfo");
    }
  });
};

const closeLoading = () => {
  timer = null;
  timer = setTimeout(() => {
    loadingRef.value = false;
  }, 1000);
};

const userInfo = window.localStorage.getItem("userInfo");
if (userInfo) {
  objDataRef.value.userInfo = JSON.parse(userInfo);
}

onMounted(() => {
  closeLoading();
});
onBeforeMount(() => {
  if (timer) clearTimeout(timer);
  timer = null;
});
</script>

<style lang="scss" scoped>
.body {
  min-width: 1366px;
}
.app-main {
  height: calc(100% - 64px);
}
.app-main .divTmp {
  width: 100%;
  height: 100%;
}
</style>
