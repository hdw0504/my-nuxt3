<script setup lang="ts">
import { useMessage } from 'naive-ui'
const { $isDark } = useNuxtApp()
const message = useMessage()
const { y } = useWindowScroll()

const options = [
  {
    label: '测试',
    key: 'test',
  },
]
function handleSelect(key: string | number) {
  message.info(String(key))
}
</script>

<template>
  <header
    sticky top-0 z-10
    w-full
    b-gray-200 dark:b-gray-700 transition-all-400
    bg="[var(--bg-color)]" :class="y === 0 ? 'border-none h-30' : 'border-b h-[var(--header-height)]'"
  >
    <div mx-auto w-full max-w-7xl grid h-full grid-cols-12 lg:gap-8 transition-400>
      <div flex items-center justify-center flex-none col-span-2>
        <n-dropdown trigger="click" :show-arrow="true" :options="options" @select="handleSelect">
          <!-- in production mode can't use without n-button tag to wake up dropdown -->
          <!-- <div i-carbon-menu relative lg:hidden cursor-pointer /> -->
          <n-button text tag="span" :color="$isDark ? '#fff' : '#000'" relative lg:hidden cursor-pointer>
            <template #icon>
              <n-icon>
                <svg width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M4 6h24v2H4zm0 18h24v2H4zm0-12h24v2H4zm0 6h24v2H4z" /></svg>
              </n-icon>
            </template>
          </n-button>
        </n-dropdown>

        <Logo hidden lg:flex>
          this is logo
        </Logo>
      </div>
      <div flex items-center justify-center flex-1 col-span-8>
        <Logo flex lg:hidden />
        <!-- <nav hidden lg:flex>
          nav
        </nav> -->
      </div>
      <div flex items-center justify-center flex-none col-span-2 gap-2 lg:gap-4>
        <!-- <NuxtLink i-carbon-campsite to="/" /> -->
        <a i-carbon-logo-github text-current href="https://github.com/hdw0504/my-nuxt3" target="_blank" />
        <DarkToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
