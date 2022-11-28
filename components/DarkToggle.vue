<script setup lang="ts">
const color = useColorMode()

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div dark:i-carbon-moon i-carbon-sun cursor-pointer @click="toggleDark" />
</template>
