<script setup lang="ts">
import type { DetailResult, Note } from '~/types/xhs'

const link = ref('xxxxx http://xhslink.com/6sh9Oq xxxx')

const note = ref<Note>()
async function handleLink() {
  const { data } = await useFetch<DetailResult>('/api/xhs', {
    method: 'post',
    body: {
      url: link.value,
    },
  })
  console.log('res', data)

  note.value = data.value?.note.note
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
          获取链接内容
        </ElButton>
      </div>
    </div>

    <div v-if="note" class="mx-auto mt-6 flex flex-col gap-4" md="max-w-50%">
      <p class="text-xl font-bold">
        文章内容
      </p>
      <!-- 用户信息 -->
      <div class="flex items-center gap-2">
        <NuxtImg class="w-12 h-12 rd-50%" :src="note.user.avatar" />
        <p>{{ note.user.nickname }}</p>
      </div>
      <!-- 文章详情 -->
      <div class="text-left">
        <p class="text-5 lh-8 mb-1 font-bold">
          {{ note.title }}
        </p>
        <span class="lh-6" v-html="note.desc" />
      </div>

      <!-- 图片内容 -->
      <div class="flex flex-wrap gap-2">
        <template v-for="img in note.imageList" :key="img.traceId">
          <NuxtImg class="w-40 h-40" :src="img.url" />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
