<script setup lang="ts">
import type { GoodDetail, Pid, SkuMatcher, Vid } from '~/types/tb'

defineProps<{
  value: SkuMatcher[]
  skuBase: GoodDetail['skuBase']
}>()

defineEmits<{
  (e: 'change', pid: Pid, vid: Vid, index: number): void
}>()
</script>

<template>
  <div>
    <div v-for="(group, i) in skuBase?.props" :key="group.pid" class="mb-2">
      <p class="lh-6 font-bold text-left">
        {{ group.name }}
      </p>
      <div class="flex flex-wrap gap-2.5px">
        <p
          v-for="item in group.values" :key="item.vid" class="tag"
          :class="{ active: value[i]?.[1]?.vid === item.vid }"
          @click="$emit('change', group, item, i)"
        >
          {{ item.name }}
        </p>
      </div>
    </div>
    <!-- {{ goodInfo.skuBase.skus }} -->
  </div>
</template>

<style lang="scss" scoped>
.tag{
  --at-apply: py-1.5 px-4 rd-6 b b-solid cursor-pointer;
  &.active{
    --at-apply: text-#fff bg-[var(--el-color-warning)]
  }
}
</style>
