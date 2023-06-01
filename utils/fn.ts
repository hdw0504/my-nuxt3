// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from 'buffer'
import iconv from 'iconv-lite'

/**
 * 获取 URL 的 params
 * @param {string} url
 * @returns Object
 */
export function getQueryObject(url: string) {
  const query = url.split('?')[1]
  const res: Record<string, string> = {}

  const querys = query.split('&')
  querys.forEach((query) => {
    const [key, value] = query.split('=')
    // res[key] = decodeURIComponent(value)
    res[key] = value // 当然如果有中文/Unicode字符可以在这里用URIencode方法转码一下
  })

  return res
}

export function queryString(obj: Record<string, any>) {
  return Object.entries(obj).map(([k, v]) => `${k}=${v}`).join('&')
}

/**
   * gbk -> utf-8
   * @param {Response} stream fetch Response
   * @returns Object
   */
export function gbk2utf8(stream: any) {
  return new Promise<string>((resolve) => {
    const chunks: any[] = []
    stream.on('data', (chunk: any) => {
      chunks.push(chunk)
    })
    stream.on('end', () => {
      const decodedBody = iconv.decode(Buffer.concat(chunks), 'gbk')
      try {
        resolve(JSON.parse(decodedBody))
      }
      catch (error) {
        resolve('')
      }
    })
  })
}
