<template>
  <template v-if="value && value.length > 0">
    <Swiper
      v-bind="$attrs"
      :modules="modules"
      :loop="false"
      :autoplay="autoplay"
      :slides-per-view="'auto'"
      :space-between="12"
      @swiper="setControlledSwiper"
      @slide-change="slideChange"
      @destroy="destroySwiper"
    >
      <!-- w="auto!" -->
      <SwiperSlide
        v-for="(item, index) in value"
        :key="index"
        :class="{ 'w-auto!': slideAutoWidth }"
      >
        <template v-if="isVideo(item)">
          <VideoPlayerImg
            v-if="!videoAutoPlay"
            :value="{ poster: item.poster, mp4: item.value }"
            :img-alt="item.name"
          >
          </VideoPlayerImg>

          <template v-else-if="currentIndex === index">
            <VideoPlayer
              ref="videoRef"
              class="rd-10px w-full h-full"
              muted
              preload="auto"
              autoplay
              :poster="item.poster"
              :src="item.value"
              :sources="[{ src: item.value, type: 'video/mp4' }]"
              @playing="handleVideoPlaying"
              @ended="handleVideoEnded"
            />
            <!-- <iframe
              v-if="isYoutubeLink(item.value)"
              ref="iframeRef"
              class="rd-10px w-full h-full"
              :src="item.value + '?autoplay=1&controls=0'"
              mute
              frameborder="0"
              allow="autoplay; encrypted-media"
              @onYouTubeIframeAPIReady="test"
            ></iframe> -->
            <!-- <YoutubePlayer v-if="isYoutubeLink(item.value)" :src="item.value" />
            <video
              v-else-if="!isYoutubeLink(item.value)"
              ref="videoRef"
              class="rd-10px w-full h-full"
              muted
              preload="auto"
              autoplay
              :src="item.value"
              @playing="handleVideoPlaying"
              @ended="handleVideoEnded"
            /> -->
          </template>

          <!-- <VideoPlayer
            v-else
            rd-10px
            :volume="0.5"
            fill
            autoplay="muted"
            :src="item.value"
            @onMounted="switchAutoPlay(false)"
            @ended="switchAutoPlay(true)"
          /> -->
        </template>

        <template v-else>
          <div
            class="w-auto h-full relative text-center"
            :class="{ 'cursor-pointer': item.triggerLink }"
            @click="triggerClick(item)"
          >
            <NuxtImg
              loading="lazy"
              class="img-h-resize rd-2.5"
              :src="item.value"
              :alt="item.name"
            />
            <span
              v-if="showName"
              class="absolute left-4 bottom-3 text-4"
              color="#fff"
            >
              {{ item.name }}
            </span>
          </div>
        </template>
      </SwiperSlide>
    </Swiper>

    <div
      v-if="pagination"
      class="my-pagination mt-3.5 flex justify-center gap-3"
    >
      <div
        v-for="(_, index) in value"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="switchCurrentIndex(index)"
      ></div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { Swiper as TSwiper } from 'swiper/types'


interface SwiperValue {
  /** 游戏名称用于图片alt */
  name: string
  value: string
  poster?: string
  /** 1视频 0图片 */
  type: 1 | 0
  /** 触发链接 */
  triggerLink?: string
}

interface Props {
  value: SwiperValue[]
  showName?: boolean
  pagination?: boolean
  autoplay?: boolean
  videoAutoPlay?: boolean
  slideAutoWidth?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  showName: false,
  pagination: false,
  autoplay: false,
  videoAutoPlay: false,
  slideAutoWidth: false,
})

const modules = [SwiperAutoplay, SwiperController]
const autoplay = props.autoplay
  ? {
      // delay: 1000,
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    }
  : props.autoplay

// 获取swiper实例
const controlledSwiper = ref<TSwiper>()
function setControlledSwiper(swiper: TSwiper) {
  controlledSwiper.value = swiper
}

function isVideo(item: SwiperValue) {
  return item?.type === 1 // 1视频 0图片
}
/**
 * 索引处理
 */
const activeIndex = ref(0)
const realIndex = ref(0)
// 当从别的页面回到首页的时候会发现activeIndex和realIndex都是1 导致绑定异常
const currentIndex = computed(
  // realIndex.value === activeIndex.value ? 0 : realIndex.value
  () => realIndex.value // 新版swiper又没问题了
)
function slideChange(e: TSwiper) {
  activeIndex.value = e.activeIndex
  realIndex.value = e.realIndex
}

function switchAutoPlay(status: boolean) {
  const autoplay = controlledSwiper.value?.autoplay
  // controlledSwiper.value?.autoplay.run()
  nextTick(() => {
    if (!autoplay) return
    status ? autoplay.start() : autoplay.stop()
  })
  // console.log(status, autoplay)
}

// 手动切换轮播索引
function switchCurrentIndex(inx: number) {
  controlledSwiper.value?.slideToLoop(inx)
  // 如果轮播暂停了需要继续启动
  if (!controlledSwiper.value?.autoplay.running) {
    switchAutoPlay(true)
  }
}

function destroySwiper(_swiper?: TSwiper) {}

defineExpose({
  activeIndex,
  realIndex,
  currentIndex,
  switchAutoPlay,
  switchCurrentIndex,
  swiper: controlledSwiper,
})

/**
 * 视频播放处理
 */
const videoRef = ref<HTMLVideoElement[]>()
const iframeRef = ref()
// 根据索引 判断当前轮播的是否视频
watch(
  activeIndex,
  (inx) => {
    console.log(inx, iframeRef, videoRef)
  },
  { immediate: false }
)

function handleVideoPlaying(_e: Event) {
  switchAutoPlay(false)
}

function handleVideoEnded(_e: Event) {
  switchAutoPlay(true)
  controlledSwiper.value?.slideNext()
}

function triggerClick(item: SwiperValue) {
  if (!item.triggerLink) return
  window.open(item.triggerLink, '_blank')
}

onMounted(() => {
  nextTick(() => {
    // 特殊处理第一个就是视频的情况
    if (isVideo(props.value[0]) && props.autoplay) {
      switchAutoPlay(false)
    }
  })
})
</script>

<style lang="scss" scoped>
.swiper {
  --at-apply: w-full h-full;
}

.swiper-slide {
  --at-apply: flex text-4.5 justify-center items-center color-#000;

  img {
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  }
}

.my-pagination>div {
  --at-apply: w-20 h-1.5 rd-10 bg-#FFFFFF80 dark:bg-#00000080 cursor-pointer;

  &.active {
    --at-apply: bg-#FFFFFF;
  }
}
</style>
