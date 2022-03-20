<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form">
      <div class="title-container">
          <h3 class="title">XXX Management</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container"><svg-icon icon-class="user" /></span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名(邮箱)"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container"><svg-icon icon-class="password" /></span>
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin(loginFormRef)"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin(loginFormRef)">登录</el-button>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router';
import type { ElForm } from 'element-plus'
import {RouterRowTy} from '~/router'
import { ElMessage  } from 'element-plus'
type FormInstance = InstanceType<typeof ElForm>

const loginFormRef = ref<FormInstance>()
let loading = ref<boolean>(false)

const loginForm = reactive({
  username: 'admin',
  password: '12345678'
})
const rules = reactive({
  username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
  password: [{ required: true, min: 8, message: '密码不能少于8位数', trigger: 'blur' }]
})
// 登录
const store = useStore()
const router = useRouter()
const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  formEl.validate((valid) => {
    if (valid) {
      store.dispatch('user/login', loginForm).then(async(res) => {
        store.dispatch('permission/dynamicRoutes') // 过滤菜单
        store.dispatch('permission/generateRoutes').then((accessRoutes) => {
          accessRoutes.forEach((route: RouterRowTy) => {
            router.addRoute(route)
          });
          router.push('/')
        })
      })
    } else {
      ElMessage({
        type: 'error',
        message: '参数有误'
      })
      return false
    }
  })
}
// 密码显示与隐藏
const passwordRef = ref<HTMLElement>()
let passwordType = ref<string>('password')
const showPwd = () => {
  passwordType.value = passwordType.value === 'password' ? '' : 'password'
    nextTick(() => {
      passwordRef.value && passwordRef.value.focus()
    })
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
//css 样式重置
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg: #000;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  height: 100vh;
  width: 100%;
  background-color: $bg;
  .login-form {
    width: 520px;
    max-width: 100%;
    padding: 210px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

//错误提示信息
.tip-message {
  color: #e4393c;
  height: 30px;
  margin-top: -12px;
  font-size: 12px;
}

//登录按钮
.login-btn {
  width: 100%;
  margin-bottom: 30px;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 15px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>

