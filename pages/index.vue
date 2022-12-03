<script lang="ts" setup>
import IconElPlus from '~icons/icons/element-plus'
import IconVueuse from '~icons/icons/vueuse'
import IconUnocss from '~icons/icons/unocss'
import IconPinia from '~icons/icons/pinia'
import IconVite from '~icons/icons/vite'

const router = useRouter()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const icons = [
  { name: 'Element Plus', icon: IconElPlus },
  { name: 'Vueuse', icon: IconVueuse },
  { name: 'Unocss', icon: IconUnocss },
  { name: 'Pinia', icon: IconPinia },
  { name: 'Vite', icon: IconVite },
]

const projects = [
  {
    name: 'v3-admin',
    repo: 'https://github.com/hdw0504/v3-admin',
    website: 'https://v3-admin.netlify.app/',
    desc: 'An admin template with Vue 3.2 + TypeScript + Pinia + Vite3 + Element-Plus + vueuse + unocss + vitest',
    img: '/image/v3-admin-light.jpg',
    darkImg: '/image/v3-admin-dark.jpg',
  },
  {
    name: 'el-plus-nuxt3',
    repo: 'https://github.com/hdw0504/el-plus-nuxt3',
    website: 'https://element-plus-nuxt3.netlify.app/',
    desc: 'A template with nuxt3 + element-plus',
    img: '/image/ep-nuxt-light.jpg',
    darkImg: '/image/ep-nuxt-dark.jpg',
  },
]
</script>

<template>
  <div>
    <div flex flex-wrap gap-8>
      <div w-full flex flex-col justify-center gap-2em lg="flex-1 gap-4em">
        <p text-8 font-bold>
          My Nuxt3 Practice
          <span text-4xl animation class="wave">👋🏻</span>
        </p>
        <p class="logo" text-4>
          use with
          <span display="block md:inline-block" lg="children:animate-none!" m-t="2 md:none">
            <component :is="item.icon" v-for="item in icons" :key="item.name" @click="router.push({ path: '/feature', query: { name: item.name } })" />
          </span>
        </p>
      </div>
      <div w-full lg="flex-1">
        <div m-x-auto max-w-536px>
          <lazy-image
            img-resize shadow-2xl rd-4
            width="536" height="354"
            src="https://picsum.photos/536/354" alt="picsum photo"
          />
        </div>
      </div>
    </div>
    <!-- project -->
    <div flex flex-wrap gap-8 m-t-30>
      <el-card v-for="project in projects" :key="project.name" w-full lg="flex-1 max-w-2xl">
        <template #header>
          <div flex justify-between>
            <p>{{ project.name }}</p>
            <div>
              <el-link mr-4 :underline="false" :href="project.repo" target="_blank">
                <i-ep-folder text-4 mr-2 />
                <span display="none md:inline">repositorie</span>
              </el-link>
              <el-link :underline="false" :href="project.website" target="_blank">
                <i-ep-monitor text-4 mr-2 />
                <span display="none md:inline">website</span>
              </el-link>
            </div>
          </div>
        </template>
        <div flex="~ col md:row" gap-2>
          <div flex-1 md="max-w-40%" text-left>
            <p m-b-2 font-bold>
              About
            </p>
            <p>{{ project.desc }}</p>
          </div>
          <div flex-1 md="max-w-500px">
            <img
              img-resize
              block dark:hidden
              transition-all-400 hover:shadow-lg
              width="927" height="927" loading="lazy"
              :src="project.img" alt="website shortcut"
            >
            <img
              img-resize
              dark:block hidden
              transition-all-400 hover:shadow-lg
              width="927" height="927" loading="lazy"
              :src="project.darkImg" alt="website shortcut"
            >
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo svg {
  --at-apply: inline text-8 m-r-2 cursor-pointer transition-all-400 hover:scale-130;
  animation-name: scale-animation;
  animation-duration: 5s;
  animation-iteration-count: infinite;

  @for $i from 1 through 4 {
    &:nth-child(#{$i + 1}) {
      animation-delay: $i * 1s;
    }
  }
}

.el-image {
  --at-apply: transition-all-400 hover:shadow-lg;
}

.wave {
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave-animation {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(14deg);
  }

  20% {
    transform: rotate(-8deg);
  }

  30% {
    transform: rotate(14deg);
  }

  40% {
    transform: rotate(-4deg);
  }

  50% {
    transform: rotate(10deg);
  }

  60% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

@keyframes scale-animation {
  0% {
    transform: scale(1);
  }

  10% {
    transform: scale(1.3);
  }

  20% {
    transform: scale(1);
  }
}
</style>
