<script lang="ts" setup>
useHead({
  title: 'HDW🎨',
  link: [
    { rel: 'icon', type: 'image/png', href: 'image/nuxt.png' },
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  htmlAttrs: {
    lang: 'zh',
  },
})
</script>

<template>
  <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />

  <div>
    <!-- https://nuxt.com/docs/api/components/client-only#clientonly -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
