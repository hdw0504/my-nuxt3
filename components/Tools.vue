<script setup lang="ts">
interface RouteItem {
  label: string
  name: string
}

const localePath = useLocalePath()
const routeList = reactive<RouteItem[]>([
  {
    label: '淘宝',
    name: 'tools-taobao',
  }, {
    label: '小红书',
    name: 'tools-xhs',
  },
])
</script>

<template>
  <div>
    <el-dropdown trigger="click">
      <div i-mdi-tools cursor-pointer />
      <template #dropdown>
        <el-dropdown-menu>
          <NuxtLink v-for="(item, inx) in routeList" :key="inx" :to="localePath({ name: item.name })">
            <el-dropdown-item>
              {{ item.label }}
            </el-dropdown-item>
          </NuxtLink>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
</style>
