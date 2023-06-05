<script setup lang="ts">
const link = ref('xxxxx https://xhslink.com/6sh9Oq xxxx')

async function handleLink() {
  const { data } = await useFetch<any>('/api/xhs', {
    method: 'post',
    body: {
      url: link.value,
    },
  })
  console.log('res', data)
}
</script>

<template>
  <div>
    <div flex justify-center mb-12>
      <span text-3rem mr-2 font-bold>小红书获取内容</span>
    </div>

    <div class="mx-auto" md="max-w-50%">
      <div class="gap-4" flex="~ col" md="flex-row gap-2">
        <ElInput v-model="link" placeholder="小红书分享链接" />
        <ElButton type="warning" @click="handleLink">
          获取视频内容
        </ElButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
