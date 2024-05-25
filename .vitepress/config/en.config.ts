import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { enUSConfig } from '../lang/index'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
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
      lang: 'zh',
      link: '/zh-CN',
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en-US',
    },

  },
  rewrites: {
    'docs/zh-CN/components/:comp': 'zh-CN/component/:comp',
    'docs/zh-CN/(.*)': 'zh-CN/(.*)',
    'docs/zh-CN/utils/:util': 'zh-CN/utils/:util',
    'docs/en-US/components/:comp': 'en-US/component/:comp',
    'docs/en-US/(.*)': 'en-US/(.*)',
    'docs/en-US/utils/:util': 'en-US/utils/:util',
  },
  themeConfig: {
    logo: './four-leaves.svg',
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'Ming-UI',
    outline: 'deep',
    i18nRouting: true,
    ...enUSConfig,
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
            new URL('../../components/CustomVPButton.vue', import.meta.url),
          ),
        },
      ],
    },
  },
})
