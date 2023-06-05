<script setup lang="ts">
import { createTbProvide } from '~/components/TaoBao/injection'
import type { GoodDetail, Pid, SkuMatcher, Vid } from '~/types/tb'

// interface CartItem {
//   info: GoodDetail
//   pickSku: SkuMatcher
// }

const { t } = useI18n()

const goodInfo = ref<GoodDetail>({})
function handleDetail(detail: GoodDetail) {
  goodInfo.value = detail
  initSkuConfig()
}

const buyNum = ref<number>(1)
const propList = ref<SkuMatcher[]>([])
const skuDict = reactive<Record<string, string>>({})
function initSkuConfig() {
  // 购买数量
  buyNum.value = 1

  // 初始化匹配的sku内容
  propList.value = Array(goodInfo.value?.skuBase?.props.length ?? 0).fill([])
  console.log('初始化sku ->', propList);

  // sku字典表
  (goodInfo.value?.skuBase?.skus ?? []).forEach(({ skuId, propPath }) => {
    skuDict[propPath] = skuId
  })
  console.log('sku字典表 ->', skuDict)
}

const totalSku = computed(() => {
  const propPath = propList.value.map(([p, v]) => `${p?.pid}:${v?.vid}`).join(';')
  return skuDict[propPath] ?? ''
})

createTbProvide({ goodInfo, buyNum, propList, skuDict, totalSku })

function setPropKey(p: Pid, v: Vid, index: number) {
  propList.value[index] = [p, v]
}
</script>

<template>
  <div>
    <div flex justify-center mb-12>
      <span text-3rem mr-2 font-bold>{{ $t('generateTaobao') }}</span>
    </div>

    <TaoBaoLinkInput class="mx-auto" md="max-w-50%" @generate="handleDetail" />

    <div v-if="goodInfo" class="mt-6">
      <TaoBaoGoodInfo v-if="goodInfo.item" :value="goodInfo.item" class="flex gap-4 justify-center items-center mb-2" />

      <TaoBaoSkuPicker v-if="goodInfo.skuBase" :sku-base="goodInfo.skuBase" :value="propList" class="mx-auto" md="max-w-50%" @change="setPropKey" />

      <div class="mx-auto flex justify-between items-center" md="max-w-50%">
        <p class="lh-6 font-bold text-left">
          {{ t('buyNum') }}
        </p>
        <ElInputNumber v-model="buyNum" :min="1" />
      </div>
    </div>

    <div v-if="totalSku" class="mt-6">
      <div>
        <TaoBaoSinleBpBtn />
      </div>
      <div class="mt-4 mx-auto flex justify-center gap-4" md="max-w-50%">
        <TaoBaoCartBtn />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
