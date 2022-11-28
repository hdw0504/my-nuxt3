<script lang="ts" setup>
import { darkTheme, lightTheme } from 'naive-ui'
const color = useColorMode()
const isDark = computed(() => color.value === 'dark')

useHead({
  title: 'nuxt3',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})
</script>

<template>
  <!-- inline-theme-disabled 把行内css in js 去掉 -->
  <n-config-provider :theme="isDark ? darkTheme : lightTheme" inline-theme-disabled>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </n-config-provider>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
  transition-property: background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 400ms;
}

html {
  font-size: 16px;
}

html.dark {
  background: var(--bg-color);
  color: var(--text-color);
}
</style>
