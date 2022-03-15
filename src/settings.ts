interface SettingTy {
    title: string,
    logo: string,
    tagsView: boolean,
    fixedHeader: boolean,
    sidebarLogo: boolean,
  
  }
  const setting: SettingTy = {
    title: 'vue3',
    logo: '',
    /**
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
    tagsView: false,
  
    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: true,
  
    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    sidebarLogo: true
  }
  export default setting
  