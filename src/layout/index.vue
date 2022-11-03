<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <Sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <Navbar />  
      </div>
      <AppMain />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "MyLayout"
}
</script>

<script setup lang="ts">
import { Sidebar, Navbar, AppMain } from './components'
import { computed } from 'vue'
import { useStore } from '@/store'
import resizeHandler from './hook/ResizeHandler'
const store = useStore()
const sidebar = computed(() => {
  return store.state.app.sidebar
})
const device = computed(() => {
  return store.state.app.device
})
const needTagsView = computed(() => {
  return store.state.setting.tagsView
})
const fixedHeader = computed(() => {
  return store.state.setting.fixedHeader
})
const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === 'mobile'
  }
})
resizeHandler()
function handleClickOutside() {
  store.dispatch('app/closeSideBar', { withoutAnimation: false })
}
</script>

<style lang="scss" scoped>
.app-container {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
