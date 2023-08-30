import type { DefalutResult, Note, XhsImage, XhsResult } from '~/types/xhs'
import { pick } from '~/utils/object'

const defaltLinkMatcher = /https\:\/\/www.xiaohongshu.com\/explore\/\S{24}/
/** 判断是否小红书正常链接 */
function isXhsDefaultLink(url: string) {
  return defaltLinkMatcher.test(url)
}

/** 获取小红书里面的短链 */
function pickXhsDefaultLink(url: string) {
  const matcher = url.match(defaltLinkMatcher)
  return matcher ? matcher[0].trim() : ''
}

const shortLinkMatcher = /xhslink.com\/\S{6}/
/** 判断是否短链 */
function isXhsShortLink(url: string) {
  return shortLinkMatcher.test(url)
}

/** 获取小红书里面的短链 */
function pickXhsShortLink(url: string) {
  const matcher = url.match(shortLinkMatcher)
  return matcher ? `http://${matcher[0].trim()}` : ''
}

/** 根据短链获取长链 */
async function getLongLink(url: string) {
  const { longurl = '' } = await $fetch<{ longurl: string }>('http://api.dwzjh.com/api/reduction', {
    params: { url },
  })

  // 'https://www.xiaohongshu.com/discovery/item/647c6c65000000001303c648?app_platform=ios&app_version=7.84&share_from_user_hidden=true&type=normal&xhsshare=CopyLink&appuid=59c2a14744363b5fba897980&apptime=1685971373'
  return longurl
}

/** 根据长链获取id */
function matchIdFromUrl(url: string) {
  const [_, id] = url.match(/item\/(.+)\?/) ?? ['', '']
  return id
}

/** 根据id获取详情链接 */
function getDetailLink(id: string) {
  return `https://www.xiaohongshu.com/explore/${id}`
}

/** 请求详情地址 */
function fetchDetail(utl: string) {
  const headers = {
    Cookie: 'webBuild=2.11.4; xsecappid=xhs-pc-web; a1=188dcf74921awzcv1iexkk7t1uicq1sf8sxuwtgy750000399626; webId=465307e31c5a75159cbede2b1fce2391; gid=yYYfSiW40fYdyYYfSiW4jM9kJy0EuShy3dCTCvWTW9y73728SAyMiE888qjjKJK8WSJDi0qS; gid.sign=7BhnF3qvGPcTjTTR/tHhuKwkYyQ=; web_session=030037a3a1f992378ae8aaebea234a11891d74; websectiga=f3d8eaee8a8c63016320d94a1bd00562d516a5417bc43a032a80cbf70f07d5c0; sec_poison_id=1877a643-c70e-4abf-aaeb-e632bd16a6e6',
  }

  return $fetch<string>(utl, {
    headers,
  })
}

/** 获取文章内容 */
async function getNoteFromLink(detaiUrl: string) {
  let matcher: RegExpMatchArray | null = null

  while (!matcher) {
    const data = await fetchDetail(detaiUrl)
    // 防止获取不到内容
    matcher = data.match(/window\.__INITIAL_STATE__=(.*?)(?=<\/script>)/gi)
  }

  // 匹配获取内容并转成json
  const info = matcher![0].split('=')
  const detail = info[1].replaceAll('undefined', '""')
  return JSON.parse(detail) as DefalutResult
}

/** 参考第三方爬取内容，转成xhs图片内容 */
function handleImgList(imgList: XhsImage[]) {
  return imgList.map(i => `https://ci.xiaohongshu.com/${i.traceId}?imageView2/2/w/0/format/jpg/v3`)
}

/** 防止被发现原链数据，自己过滤返回内容 */
function handleResult(data?: DefalutResult): XhsResult {
  let user: XhsResult['user'] = {
    avatar: '',
    nickname: '',
  }
  let info: XhsResult['info'] = {
    title: '',
    desc: '',
    imgList: [],
  }

  if (data) {
    const { noteDetailMap = {}, firstNoteId = '' } = data.note
    const curNote = noteDetailMap[firstNoteId]?.note as Note

    if (curNote) {
      user = pick(curNote.user, ['avatar', 'nickname'])
      info = {
        ...pick(curNote, ['title', 'desc']),
        imgList: handleImgList(curNote.imageList),
      }
    }
  }

  return { user, info }
}

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)
  console.log('小红书分享链接：', url)

  let detailLink = ''
  if (isXhsDefaultLink(url)) {
    detailLink = pickXhsDefaultLink(url)
  }
  else if (isXhsShortLink(url)) {
    const shortLink = await pickXhsShortLink(url)
    if (!shortLink)
      return handleResult()
    console.log('短链：', shortLink)

    const lonkLink = await getLongLink(shortLink)
    if (!lonkLink)
      return handleResult()
    console.log('长链：', lonkLink)

    const id = matchIdFromUrl(lonkLink)
    detailLink = getDetailLink(id)
  }

  console.log('详情链接：', detailLink)
  const data = await getNoteFromLink(detailLink)

  return handleResult(data)
})
