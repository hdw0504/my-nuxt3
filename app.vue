<script lang="ts" setup>
import { ID_INJECTION_KEY } from 'element-plus'

useHead({
  title: 'nuxt3',
  link: [
    { rel: 'icon', type: 'image/png', href: '/nuxt.png' },
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  htmlAttrs: {
    lang: 'zh',
  },
})

provide(ID_INJECTION_KEY, {
  prefix: 1024,
  current: 0,
})
</script>

<template>
  <div>
    <!-- https://nuxt.com/docs/api/components/client-only#clientonly -->
    <client-only>
      <NuxtLayout>
        <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
        <NuxtPage />
      </NuxtLayout>
    </client-only>
  </div>
</template>
