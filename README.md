记录日期2022.11.11
项目基于[vitesse-nuxt3](https://github.com/antfu/vitesse-nuxt3)
`package.json`、`nuxt.config.ts`、`vitest.config.ts`、`tsconfig.json`配置放在结尾

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

### 解决的问题
- 全局css 
  - `nuxt.config.ts`文档中css配置
- `Vitest was initialized with native Node instead of Vite Node.` 错误
  - 在vitest 中配置 `@nuxt/test-utils-edge`
  - 在`vitest.config.ts`中配置`test.deps.inline`（参考底下配置） [nuxt issue](https://github.com/nuxt/framework/issues/3252#issuecomment-1126771193)
- `No context is available. (Forgot calling setup or createContext?)` 错误
  - nuxt2中是用setuptest 在nuxt3是使用setup [demo test](https://github.com/hdw0504/my-nuxt3/blob/main/tests/browser.test.ts)
- test.ts 文件中自动引入 `vue3` `vueuse` `vitest`
  - 参考 `vitest.config.ts` 和 `tsconfig.json`
- 配置 vitest 路径和自动引入的组件与 nuxt 一致
  - 参考 `vitest.config.ts`



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
    "@iconify-json/carbon": "^1.1.9",
    "@iconify-json/twemoji": "^1.1.5",
    "@nuxt/test-utils-edge": "3.0.0-rc.13-27772354.a0a59e2",
    "@nuxtjs/color-mode": "^3.1.8",
    "@pinia/nuxt": "^0.4.3",
    "@unocss/nuxt": "^0.46.4",
    "@vueuse/nuxt": "^9.5.0",
    "eslint": "^8.27.0",
    "jsdom": "^20.0.2",
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
    "types": ["vitest/globals"]
  }
}

```
