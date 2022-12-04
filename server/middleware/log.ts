export default defineEventHandler((event) => {
  // eslint-disable-next-line no-console
  console.log(`New request: ${event.node.req.url}`)
})
