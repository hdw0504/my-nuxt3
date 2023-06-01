<script setup lang="ts">
import type { WritableComputedRef } from 'vue'

// when open keepalive that offsetTop is incorrect
// definePageMeta({
//   keepalive: false,
// })

const router = useRouter()

const route = useRoute()

const features = [
  {
    name: 'Nuxt',
    icon: 'nuxt',
    href: 'https://nuxt.com/',
    img: '/image/website/nuxt-light.png',
    darkImg: '/image/website/nuxt-dark.png',
  },
  {
    name: 'Vue',
    icon: 'vuejs',
    href: 'https://vuejs.org/',
    img: '/image/website/vue-light.png',
    darkImg: '/image/website/vue-dark.png',
  },
  {
    name: 'Element Plus',
    icon: 'element-plus',
    href: 'https://element-plus.org/',
    img: '/image/website/el-plus-light.png',
    darkImg: '/image/website/el-plus-dark.png',
  },
  {
    name: 'Vueuse',
    icon: 'vueuse',
    href: 'https://vueuse.org/',
    img: '/image/website/vueuse-light.png',
    darkImg: '/image/website/vueuse-dark.png',
  },
  {
    name: 'Unocss',
    icon: 'unocss',
    href: 'https://uno.antfu.me/',
    img: '/image/website/unocss-light.png',
    darkImg: '/image/website/unocss-dark.png',
  },
  {
    name: 'Pinia',
    icon: 'pinia',
    href: 'https://pinia.vuejs.org/',
    img: '/image/website/pinia-light.png',
    darkImg: '/image/website/pinia-dark.png',
  },
  {
    name: 'Vite',
    icon: 'vite',
    href: 'https://vitejs.dev/',
    img: '/image/website/vite-light.png',
    darkImg: '/image/website/vite-dark.png',
  },
]

function openWebsite(url: string) {
  window.open(url, '_blank')
}

const titleRefs = reactive<Record<string, HTMLElement>>({})
function setItemRef(name: string) {
  return (el: any) => {
    titleRefs[name] = el
  }
}

const { y } = process.client
  ? useScroll(window, { behavior: 'smooth' })
  : { y: ref(0) as WritableComputedRef<number> }

onMounted(() => {
  const titleName = route.query.name as string
  if (!titleName)
    return
  // scroll to title
  setTimeout(() => {
    // h-30 ==> 7.5rem ==> 120px
    // gap-12 ==> 3em ==> 48px
    y.value = titleRefs[titleName].offsetTop - 120 - 48 / 2
    // router page animate need 400ms
  }, 800)
})
</script>

<template>
  <div flex="~ col" gap-12>
    <span text-3rem mb-12 font-bold>🔥 Features</span>
    <div v-for="(item, inx) in features" :key="item.name" flex="~ col lg:row" gap-12 :class="{ 'lg:flex-row-reverse': inx % 2 }">
      <div flex-1>
        <div flex justify-center items-center gap-2 text-2xl font-bold svg="w-1.2em h-1.2em">
          <NuxtIcon class="inline-block mr-1" :name="item.icon" filled />
          <span :id="item.name" :ref="setItemRef(item.name)">{{ item.name }}</span>
        </div>
      </div>
      <div w-full lg="flex-1">
        <div m-x-auto max-w-536px>
          <NuxtLink :href="item.href" target="_blank">
            <NuxtImg img-resize shadow-2xl cursor-pointer block dark:hidden width="536" height="536" loading="lazy" :src="item.img" alt="website shortcut" />
            <NuxtImg img-resize shadow-2xl cursor-pointer hidden dark:block width="536" height="536" loading="lazy" :src="item.darkImg" alt="website shortcut" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div>
      <el-button @click="router.back()">
        back
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
