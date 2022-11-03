<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="key"/>
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const key = computed(() => route.path)
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - #{$navBarHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
  top: $navBarHeight;
}

.fixed-header+.app-main {
  padding: 10px
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - #{$navBarHeight} -#{$tagViewHeight});
  }

  .fixed-header+.app-main {
    padding: 10px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
