// @unimport-disabled
import { emojiFilename, emojiPrefix, emojiRegEx } from '@iconify-emoji/twemoji'
import type { EmojiRegexMatch } from '@iconify/utils/lib/emoji/replace/find'
import { getEmojiMatchesInText } from '@iconify/utils/lib/emoji/replace/find'

// Re-export everything from package
export * from '@iconify-emoji/twemoji'

// Package name
export const iconifyEmojiPackage = '@iconify-emoji/twemoji'

export function getEmojiAttributes(input: EmojiRegexMatch | string) {
  const config = useRuntimeConfig()

  const match = typeof input === 'string'
    ? getEmojiMatchesInText(emojiRegEx, input)?.[0]
    : input
  const file = emojiFilename(match)
  const className = `iconify-emoji iconify-emoji--${emojiPrefix}${file.padding ? ' iconify-emoji-padded' : ''}`

  const baseHref = config.public.env === 'development' ? 'https://nuxt3-practice.netlify.app' : ''
  return {
    class: className,
    src: `${baseHref}/emojis/${emojiPrefix}/${file.filename}`,
    alt: match.match,
  }
}
