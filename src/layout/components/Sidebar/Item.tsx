import ElSvgItem from './ElSvgItem.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    meta: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const renderItem = () => {
      if (props.meta?.elSvgIcon) {
        //using element-plus svg icon
        // element-plus remove el-icon,using 'svg icon'  to replace
        // view https://element-plus.org/zh-CN/component/icon.html
        return <ElSvgItem elSvgName={props.meta.elSvgIcon} />
      } else if (props.meta?.icon) {
        return <svg-icon icon-class={props.meta?.icon} className="nav-icon" />
      }
    }
    return () => {
      return renderItem()
    }
  }
})
