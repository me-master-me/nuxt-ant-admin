<template>
  <div class="page-container">
    <div class="main">
      <div class="title">
        Nuxt-Ant-Admin
      </div>
      <a-form
        id="formLogin"
        ref="formLogin"
        class="user-layout-login"
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'username',
              {
                rules: [
                  { required: true, message: 'Please enter the username' },
                  { validator: handleUsernameOrEmail },
                ],
                validateTrigger: 'default admin',
              },
            ]"
            size="large"
            type="text"
            placeholder="default admin"
          >
            <a-icon
              slot="prefix"
              type="user"
              :style="{ color: 'rgba(0,0,0,.25)' }"
            />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input-password
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: 'Please enter the password' }],
                validateTrigger: 'blur',
              },
            ]"
            size="large"
            placeholder="default admin"
          >
            <a-icon
              slot="prefix"
              type="lock"
              :style="{ color: 'rgba(0,0,0,.25)' }"
            />
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="['rememberMe', { valuePropName: 'checked' }]"
          >
            remember-me
          </a-checkbox>
          <a-button
            type="link"
            class="forge-password"
            style="float: right"
            size="large"
          >
            forgot-password
          </a-button>
        </a-form-item>

        <a-form-item style="margin-top: 24px">
          <a-button
            size="large"
            type="primary"
            html-type="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >
            登 录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {},
  methods: {
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex =
        /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey
        // Login
      } = this

      state.loginBtn = true
      setTimeout(() => {
        state.loginBtn = false
      }, 2000)

      const validateFieldsKey =
        customActiveKey === 'tab1'
          ? ['username', 'password']
          : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] =
            values.username
          //   loginParams.password = md5(values.password)
          //   Login(loginParams)
          //     .then(res => this.loginSuccess(res))
          //     .catch(err => this.requestFailed(err))
          //     .finally(() => {
          //       state.loginBtn = false
          //     })
          this.$router.push({
            path: '/dashboard/overview'
          })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-container {
  width: 100%;
  height: 100vh;
  min-height: 100%;
  background: #f0f2f5 url("static/images/loginBg.png") no-repeat center/100%
    100%;
}
.main {
  max-width: 500px;
  margin: auto;
  //   padding-bottom: 30px;
  //   background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0) 60px,#e8f1f8 60px, #e8f1f8 100%);
  transform: translateY(50%);
}
.title {
  font-size: 30px;
  padding-left: 20px;
  color: #f0f2f5;
  line-height: 60px;
  font-weight: 500;
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
  background: url("static/images/loginTitle.png") no-repeat center/100% 100%;
}
button.login-button {
  padding: 0 15px;
  font-size: 16px;
  height: 40px;
  width: 100%;
}
.forge-password {
  font-size: 14px;
}
</style>
