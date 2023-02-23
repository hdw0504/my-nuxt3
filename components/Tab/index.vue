<script setup lang="ts">
interface Tab {
  title: string
  slotKey: string
}

defineProps<{
  modelValue: Tab['slotKey']
  tabs: Tab[]
}>()

defineEmits<{
  (e: 'update:modelValue', v: Tab['slotKey']): void
}>()
</script>

<template>
  <div>
    <div class="title">
      <p v-for="tab in tabs" :key="tab.slotKey" @click="$emit('update:modelValue', tab.slotKey)">
        {{ tab.title }}
      </p>
    </div>

    <div class="content">
      <slot :name="modelValue" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.title{
  --at-apply: flex justify-center gap-10 mb-4 cursor-pointer;
}
</style>
