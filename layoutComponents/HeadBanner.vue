<script setup lang="ts">

</script>

<template>
  <header
    class="sticky top-0 z-10
    w-full h-[var(--header-height)] border-b
  b-gray-200  dark:b-gray-700"
  >
    <div class="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl grid h-full grid-cols-12 lg:gap-8">
      <div class="flex items-center flex-none col-span-2">
        <button class="relative z-10 u-text-gray-500 hover:u-text-gray-700 rounded-xl lg:hidden">
          btn
        </button>
        <a href="/" class="hidden lg:block">HOME</a>
      </div>
      <div class="flex items-center justify-center flex-1 col-span-8">
        <a href="/" class="block lg:hidden">HOME</a>
        <nav class="hidden lg:flex">
          nav
        </nav>
      </div>
      <div class="flex items-center justify-end flex-none col-span-2 lg:gap-4 lg:pl-4">
        right
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
