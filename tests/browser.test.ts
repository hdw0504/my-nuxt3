import { createPage, isDev, setup } from '@nuxt/test-utils-edge'

describe('test browser', async () => {
  await setup({
    // browser: true,
  })

  it('Render page', async () => {
    const page = await createPage('/')
    const html = await page.innerHTML('body')
    expect(html).toMatch('[Default Layout]')
  })

  if (isDev()) {
    it('[dev] ensure vite client script is added', async () => {
      const page = await createPage('/')
      const html = await page.innerHTML('body')
      expect(html).toMatch('/_nuxt/@vite/client"')
    })
  }
})
