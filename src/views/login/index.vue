<script setup>
import { ref } from 'vue'
import { login, reg } from '@/api/login/index.js'
// 引入pinia
import { useUserStore } from '@/stores/index.js'
// 实例化userStore
const { setToken } = useUserStore()
// 引入路由两种方式
import { useRouter } from 'vue-router'
const router = useRouter()
// 表单dom
const ruleForm = ref()
// 登录
const form = ref({
  username: '',
  password: ''
})
const checkName = (rule, value, callback) => {
  const reg = /^[A-Za-z0-9]+$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('只能输入数字和字母'))
  }
}
const checkPassWord = (rule, value, callback) => {
  const reg = /^[A-Za-z0-9]+$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('只能输入数字和字母'))
  }
}
// 登录校验
const logRules = ref({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      max: 10,
      message: '长度最大不超过10个字符',
      trigger: 'blur'
    },
    {
      validator: checkName,
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      max: 10,
      message: '长度最大不超过10个字符',
      trigger: 'blur'
    },
    {
      validator: checkPassWord,
      trigger: 'blur'
    }
  ]
})
// 点击登录先进行校验，校验通过发请求
const lgin = () => {
  ruleForm.value.validate(async (valid) => {
    if (valid) {
      const res = await login(form.value)
      if (res.code === 0) {
        // 登录成功
        // 1. 本地存储token
        setToken(res.token)
        // 2. 跳转首页
        router.push('/')
        // 3. 提示
        ElMessage({
          message: res.message,
          type: 'success'
        })
      }
    }
  })
}
// 注册
const form1 = ref({
  username: '',
  password: '',
  repassword: ''
})
const checkRepassword = (rule, value, callback) => {
  if (form1.value.password === value) {
    callback()
  } else {
    callback(new Error('密码不一致,请重新输入'))
  }
}
const regRules = ref({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      max: 10,
      message: '长度不能超过10个字符',
      trigger: 'blur'
    },
    {
      validator: checkName,
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      max: 10,
      message: '长度不能超过10个字符',
      trigger: 'blur'
    },
    {
      validator: checkPassWord,
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      max: 10,
      message: '长度不能超过10个字符',
      trigger: 'blur'
    },
    {
      validator: checkRepassword,
      trigger: 'blur'
    }
  ]
})
const regist = async () => {
  await ruleForm.value.validate()
  const res = await reg(form1.value)
  if (res.code === 0) {
    ElMessage({
      message: res.message,
      type: 'success'
    })
  }
}
const checked = ref(false)
const loginIn = ref(true)
</script>

<template>
  <div class="container">
    <el-row>
      <el-col :span="12" class="bg">
        <img class="logo" src="../../assets/logo.png" alt="" />
      </el-col>
      <el-col :span="6" :offset="3" class="left">
        <div class="login" v-if="loginIn">
          <h1>登录</h1>
          <el-form ref="ruleForm" :model="form" :rules="logRules">
            <el-form-item prop="username">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
                prefix-icon="user"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
                prefix-icon="lock"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="remember">
            <el-checkbox v-model="checked" label="记住我" size="large" />
            <el-link type="primary" style="cursor: pointer" :underline="false"
              >忘记密码?</el-link
            >
          </div>
          <el-button type="primary" size="large" @click="lgin">登录</el-button>
          <div class="register">
            <el-text class="mx-1" type="info" @click="loginIn = false"
              >注册</el-text
            >
            <el-icon><Right /></el-icon>
          </div>
        </div>
        <div class="regist" v-else>
          <h1>注册</h1>
          <el-form ref="ruleForm" :model="form1" :rules="regRules">
            <el-form-item prop="username">
              <el-input
                v-model="form1.username"
                placeholder="请输入用户名"
                prefix-icon="user"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="form1.password"
                placeholder="请输入密码"
                prefix-icon="lock"
              ></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <el-input
                type="password"
                v-model="form1.repassword"
                placeholder="请再次输入密码"
                prefix-icon="lock"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="large" @click="regist"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
          <div class="register">
            <el-icon><Back /></el-icon>
            <el-text class="mx-1" type="info" @click="loginIn = true"
              >返回</el-text
            >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  height: 100vh;
  background: url('@/assets/login_bg.jpg') no-repeat center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login,
.regist {
  margin-top: 100px;
}

.remember {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.register {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
}
:deep(.el-button--large) {
  margin-top: 20px;
  width: 100%;
}
</style>
