<script setup lang="ts">
import { useImage } from '@vueuse/core'

interface Props {
  src: string
  width: number
  height: number
  mode?: 'fill' | 'contain' // contain 自适应等比缩放
}
// 因为基础样式有宽度和高度限制，需要加 important 去提高优先级
const props = withDefaults(defineProps<Props>(), {
  mode: 'contain',
})

defineOptions({
  inheritAttrs: false,
})

const {
  src,
  mode,
  width: propWidth,
  height: propHeight,
} = props

const heightPercent = `${Number(propHeight) / Number(propWidth) * 100}%`
const { isLoading } = useImage({ src })
</script>

<template>
  <div w-full>
    <el-skeleton
      :loading="isLoading" variant="image" :rows="1" animated :style="{
        width: `${width}px`,
        height: `${height}px`,
      }"
    >
      <template #template>
        <el-skeleton-item
          v-bind="$attrs" :style="{
            width: `${width}px`,
            height: `${height}px`,
          }" variant="image"
        />
      </template>
      <template #default>
        <img v-bind="$attrs" :width="width" :height="height" :src="src">
      </template>
    </el-skeleton>
  </div>
</template>

<style lang="scss" scoped>
// .el-skeleton{
//   padding-bottom: v-bind(heightPercent);
// }
</style>
