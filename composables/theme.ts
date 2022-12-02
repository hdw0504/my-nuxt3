const colorMode = useColorMode()
export const isDark = computed(() => colorMode.value === 'dark')
