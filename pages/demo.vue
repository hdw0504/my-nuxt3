<script setup lang="ts">
import type { ComponentProp } from '~~/types'

const tabs: ComponentProp<'Tab', 'tabs'> = [
  { title: 'title1', slotKey: 't1' },
  { title: 'title2', slotKey: 't2' },
]
const curTab = ref('t1')
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
