<script setup>
import { darkTheme } from 'naive-ui'
const color = useColorMode()
const theme = computed(() => color.preference === 'dark' ? darkTheme : null)

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
  <n-config-provider :theme="theme">
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
}

html {
  font-size: 16px;
}

html.dark {
  background: #121212;
  color: white;
}
</style>
