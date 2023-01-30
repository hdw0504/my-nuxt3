<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import type { Picker } from 'emoji-mart'
import StarterKit from '@tiptap/starter-kit'

const emit = defineEmits<{
  (e: 'select', code: string): void
}>()

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit,
  ],
})

const el = $ref<HTMLElement>()
let picker = $ref<Picker>()
const colorMode = useColorMode()
async function openEmojiPicker() {
  if (picker) {
    picker.update({
      theme: colorMode.value,
    })
  }
  else {
    const promise = import('@emoji-mart/data/sets/14/twitter.json').then(r => r.default)
    const { Picker } = await import('emoji-mart')
    picker = new Picker({
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
  el?.appendChild(picker as any as HTMLElement)
}

function hideEmojiPicker() {
  if (picker)
    el?.removeChild(picker as any as HTMLElement)
}
</script>

<template>
  <div>
    <EditorContent :editor="editor" />
    <el-popover :width="376" trigger="click" @show="openEmojiPicker" @hide="hideEmojiPicker">
      <template #reference>
        <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" />
      </template>
      <template #default>
        <div ref="el" />
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>

</style>
