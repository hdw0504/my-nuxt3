<script setup lang="ts">
import { useTbInject } from './injection'

const { goodInfo, buyNum, totalSku } = useTbInject()

const goodId = computed(() => goodInfo.value?.item?.itemId)

const { t } = useI18n()
const { copy } = useClipboard({ legacy: true })
/** 生成单商品bp */
function generateSingleBp() {
  const link = `https://h5.m.taobao.com/cart/order.html?itemId=${goodId.value}&_input_charset=utf-8&buyNow=true&v=0&skuId=${totalSku.value}&quantity=${buyNum.value}`
  copy(link)
  ElMessage.success(t('copySuccess'))
}
</script>

<template>
  <ElButton type="warning" @click="generateSingleBp">
    {{ $t('generateSingleBp') }}
  </ElButton>
</template>

<style lang="scss" scoped>
</style>
