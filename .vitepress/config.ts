import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Ming-UI',
  titleTemplate: false,
  head: [
    ['link', { rel: 'icon', href: './four-leaves.svg' }],
  ],
  description: '充满创意和交互性设计的组件库',
  // eslint-disable-next-line node/prefer-global/process
  base: process.env.NODE_ENV === 'production' ? '/ming-UI/' : '/',
  locales: {
    root: {
      label: ' ',
      lang: 'zh-CN',
      link: '/zh-CN',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en-US',
    },

  },
  rewrites: {
    'docs/zh-CN/components/:comp': 'zh-CN/component/:comp',
    'docs/zh-CN/(.*)': '(.*)',
    'docs/en-US/components/:comp': 'en-US/component/:comp',
    'docs/en-US/(.*)': '(.*)',
    'docs/zh-CN/utils/:util': 'zh-CN/utils/:util',
    'docs/en-US/utils/:util': 'en-US/utils/:util',
  },
  themeConfig: {
    logo: './four-leaves.svg',
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'Ming-UI',
    outline: 'deep',
    i18nRouting: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '介绍', link: '/introduce' },
      { text: '组件', link: '/zh-CN/component/button' },
      { text: '工具', link: '/zh-CN/utils/' },
    ],
    sidebar: {
      '/zh-CN/component/': [
        {
          text: 'Button 按钮',
          link: '/zh-CN/component/button',
        },
        {
          text: 'Input 输入框',
          link: '/components/input/',
        },
        {
          text: 'Tooltip 文字提示',
          link: '/components/tooltip/',
        },
        {
          text: 'Table 表格',
          link: '/components/table/',
        },
        {
          text: 'Icons 图标',
          link: '/zh-CN/component/icon',
        },
        {
          text: 'ColorPicker 取色器',
          link: '/components/color-picker/',
        },
        {
          text: 'ControlPanel 控制板',
          link: '/components/control-panel/',
        },
        {
          text: 'Rate 评分',
          link: '/components/rate/',
        },
        {
          text: 'notification 通知',
          link: '/components/notification/',
        },

      ],
      '/en-US/component/': [
        {
          text: 'Button',
          link: '/en-US/component/button',
        },
      ],
      '/utils/': [
        {
          text: 'genClass',
          link: '/utils/gen-class',
        },
      ],
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPButton\.vue$/,
          replacement: fileURLToPath(
            new URL('../components/CustomVPButton.vue', import.meta.url),
          ),
        },
      ],
    },
  },
})
