<script setup lang="ts">
const svgs = [
  {
    width: '24px',
    height: '24px',
    src: 'https://cn.vitest.dev/logo.svg',
    href: 'https://cn.vitest.dev/',
  },
  {
    width: '24px',
    height: '24px',
    src: 'https://d33wubrfki0l68.cloudfront.net/2f6479d73bc25170dc532dd42e059166573bf478/61057/favicon.svg',
    href: 'https://vueuse.org/',
  },
  {
    width: '24px',
    height: '24px',
    src: 'https://www.naiveui.com/assets/naivelogo.93278402.svg',
    href: 'https://www.naiveui.com/zh-CN/dark',
  },
  {
    width: '24px',
    height: '30px',
    src: 'https://pinia.vuejs.org/logo.svg',
    href: 'https://pinia.vuejs.org/zh/index.html',
  },

]
</script>

<template>
  <div>
    <Suspense>
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
      <template #default>
        <div>
          <div mx-auto w-full flex flex-wrap gap-2em>
            <div w-full lg:flex-1 lg:px-8 px-4 flex flex-col justify-center gap-2em lg:gap-4em>
              <h1 m0>
                My Nuxt3 Practice
                <span text-4xl animation class="wave">👋🏻</span>
              </h1>
              <h2 m0>
                use with
                <a v-for="(svg, i) in svgs" :key="i" :href="svg.href" target="_blank">
                  <img v-bind="svg">
                </a>
              </h2>
            </div>
            <div w-full px-4 lg="max-w-46% px-8">
              <img img-resize class="shadow-2xl rd-4" width="536px" height="354px" src="https://picsum.photos/536/354" alt="">
            </div>
          </div>
          <!-- <InputEntry /> -->
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
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
</style>
