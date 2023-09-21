<template>
  <div class="error">
    <p class="code">
      {{ error.statusCode }}
    </p>
    <p class="message">
      {{ error.message }}
    </p>
    <a-button class="jump" type="primary" plain @click="goto">
      返回首页
    </a-button>
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      title: ''
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  mounted () {
  },
  methods: {
    goto () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style lang="less">
.error {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    text-align: center;

    .code {
        font-size: 8.75rem;
        margin-bottom: 60px;
    }

    .message {
        font-size: 1.25rem;
        margin-bottom: 130px;
    }

    .jump {
        width: 600px;
        margin: 0 auto !important;
    }
}
</style>
