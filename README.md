记录日期2022.11.11
项目基于[vitesse-nuxt3](https://github.com/antfu/vitesse-nuxt3)
`package.json`、`nuxt.config.ts`、`vitest.config.ts`、`tsconfig.json`配置放在结尾

### 技术栈
目前使用到 nuxt3、pinia、unocss、vueuse、naive-ui、vitest

### 项目版本
```txt
nuxt版本：3.0.0-rc.13-27772354.a0a59e2
@nuxt/test-utils-edge版本：3.0.0-rc.13-27772354.a0a59e2
```

### 学习记录
[nuxt3 文档](https://v3.nuxtjs.org/)
[nuxt2 unit test](https://test-utils.nuxtjs.org/)
[vitest 文档](https://cn.vitest.dev/)
[在nuxt3中使用vitest和vueuse](https://github.com/vitest-dev/vitest/discussions/1737)
[vitest配置](https://github.com/Qiskit/saiba/blob/main/vitest.config.ts)
[在vitest中配置autoimport](https://github.com/remiconnesson/vitest-nuxt)
[naiveUI服务端渲染SSR](https://www.naiveui.com/zh-CN/light/docs/ssr)
[naiveUI nuxt support](https://github.com/tusen-ai/naive-ui/issues/636)

### 解决的问题
1. 全局css 
   - 参考 `nuxt.config.ts` css 配置
2. test.ts 文件中自动引入 `vue3` `vueuse` `vitest`
   - 参考 `vitest.config.ts` 和 `tsconfig.json`
3. 配置 vitest 路径和自动引入的组件与 nuxt 一致
   - 参考 `vitest.config.ts`
4. 配置 `naive-ui` 自动引入及主题配置


### 学习中遇到的问题
1. `No context is available. (Forgot calling setup or createContext?)` 错误
   - nuxt2中是用setuptest 在nuxt3是使用setup [demo test](https://github.com/hdw0504/my-nuxt3/blob/main/tests/browser.test.ts)
2. `Vitest was initialized with native Node instead of Vite Node.` 错误
   - 在vitest 中配置 `@nuxt/test-utils-edge`
   - 在`vitest.config.ts`中配置`test.deps.inline`（参考底下配置） [nuxt issue](https://github.com/nuxt/framework/issues/3252#issuecomment-1126771193)
3. `Component inside <Transition> renders non-element root node that cannot be animated.` 错误
   - 在nuxt中每个页面 `<template> </temnplate>` 都需要一个根节点（不同于 vue3 不限制）[nuxt issue](https://github.com/nuxt/framework/issues/5551#issuecomment-1162049709)

---

``` json
// package.json
{
  "private": true,
  "packageManager": "pnpm@7.9.0",
  "scripts": {
    "build": "nuxi build",
    "dev": "nuxi dev",
    "start": "node .output/server/index.mjs",
    "lint": "eslint .",
    "test": "vitest",
    "postinstall": "nuxi prepare",
    "generate": "nuxi generate",
    "up": "taze major -I"
  },
  "devDependencies": {
    "@antfu/eslint-config": "^0.29.4",
    "@css-render/vue3-ssr": "^0.15.11",
    "@iconify-json/carbon": "^1.1.9",
    "@iconify-json/twemoji": "^1.1.5",
    "@nuxt/test-utils-edge": "3.0.0-rc.13-27772354.a0a59e2",
    "@nuxtjs/color-mode": "^3.1.8",
    "@pinia/nuxt": "^0.4.3",
    "@unocss/nuxt": "^0.46.4",
    "@vueuse/nuxt": "^9.5.0",
    "dayjs": "^1.11.6",
    "eslint": "^8.27.0",
    "jsdom": "^20.0.2",
    "naive-ui": "^2.33.5",
    "nuxt": "npm:nuxt3@3.0.0-rc.13-27772354.a0a59e2",
    "pinia": "^2.0.23",
    "playwright": "^1.27.1",
    "sass": "^1.56.1",
    "typescript": "^4.8.4",
    "unplugin-auto-import": "^0.11.4",
    "unplugin-vue-components": "^0.22.9",
    "vite": "^3.2.3",
    "vitest": "^0.25.1",
    "vue": "^3.2.44"
  },
  "pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": [
        "webpack"
      ]
    }
  }
}

```

```ts
// nuxt.config.ts
import dayjs from 'dayjs'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  alias: {
    style: '/<rootDir>/assets/style',
  },
  // nuxt auto import components
  components: {
    dirs: [
      '~/components',
      '~/layoutComponents',
      '~/pagesComponents',
    ],
  },
  // global css
  css: [
    'assets/style/root.css',
  ],

  // antfu/vitesse-nuxt3 default config
  experimental: {
    reactivityTransform: true,
  },
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  // naive-ui
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? ['naive-ui', 'vueuc', '@css-render/vue3-ssr', '@juggle/resize-observer']
        : ['@juggle/resize-observer'],
  },
  vite: {
  // need add declare from xxx.d.ts
    define: {
      __BUILD_TIME__: JSON.stringify(dayjs().format('YYYY/MM/DD HH:mm')),
    },
    ssr: {
      noExternal: ['naive-ui'],
    },
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()], // 全自动按需引入naive-ui组件
      }),
    ],
    // 解决在开发模式下降低 naive-ui 引起的打包缓慢
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : [],
    },
  },
})

```
```ts
// vitest.config.ts
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // fix bug: Vitest was initialized with native Node instead of Vite Node
    // https://github.com/nuxt/framework/issues/3252#issuecomment-1126771193
    deps: {
      inline: ['@nuxt/test-utils-edge'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
  plugins: [
    // auto import vue、vueuse
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      vueTemplate: true,
      dts: true, // not matter
    }),
    // auto import vue component
    Components({
      dirs: [
        './components',
        './layoutComponents',
        './pagesComponents',
      ],
    }),
  ],
})
```

```json
// tsconfig.json
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "types": ["vitest/globals", "naive-ui/volar"]
  }
}

```
