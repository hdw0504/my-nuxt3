import { add } from '@/composables/utils'

// it('test', () => {
//   expect(filterRef([1, 2, 3, 4], a => a !== 1)).toMatchInlineSnapshot('"foobar"')
// })

it('test', () => {
  expect(add(ref(1), ref(4))).toMatchInlineSnapshot('5')
})
