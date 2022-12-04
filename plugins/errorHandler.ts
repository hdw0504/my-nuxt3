// 全局vue错误提示
export default defineNuxtPlugin((nuxtApp) => {
  // when page throw createError() will come here
  nuxtApp.hook('vue:error', (error: any) => {
    console.error('vue:error', error.message)

    if (process.client) {
      const errorMap: { [key: string]: string } = {
        InternalError: 'Javascript引擎内部错误',
        ReferenceError: '未找到对象',
        TypeError: '使用了错误的类型或对象',
        RangeError: '使用内置对象时，参数超范围',
        SyntaxError: '语法错误',
        EvalError: '错误的使用了Eval',
        URIError: 'URI错误',
      }
      const errorName = errorMap[error.name] || '未知错误'
      ElNotification({
        title: errorName,
        message: error,
        type: 'error',
        duration: 3000,
      })
    }
  })

  nuxtApp.hook('app:error', (...args) => {
    console.error('app:error', args)
    // if (process.client) {
    //   console.log(..._args)
    // }
  })

  nuxtApp.vueApp.config.errorHandler = (...args) => {
    console.error('global error handler', args)

    // 过滤 HTTP 请求错误
    // if (error.status || error.status === 0)
    //   return
  }
})

