<script setup lang="ts">
import type { LocaleObject } from 'vue-i18n-routing'

const { locale, locales, setLocale } = useI18n()
const availableLocales = computed(() =>
  (locales.value as LocaleObject[]).filter(i => i.code !== locale.value),
)
</script>

<template>
  <div>
    <el-dropdown trigger="click">
      <div i-carbon-language cursor-pointer />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in (availableLocales)" :key="item.code" @click="setLocale(item.code)">
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>

</style>
