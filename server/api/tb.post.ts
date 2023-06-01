import type { GoodDetail } from '~/types/tb'
import { getQueryObject, queryString } from '~/utils/fn'

function handleGoodData(id: string) {
  return {
    id,
    itemNumId: id,
    ut_sk: '1.X/%2Blkz0ZY3gDAC4p3HaGrxrA_21380790_1685602854879.Copy.1',
    sourceType: 'item',
    price: '16.9',
    suid: '4A7F3403-6F2A-40D5-9F27-4241083C3B80',
    shareUniqueId: '21689683303',
    un: 'bd7b0453e3262e781624abb2e574152e',
    share_crt_v: '1',
    un_site: '0',
    spm: 'a2159r.13376460.0.0',
    sp_abtk: 'gray_1_code_simpleios2',
    tbSocialPopKey: 'shareItem',
    sp_tk: 'VG5UQmRwS0pOOG8%3D',
    bc_fl_src: 'share-104959384502395-2-1',
    cpp: '1',
    shareurl: 'true',
    short_name: 'h.UDV1M5Z',
    bxsign: 'scdp159Oisfmn_W5A7kkTi1loiwYMpEmZYk1mFIe2OJAF-GVHvNwhB0f9XOAkyRTC0EPbh2p9cceCtjlpfXIVbca-xfs0LAJaHMEUqbeCRmaeuvz1v0zlqZKsfxRMiSP5ty',
    app: 'weixin',
    _form_: 'miniapp',
    detail_v: '3.1.0',
    pageCode: 'miniAppDetail',
  }
}

function handleParams(id: string) {
  return {
    jsv: '2.6.1',
    appKey: '12574478',
    t: '1685602902298',
    sign: '0bdce515567c25b58f54909449b08a59',
    api: 'mtop.taobao.detail.getdetail',
    v: '6.0',
    ttid: '202012@taobao_h5_9.17.0',
    isSec: '0',
    ecode: '0',
    AntiFlood: 'true',
    AntiCreep: 'true',
    H5Request: 'true',
    param: 'v1',
    data: encodeURIComponent(JSON.stringify(handleGoodData(id))),
  }
}

async function getGoodInfo(goodId: string, Cookie: string) {
  const api = 'https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/'

  const res = await fetch(`${api}?${queryString(handleParams(goodId))}`, {
    method: 'get',
    headers: {
      Cookie,
      'Host': 'h5api.m.taobao.com',
      'Content-Type': 'application/json',
      'Connection': ' keep-alive',
      'Accept': '*/*',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.16(0x18001031) NetType/WIFI Language/zh_CN',
      'Referer': 'https://h5.m.taobao.com/',
      'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  })
  return res.text()
}

async function getIdfromTmallShortLink(shortLink: string) {
  try {
    const html = await $fetch<string>(shortLink)
    const [, url] = html.match(/var url = '(.*?)';/)!
    // console.log('匹配到的参数：', url)
    const { id } = getQueryObject(url)
    console.log('商品ID：', id)
    return id ?? ''
  }
  catch (err) {
    console.log('处理淘宝链接错误：', err)
    return ''
  }
}

export default defineEventHandler(async (event) => {
  const { url, ck } = await readBody(event)
  console.log('短链：', url)

  const id = await getIdfromTmallShortLink(url)
  if (!id)
    return ''

  const res = await getGoodInfo(id, ck)

  const { data } = JSON.parse(res)

  //   console.log(data)
  return data as GoodDetail
})
