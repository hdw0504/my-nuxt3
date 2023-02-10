import { copy } from 'fs-extra'

const dereference = process.platform === 'win32' ? true : undefined
// 部署到netlify是不同路径
const rootModulePath = process.platform === 'win32' ? '.output' : '.netlify/functions-internal'

;(async () => {
  // 解决 popperjs 默认是 cjs 导致报错问题
  // https://github.com/element-plus/element-plus/issues/10979

  await copy(
    `${rootModulePath}/server/node_modules/@sxzz/popperjs-es`,
    `${rootModulePath}/server/node_modules/@popperjs/core`,
    { dereference },
  )
  console.log('finish cover @popperjs/core from @sxzz/popperjs-es ...')

  // 因为那边需要index.js ...
  await copy(
    'node_modules/@popperjs/core/dist/index.js',
    `${rootModulePath}/server/node_modules/@popperjs/core/dist/index.js`,
    { dereference },
  )
  console.log('finish cover index.js ...')
})()
