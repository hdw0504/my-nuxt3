<script setup lang="ts">
const router = useRouter()
const { y } = useWindowScroll()

const options = [
  {
    label: 'feature',
    url: '/feature',
  },
]
function handleSelect(key: string) {
  // ElMessage.info(String(key))
  router.push({ path: '/feature' })
}
</script>

<template>
  <header
    sticky top-0 z-10
    w-full
    b-gray-200 dark:b-gray-700 transition-all-400
    :class="[$attrs.class, y === 0 ? 'b-none h-30' : 'b-b h-[var(--header-height)]']"
  >
    <div mx-auto w-full max-w-7xl grid h-full grid-cols-12 lg:gap-8>
      <div flex items-center justify-center flex-none col-span-2>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" lg:hidden>
            <i-carbon-text-align-justify />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in options" :key="item.label" @click="handleSelect(item.url)">
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <Logo hidden lg:flex />
      </div>
      <div flex items-center justify-center flex-1 col-span-8>
        <Logo flex lg:hidden />
        <!-- <nav hidden lg:flex>
          nav
        </nav> -->
      </div>
      <div flex items-center justify-center flex-none col-span-2 gap-2 lg:gap-4>
        <a i-carbon-logo-github text-current href="https://github.com/hdw0504/my-nuxt3" target="_blank" aria-label="github" />
        <DarkToggle />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header{
    backdrop-filter: saturate(50%) blur(.3em);
}
</style>
