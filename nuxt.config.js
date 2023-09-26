export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-ant-admin',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: {
    color: 'blue',
    height: '2px'
  },
  server: {
    host: '0.0.0.0',
    port: '8080'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: '@assets/css/index.less',
      lang: 'less'
    }
  ],
  plugins: ['@/plugins/antd-ui', '@/plugins/unit', '@/plugins/setting'],
  components: true,
  buildModules: ['@nuxtjs/eslint-module'],
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: '/'
  },
  build: {
    transpile: [/ant-design-vue/],
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es'
          },
          'ant-design-vue'
        ]
      ]
    },
    loaders: {
      less: {
        javascriptEnabled: true
      }
    },

    styleResources: {
      less: './assets/css/variables.less'
    }
  }
}
