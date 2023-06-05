interface Sku {
  skuId: string
  propPath: string
}

export interface Pid {
  pid: string
  name: string
  values: Vid[]
}

export interface Vid {
  vid: string
  name: string
  image: string
}

interface SkuBase {
  skus: Sku[]
  props: Pid[]
}

interface GoodInfo {
  itemId: string
  title: string
  images: string[]
  [key: string]: any
}

export interface GoodDetail {
  item?: GoodInfo
  skuBase?: SkuBase
  [key: string]: any
}

export type SkuMatcher = [Pid, Vid]

export interface CartItem {
  info: GoodInfo
  matcher: SkuMatcher[]
  num: number
  sku: string
}
