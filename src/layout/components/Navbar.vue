<template>
  <div class="navbar">
    <Hamburger
      :is-active="opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown trigger="click" size="medium">
        <div class="avatar-wrapper">
          <img
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            class="user-avatar"
          />
          <CaretBottom style="width: 1em; height: 1em; margin-left: 4px" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="loginOut">login out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CaretBottom } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Breadcrumb from './Breadcrumb/index.vue'
import Hamburger from './Hamburger/index.vue'
import { computed } from 'vue'
import { useStore } from '@/store'
const store = useStore()
const opened = computed(() => {
  return store.state.app.sidebar.opened
})
const toggleSideBar = () => {
  store.dispatch('app/toggleSideBar')
}
/*
 * 退出登录
 * */

const loginOut = () => {
  store.dispatch('user/logout').then(() => {
    ElMessage({ 
      type: 'success',
      message: '退出登录成功'
    })
    //此处reload清空路由和重置部分状态
    location.reload()
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    cursor: pointer;
    margin-right: 40px;
    .avatar-wrapper {
      margin-top: 5px;
      position: relative;
      cursor: pointer;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
