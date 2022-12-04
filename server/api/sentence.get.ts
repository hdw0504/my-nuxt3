interface Res {
  'id': number
  'uuid': string
  'hitokoto': string
  'type': string
  'from': string
  'from_who': string
  'creator': string
  'creator_uid': number
  'reviewer': number
  'commit_from': string
  'created_at': string
  'length': number
}

// type pickRes<T> = [keyof T] | undefined
/**
 * 每日一句 api https://v1.hitokoto.cn/
 * query:
 *  type : 'text' | 'json'
 */
export default defineEventHandler(async (event) => {
  const { type = 'text' } = getQuery(event)

  try {
    const data = await $fetch<Res>('https://v1.hitokoto.cn/')

    return type === 'text' ? data.hitokoto : data
  }
  catch (error) {
    // throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
    // 错误兜底 防止页面报错 在这里可以添加日志之类的操作
    return ''
  }
})
