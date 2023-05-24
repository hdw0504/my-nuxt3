<script setup lang="ts">
import type { Picker } from 'emoji-mart'

const emit = defineEmits<{
  (e: 'select', code: string): void
}>()

const el = ref<HTMLElement>()
let picker = ref<Picker>()
const colorMode = useColorMode()
async function openEmojiPicker() {
  if (picker.value) {
    picker.value.update({
      theme: colorMode.value,
    })
  }
  else {
    const promise = import('@emoji-mart/data/sets/14/twitter.json').then(r => r.default)
    const { Picker } = await import('emoji-mart')
    picker.value = new Picker({
      searchPosition: 'none',
      data: () => promise,
      onEmojiSelect({ native, src, alt, name }: any) {
        emit('select', native)
      },
      set: 'twitter',
      theme: colorMode.value,
    })
  }
  // TODO: custom picker
  el.value?.appendChild(picker as any as HTMLElement)
}

function hideEmojiPicker() {
  if (picker)
    el.value?.removeChild(picker as any as HTMLElement)
}
</script>

<template>
  <el-popover :width="376" trigger="click" @show="openEmojiPicker" @hide="hideEmojiPicker">
    <template #reference>
      <div cursor-pointer i-mdi:emoticon-outline />
    </template>
    <template #default>
      <div ref="el" />
    </template>
  </el-popover>
</template>

<style scoped>

</style>
