<script setup lang="ts">
</script>

<template>
  <HeadBanner />
  <main class="py-20 px-10 text-center">
    <slot />
    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      <ElButton class="m-4" type="success">
        Hello
      </ElButton>
      [Default Layout]
    </div>
  </main>
</template>
