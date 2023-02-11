<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <div flex-row items-center gap-2>
    <NuxtLink :to="localePath('/')" decoration-none>
      <img width="32" height="32" h-8 inline-block src="/image/nuxt.png" alt="">
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>
