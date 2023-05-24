<script setup lang="ts">
const editorText = ref('')
function handleEditorText(text: string) {
  editorText.value = text
}

const showHtml = ref(true)
</script>

<template>
  <div text-initial>
    <div>
      <div flex justify-center mb-12>
        <span text-3rem mr-2 font-bold>Tiptap Editor</span>
        <nuxt-link href="https://tiptap.dev/" target="_blank" i-ep-link />
      </div>
    </div>

    <div flex flex-col justify-center items-center text-left>
      <tiptap-editor class="editor" editor-class="min-h-20vh max-h-30vh of-auto" @submit="handleEditorText" />

      <template v-if="editorText">
        <div w-1200px b b-solid rd-4 px-4 py-2 mt-4 lh-28px>
          <div flex justify-between items-center>
            output:
            <el-button type="warning" @click="showHtml = !showHtml">
              switch output
            </el-button>
          </div>
          <div v-if="showHtml" v-html="editorText" />
          <div v-else>
            {{ editorText }}
          </div>
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
