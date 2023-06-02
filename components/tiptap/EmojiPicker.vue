<script setup lang="ts">
import type { Picker } from 'emoji-mart'

const emit = defineEmits<{
  (e: 'select', code: string): void
}>()

const el = ref<HTMLElement>()
const picker = ref<Picker>()
const colorMode = useColorMode()
async function openEmojiPicker() {
  const [Picker, dataPromise] = await Promise.all([
    import('emoji-mart').then(({ Picker }) => Picker),
    import('@emoji-mart/data/sets/14/twitter.json')
      .then((r: any) => r.default)
      .catch(() => {}),
  ])

  picker.value = new Picker({
    searchPosition: 'none',
    data: () => dataPromise,
    onEmojiSelect({ native }: any) {
      emit('select', native)
    },
    set: 'twitter',
    theme: colorMode.value,
  })
  // }
  await nextTick()
  // TODO: custom picker
  el.value?.appendChild(picker.value as any as HTMLElement)
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
