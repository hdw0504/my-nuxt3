<script setup>
import { darkTheme, lightTheme } from 'naive-ui'
const { $isDark } = useNuxtApp()

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
  <NuxtLayout>
    <n-config-provider :theme="$isDark ? darkTheme : lightTheme">
      <NuxtPage />
    </n-config-provider>
  </NuxtLayout>
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
