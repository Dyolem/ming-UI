import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ming ',
  description: 'This is a vue  library',
  rewrites: {
    'docs/(.*)': '(.*)',
    'packages/ming-UI/src/:comp/(.*)': 'components/:comp/(.*)',
    'packages/utils/src/(.*)': 'utils/(.*)',
    'packages/icons/src/(.*)': 'components/icons/(.*)',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'My Custom Title',
    outline: 'deep',
    nav: [
      { text: '首页', link: '/' },
      { text: '介绍', link: '/introduce' },
      { text: '组件', link: '/components/' },
      { text: '工具', link: '/utils/' },
    ],

    sidebar: {
      '/components/': [
        {
          text: 'Button按钮',
          link: '/components/button/',
        },
        {
          text: 'Input输入框',
          link: '/components/input/',
        },
        {
          text: 'Tooltip文字提示',
          link: '/components/tooltip/',
        },
        {
          text: 'Table表格',
          link: '/components/table/',
        },
        {
          text: 'Icons图标',
          link: '/components/icons/',
        },
        {
          text: 'ColorPicker取色器',
          link: '/components/color-picker/',
        },
      ],
      '/utils/': [
        {
          text: 'genClass',
          link: '/utils/gen-class',
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
