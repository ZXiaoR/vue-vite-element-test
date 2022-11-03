import { watch, onBeforeMount,onMounted,onBeforeUnmount } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
export default function resizeHandler() {
  const store = useStore()
  const route = useRoute()
  const { body } = document
  const WIDTH = 992
  watch(route, () => {
    if (store.state.app.device === 'mobile' && store.state.app.sidebar.opened) {
      store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  })
  onBeforeMount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })
  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  })
  onBeforeUnmount(() => {
    window.addEventListener('resize', $_resizeHandler)
  })
  function $_resizeHandler() {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
      if (isMobile) {
        store.dispatch('app/closeSideBar', { withoutAnimation: true })
      }
    }
  }
  function $_isMobile() {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
}