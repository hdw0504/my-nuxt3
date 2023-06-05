/** 获取小红书里面的短链 */
function pickXhsShortLink(url: string) {
  const matcher = url.match(/[http:\/\/]?xhslink.com\/\S{6}/)
  return matcher ? `${matcher[1] ?? 'http://'}${matcher[0]}` : ''
}

async function handleShortLink(link: string) {
  const data = await $fetch()
}

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)
  console.log('小红书分享链接：', url)

  const shortLink = await pickXhsShortLink(url)
  if (!shortLink)
    return ''
  console.log('短链：', shortLink)

  const data = await handleShortLink(shortLink)
  console.log(data)
  return ''
})
