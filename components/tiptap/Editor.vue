<script setup lang="ts">
import { EditorContent } from '@tiptap/vue-3'

interface Props {
  editorClass?: string
}

withDefaults(defineProps<Props>(), {
  editorClass: 'min-h-30vh',
})

const emit = defineEmits<{
  (e: 'submit', text: string): void
}>()

const content = ref<string>('')
const placeholder = ref<string>('请输入内容')
const { editor } = useTiptap({
  content,
  placeholder,
  autofocus: true,
  onSubmit: () => {
    console.log('ctrl + enter', content)
    publish()
  },
  onFocus() {
    console.log('Editor focus', content)
  },
  onPaste(event) {
    console.log('onPaste', event)
  },
})

function insertEmoji(name: string) {
  editor.value?.chain().focus().insertEmoji(name).run()
}

function insertLink(linkStr: string) {
  editor.value?.commands.insertContent(linkStr)
}

function publish() {
  emit('submit', content.value)
}
</script>

<template>
  <div>
    <EditorContent :class="editorClass" :editor="editor" />

    <div flex justify-between items-center mt-2>
      <div flex items-center gap-2>
        <TiptapEmojiPicker @select="insertEmoji" />
        <TiptapLinkInput @select="insertLink" />
      </div>

      <div>
        <el-button type="warning" @click="publish">
          发布
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
