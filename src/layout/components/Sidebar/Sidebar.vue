<template>
  <div id="Sidebar" class="reset-menu-style">
    <!--logo-->
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <!--router nav-->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="(activeMenu as string)"
        :collapse="isCollapse"
        :background-color="scssJson.menuBg"
        :text-color="scssJson.menuText"
        :unique-opened="false"
        :active-text-color="scssJson.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { computed } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
//get scss variable
import scssExportJson from '@/styles/variables-to-js.scss'
import { ObjTy } from '~/common'

const store = useStore()
const route = useRoute()

const permission_routes = computed(() => {
  return store.state.permission.routes
})

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
const showLogo = computed(() => {
  return store.state.settings.sidebarLogo
})
const isCollapse = computed(() => {
  return !store.state.app.sidebar.opened
})

//change  scss variable to js
const dillScssExportToJson = (scssExportJson: any) => {
  const jsonString = scssExportJson.replace(/:export\s*/, '').replace(/[\s+\r\n]/g, '')
  const scssJson: ObjTy = {}
  jsonString
    .slice(1, jsonString.length - 2)
    .split(';')
    .forEach((fItem: any) => {
      const arr = fItem.split(':')
      scssJson[arr[0]] = arr[1]
    })
  return scssJson
}
const scssJson = dillScssExportToJson(scssExportJson)
</script>
