<script setup lang="ts">
import IconNuxt from '~icons/icons/nuxt'
import IconVue from '~icons/icons/vuejs'
import IconElPlus from '~icons/icons/element-plus'
import IconVueuse from '~icons/icons/vueuse'
import IconUnocss from '~icons/icons/unocss'
import IconPinia from '~icons/icons/pinia'
import IconVite from '~icons/icons/vite'

// when open keepalive that offsetTop is incorrect
definePageMeta({
  keepalive: false,
})

const router = useRouter()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const route = useRoute()

const features = [
  {
    name: 'Nuxt',
    icon: IconNuxt,
    href: 'https://nuxt.com/',
    img: '/image/website/nuxt-light.png',
    darkImg: '/image/website/nuxt-dark.png',
  },
  {
    name: 'Vue',
    icon: IconVue,
    href: 'https://vuejs.org/',
    img: '/image/website/vue-light.png',
    darkImg: '/image/website/vue-dark.png',
  },
  {
    name: 'Element Plus',
    icon: IconElPlus,
    href: 'https://element-plus.org/',
    img: '/image/website/el-plus-light.png',
    darkImg: '/image/website/el-plus-dark.png',
  },
  {
    name: 'Vueuse',
    icon: IconVueuse,
    href: 'https://vueuse.org/',
    img: '/image/website/vueuse-light.png',
    darkImg: '/image/website/vueuse-dark.png',
  },
  {
    name: 'Unocss',
    icon: IconUnocss,
    href: 'https://uno.antfu.me/',
    img: '/image/website/unocss-light.png',
    darkImg: '/image/website/unocss-dark.png',
  },
  {
    name: 'Pinia',
    icon: IconPinia,
    href: 'https://pinia.vuejs.org/',
    img: '/image/website/pinia-light.png',
    darkImg: '/image/website/pinia-dark.png',
  },
  {
    name: 'Vite',
    icon: IconVite,
    href: 'https://vitejs.dev/',
    img: '/image/website/vite-light.png',
    darkImg: '/image/website/vite-dark.png',
  },
]

function openWebsite(url: string) {
  window.open(url, '_blank')
}

const boxEl = ref<HTMLElement | null>(null)
const titleRefs = reactive<Record<string, HTMLElement>>({})

function setItemRef(name: string) {
  return (el: any) => {
    titleRefs[name] = el
  }
}

onMounted(() => {
  const titleName = route.query.name as string
  if (!titleName)
    return
  // scroll to title
  setTimeout(() => {
    window.scrollTo({
      // h-30 ==> 7.5rem ==> 120px
      top: titleRefs[titleName].offsetTop - 120 - 30,
      behavior: 'smooth',
    })
    // animate need 400ms
  }, 800)
})
</script>

<template>
  <div ref="boxEl" flex="~ col" gap-12>
    <span text-3rem mb-12>🔥 Features</span>
    <div v-for="(item, inx) in features" :key="item.name" flex="~ col lg:row" gap-12 :class="{ 'lg:flex-row-reverse': inx % 2 }">
      <div flex-1>
        <div flex justify-center items-center gap-2 text-2xl>
          <component :is="item.icon" />
          <span :id="item.name" :ref="setItemRef(item.name)">{{ item.name }}</span>
        </div>
      </div>
      <div w-full lg="flex-1">
        <div m-x-auto max-w-536px>
          <img img-resize shadow-2xl cursor-pointer width="536" height="536" :src="isDark ? item.darkImg : item.img" alt="website shortcut" @click="openWebsite(item.href)">
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

