<!-- 面包屑组件 -->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { compile } from 'path-to-regexp'
import {ref, watch, onBeforeMount } from 'vue'
import { RouterRowTy } from '~/router'
import { useRoute, useRouter } from 'vue-router'
const levelList: any = ref(null)
const route = useRoute()
const getBreadcrumb = () => {
  let matched: any = route.matched.filter((item) => item.meta && item.meta.title)
  const first: any = matched[0]
  // 追加dashboard
  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched)
  }
  levelList.value = matched.filter(
    (item: RouterRowTy) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

const isDashboard = (route: RouterRowTy) => {
  const name = route?.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
const pathCompile = (path: string) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}
const router = useRouter()
const handleLink = (item: RouterRowTy) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  if (path) {
    router.push(pathCompile(path))
  }
}
watch(
  () => route.path,
  () => { getBreadcrumb() },
  { immediate: true }
)
onBeforeMount(() => {
  getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
<style lang="scss">
.app-breadcrumb.el-breadcrumb {
  .el-breadcrumb__item {
    line-height: 50px;
    display: inline-block;
  }
}
</style>
