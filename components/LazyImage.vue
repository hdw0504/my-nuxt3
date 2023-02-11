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
  width,
  height,
} = props

const { isLoading } = useImage({ src })
const propWidth = computed(() => `${props.width}px`)
const propHeight = computed(() => `${props.height}px`)
</script>

<template>
  <div w-full>
    <el-skeleton :loading="isLoading" variant="image" :rows="1" animated>
      <template #template>
        <el-skeleton-item :class="$attrs.class" variant="image" />
      </template>
      <template #default>
        <img :class="$attrs.class" :width="width" :height="height" :src="src">
      </template>
    </el-skeleton>
  </div>
</template>

<style lang="scss" scoped>
.el-skeleton, .el-skeleton__item{
  width: v-bind(propWidth);
  height: v-bind(propHeight);
}
</style>
