<template>
  <div class="page-container">
    <div class="main">
      <div class="title">
        Nuxt-Ant-Admin
      </div>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="name" label="用户名" prop="name">
          <a-input
            v-model="form.name"
            size="large"
            placeholder="用户名： admin"
          >
            <a-icon
              slot="prefix"
              type="user"
              :style="{ color: 'rgba(0,0,0,.25)' }"
            />
            <a-input />
          </a-input>
        </a-form-model-item>
        <a-form-model-item ref="name" label="密码" prop="password">
          <a-input-password
            v-model="form.password"
            size="large"
            placeholder="密码： admin"
          >
            <a-icon
              slot="prefix"
              type="lock"
              :style="{ color: 'rgba(0,0,0,.25)' }"
            />
          </a-input-password>
        </a-form-model-item>
        <a-form-model-item>
          <a-checkbox>
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
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            size="large"
            type="primary"
            block
            @click="onSubmit"
          >
            登 录
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
      other: '',
      form: {
        name: 'admin',
        password: 'admin'
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' }
        ],
        password: [{ required: true, message: 'Please input Activity password', trigger: 'change' }]
      }
    }
  },
  created () {},
  methods: {
    onSubmit () {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.$message.info('This is a normal message')
          //   this.$router.push({
          //     path: '/dashboard/overview'
          //   })
          const ret = await this.$store.dispatch(
            'user/login', this.form

          )
          const menuList = this.$store.state.user.menuList
          if (menuList.length > 0) {
            let path = menuList[0]?.path
            if (menuList[0]?.children?.length > 0) {
              path = menuList[0].children[0].path
            }
            this.$router.push({
              path
            })
          }
          console.log(ret)
        } else {
          return false
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
.forge-password {
  font-size: 14px;
}
</style>
