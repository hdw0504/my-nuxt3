interface Sku {
  skuId: string
  propPath: string
}

interface Pid {
  pid: string
  name: string
  values: Vid[]
}

interface Vid {
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
