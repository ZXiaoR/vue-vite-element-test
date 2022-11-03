<template>
  <div v-if="!item.hidden">
    <!-- 无子节点 -->
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <Link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'sub-menu-title-noDropdown': !isNest }">
           <!-- icon -->
           <Icon :meta="onlyOneChild.meta || item.meta" />
          <!-- title -->
          <template #title>
            <span>{{ onlyOneChild.meta?.title }}</span>
          </template>
        </el-menu-item>
      </Link>
      
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template v-if="item.meta" #title>
        <Icon :meta="item.meta" />
        <span>{{ item.meta.title }}</span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import Link from './Link.vue'
import Icon from './Icon'
import { isExternal } from '@/utils/validate'
import path from 'path'
import { RouteItemTy } from '~/router'
import {ref} from 'vue'
const props = defineProps({
  //每一个router Item
  item: {
    type: Object,
    required: true
  },
  //用于判断是不是子Item,设置响应的样式
  isNest: {
    type: Boolean,
    default: false
  },
  //基础路径，用于拼接
  basePath: {
    type: String,
    default: ''
  }
})
//显示sidebarItem 的情况
let onlyOneChild: any = ref(null)
const hasOneShowingChild = (children = [], parent: RouteItemTy) => {
  const showingChildren = children.filter((item: RouteItemTy) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })
  // 当只有一个子路由时，默认显示子路由
  if (showingChildren.length === 1) {
    return true
  }
  // 如果没有要显示的子路由，则展示父级
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}
const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>
