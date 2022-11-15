<script setup lang="ts">

</script>

<template>
  <header
    sticky top-0 z-10
    w-full border-b
    b-gray-200 dark:b-gray-700 test
    class="h-[var(--header-height)]
    "
  >
    <div mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl grid h-full grid-cols-12 lg:gap-8>
      <div flex items-center flex-none col-span-2>
        <button relative z-10 u-text-gray-500 hover:u-text-gray-700 rounded-xl lg:hidden>
          btn
        </button>
        <Logo hidden lg:flex>
          this is logo
        </Logo>
      </div>
      <div flex items-center justify-center flex-1 col-span-8>
        <Logo flex lg:hidden />
        <nav hidden lg:flex>
          nav
        </nav>
      </div>
      <div flex items-center justify-end flex-none col-span-2 gap-2 lg:gap-4>
        <!-- <NuxtLink i-carbon-campsite to="/" /> -->
        <a i-carbon-logo-github href="https://github.com/hdw0504/my-nuxt3" target="_blank" />
        <DarkToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
