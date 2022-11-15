export default defineNuxtPlugin((nuxtApp) => {
  const color = useColorMode()
  const isDark = ref(false)

  // SSR is causing dark mode hydration issues with naive-ui
  // This fix quickly toggles dark mode on 'page:finish' hook
  nuxtApp.hook('page:finish', () => {
    // First time on the page
    isDark.value = color.value === 'dark'

    // When switch theme
    watch(() => color.value, (val) => {
      isDark.value = val === 'dark'
    }, { immediate: false })
  })

  return {
    provide: {
      isDark,
    },
  }
})
