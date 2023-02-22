<script setup lang="ts">
import type { ComponentProp } from '~~/types'

// const tabs: Tab[] = [
const tabs: ComponentProp<'Tab', 'tabs'> = [
  { label: 'title1', value: 1, slotKey: 't1' },
  { label: 'title2', value: 2, slotKey: 't2' },
]
// const type: ComponentPropsMap<'Tab', 'modelValue'> = {
//   modelValue: '',
// }
const curTab = ref(1)
</script>

<template>
  <div>
    <Tab v-model="curTab" :tabs="tabs">
      <template #t1>
        <div>here is t1</div>
      </template>
      <template #t2>
        <div>here is t2</div>
      </template>
    </Tab>
  </div>
</template>

<style scoped>

</style>
