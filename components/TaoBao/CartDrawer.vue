<script setup lang="ts">
import type { CartItem } from '~/types/tb'

defineProps<{
  cart: CartItem[]
}>()

const drawer = ref(false)

function open() {
  drawer.value = true
}

defineExpose({
  open,
})
</script>

<template>
  <ElDrawer
    v-model="drawer"
    :title="$t('cart')"
    direction="rtl"
    :append-to-body="true"
  >
    <div>
      <div v-for="(good, i) in cart" :key="i">
        <TaoBaoGoodInfo
          :value="good.info"
          class="flex gap-4 justify-center items-center mb-2"
          img-class="w-20 h-20 rd-3"
          info-class="lh-6 text-left"
        />
        <div v-for="(sku, inx) in good.sku" :key="inx" class="flex gap-2 mb-1">
          <p v-for="(item, index) in sku" :key="index">
            {{ item.name }}
          </p>
        </div>

        <ElDivider />
      </div>
    </div>
  </ElDrawer>
</template>

<style lang="scss" scoped>
</style>
