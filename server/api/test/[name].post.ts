// file name can be suffixed with .get, .post, .put, .delete
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const body = await readBody(event)

  return {
    name: event.context.params.name,
    gender: `gender is ${query.gender}`,
    age: `tom age is ${body.age}`,
    msg: 'Test post methods',
  }
})
