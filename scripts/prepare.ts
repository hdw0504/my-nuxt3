import { copy } from 'fs-extra'
import { emojiPrefix, iconifyEmojiPackage } from '../config/emojis'

const dereference = process.platform === 'win32' ? true : undefined

;(async () => {
  // 下载全部emoji
  await copy(
    `node_modules/${iconifyEmojiPackage}/icons`,
    `public/emojis/${emojiPrefix}`,
    { overwrite: true, dereference },
  )
})()
