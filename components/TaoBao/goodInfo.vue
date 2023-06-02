<script setup lang="ts">
import type { GoodDetail } from '~/types/tb'

withDefaults(defineProps<{
  value: GoodDetail['item']
  imgClass?: string
  infoClass?: string
}>(), {
  imgClass: 'w-30 h-30 rd-4',
  infoClass: 'md:max-w-40% lh-6 text-left',
})
</script>

<template>
  <div>
    <NuxtImg v-if="value?.images.length" :class="imgClass" :src="`https:${value.images[0]}`" />
    <p :class="infoClass">
      {{ value?.title }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>
