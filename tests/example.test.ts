import { add } from '@/composables'

it('test add', () => {
  expect(add(ref(1), ref(4))).toMatchInlineSnapshot('5')
})
