<script setup lang="ts">
const editorText = ref('')
function handleEditorText(text: string) {
  editorText.value = text
}
</script>

<template>
  <div text-initial>
    <div>
      <div flex justify-center mb-12>
        <span text-3rem mr-2 font-bold>Tiptap Editor</span>
        <nuxt-link href="https://tiptap.dev/" target="_blank" i-ep-link />
      </div>
    </div>

    <div flex flex-col justify-center items-center>
      <tiptap-editor class="editor" editor-class="min-h-20vh max-h-30vh of-auto" @submit="handleEditorText" />

      <template v-if="editorText">
        <div w-1200px b rd-4 px-4 py-2 mt-4 lh-28px>
          <div>output:</div>
          <div v-html="editorText" />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor{
  --at-apply: w-50vw b rd-4 px-4 py-2;
}
</style>
