<template>
  <div v-if="isExternalVal" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts" setup>
  import { isExternal } from '@/utils/validate';
  import { computed } from 'vue'
  // 纯类型声明props
  const props = defineProps<{
    iconClass: string,
    className?: string
  }>()
  const isExternalVal = computed(() => isExternal(props.iconClass))
  const iconName = computed(() => `#icon-${props.iconClass}`)
  const svgClass = computed(() => {
    if (props.className) {
      return 'svg-icon ' + props.className
    } else {
      return 'svg-icon'
    }
  })
  const styleExternalIcon = computed(() => {
    return {
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
    }
  })
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>