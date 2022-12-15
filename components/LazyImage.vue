<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
interface Props {
  src: string
  width: string | number
  height: string | number
  mode?: 'fill' | 'contain' // contain 自适应等比缩放
}
// 因为基础样式有宽度和高度限制，需要加 important 去提高优先级
const props = withDefaults(defineProps<Props>(), {
  mode: 'contain',
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
    <el-skeleton :loading="isLoading" relative variant="image" :rows="1" animated>
      <template #template>
        <el-skeleton-item v-bind="$attrs" absolute top-0 left-0 w-full h-full box-border variant="image" />
      </template>
      <template #default>
        <img v-bind="$attrs" :width="width" :height="height" :src="src">
      </template>
    </el-skeleton>
  </div>
</template>

<style lang="scss" scoped>
.el-skeleton{
  padding-bottom: v-bind(heightPercent);
}
</style>
