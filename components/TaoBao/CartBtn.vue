<script setup lang="ts">
import { useTbInject } from './injection'
import type { CartItem } from '~/types/tb'
import type { ComponentType } from '~/types'

const { goodInfo, propList, buyNum, totalSku } = useTbInject()

const cart = ref<CartItem[]>([])
function appendToCart() {
  cart.value.push({
    info: deepClone(goodInfo.value!.item!),
    matcher: deepClone(propList.value),
    num: buyNum.value,
    sku: totalSku.value,
  })
}

const drawerRef = ref<ComponentType<'TaoBaoCartDrawer'>>()
function openDrawer() {
  drawerRef.value?.open()
}

const { t } = useI18n()
const { copy } = useClipboard({ legacy: true })
/** 生成单商品bp */
function generateMultBp() {
  const paramList = cart.value.map(({ info: { itemId }, num, sku = 0 }) => `${itemId}_${num}_${sku}`)
  const link = `https://h5.taobao.com/cart/order.html?buyParam=${paramList.join(',')}`
  copy(link)
  ElMessage.success(t('copySuccess'))
}
</script>

<template>
  <div class="flex justify-center gap-4">
    <ElBadge :value="cart.length">
      <div class="p-1.75 rd-1/2 cursor-pointer" b="~ solid current" @click="openDrawer">
        <div i-mdi-cart-outline />
      </div>
    </ElBadge>

    <div>
      <ElButton type="warning" @click="appendToCart">
        {{ $t('appendToCart') }}
      </ElButton>
    </div>

    <div>
      <ElButton type="warning" @click="generateMultBp">
        {{ $t('generateMultBp') }}
      </ElButton>
    </div>

    <TaoBaoCartDrawer ref="drawerRef" :cart="cart" />
  </div>
</template>

<style lang="scss" scoped>
</style>
