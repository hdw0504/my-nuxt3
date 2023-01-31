import type { Ref } from 'vue'
import { Plugin } from 'prosemirror-state'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
// import HardBreak from '@tiptap/extension-hard-break'
// https://tiptap.dev/api/nodes/mention
// import Mention from '@tiptap/extension-mention'
import { Extension, useEditor } from '@tiptap/vue-3'
import { TiptapPluginEmoji } from './tiptap/emoji'

export interface UseTiptapOptions {
  content: Ref<string>
  placeholder: Ref<string | undefined>
  onSubmit: () => void
  onFocus: () => void
  onPaste: (event: ClipboardEvent) => void
  autofocus: boolean
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    emoji: {
      /**
       * Insert a emoji.
       */
      insertEmoji: (native: string) => ReturnType
    }
  }
}

export function useTiptap(options: UseTiptapOptions) {
  const {
    autofocus,
    content,
    placeholder,
  } = options

  const editor = useEditor({
    content: content.value,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: () => placeholder.value!,
      }),
      // HardBreak, // 强制换行
      TiptapPluginEmoji, // emoji表情
      // mention 是 行内输入的时候特殊字符
      // 艾特玩家 @
      // Mention.configure({
      //   suggestion: TiptapMentionSuggestion,
      // }),
      // 标签 #
      // Mention
      //   .extend({ name: 'hashtag' })
      //   .configure({
      //     suggestion: TiptapHashtagSuggestion,
      //   }),
      // emoji :
      // Mention
      //   .extend({ name: 'emoji' })
      //   .configure({
      //     suggestion: TiptapEmojiSuggestion,
      //   }),

      // 代码块 先不要
      // TiptapPluginCodeBlockShiki,
      Extension.create({
        name: 'api',
        addKeyboardShortcuts() {
          return {
            // 快捷键 ctrl + enter 提交
            'Mod-Enter': () => {
              options.onSubmit()
              return true
            },
          }
        },
        onFocus() {
          options.onFocus()
        },
        addProseMirrorPlugins() {
          return [
            new Plugin({
              props: {
                handleDOMEvents: {
                  paste(view, event) {
                    options.onPaste(event)
                  },
                },
              },
            }),
          ]
        },
      }),
    ],
    onUpdate({ editor }) {
      content.value = editor.getHTML()
    },
    editorProps: {
      attributes: {
        class: 'content-editor content-rich',
      },
    },
    autofocus,
    editable: true,
  })

  watch(content, (value) => {
    if (editor.value?.getHTML() === value)
      return
    editor.value?.commands.setContent(value || '', false)
  })
  watch(placeholder, () => {
    editor.value?.view.dispatch(editor.value?.state.tr)
  })

  return {
    editor,
  }
}
