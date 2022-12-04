// api url need whit /api
// await useFetch('/api/hello')

export default defineEventHandler(() => {
//   throw createError({
//     statusCode: 404,
//     statusMessage: 'Page Not Found',
//   })
  return {
    api: 'hello',
  }
})
