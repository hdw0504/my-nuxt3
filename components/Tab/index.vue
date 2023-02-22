<script setup lang="ts">
interface Tab {
  label: string
  value: string | number
  slotKey: string
}

const props = defineProps<{
  modelValue: Tab['value']
  tabs: Tab[]
}>()

defineEmits<{
  (e: 'update:modelValue', v: Tab['value']): void
}>()

const curSlotName = computed(() => props.tabs.find(tab => tab.value === props.modelValue)?.slotKey)
</script>

<template>
  <div>
    <div class="title">
      <p v-for="tab in tabs" :key="tab.value" @click="$emit('update:modelValue', tab.value)">
        {{ tab.label }}
      </p>
    </div>

    <div class="content">
      <slot :name="curSlotName" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.title{
  --at-apply: flex justify-center gap-10 mb-4 cursor-pointer;
}
</style>
