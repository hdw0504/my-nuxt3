<script setup lang="ts">
import { useTbInject } from './injection'
import type { CartItem } from '~/types/tb'
import type { ComponentType } from '~/types'

const { goodInfo, propList } = useTbInject()

const cart = ref<CartItem[]>([])
function appendToCart() {
  cart.value.push({
    info: deepClone(goodInfo.value!.item!),
    sku: deepClone(propList.value),
  })
}

const drawerRef = ref<ComponentType<'TaoBaoCartDrawer'>>()
function openDrawer() {
  drawerRef.value?.open()
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

    <TaoBaoCartDrawer ref="drawerRef" :cart="cart" />
  </div>
</template>

<style lang="scss" scoped>
</style>
