<script setup lang="ts">
import type { GoodDetail } from '~/types/tb'

const emits = defineEmits<{
  (e: 'generate', value: GoodDetail): void
}>()

const userCk = ref('cna=6wQwHFU3uEgCAXFBf9tFeF4a; thw=cn; enc=UlGfb9zG07Uuh7LPduz%2BeoF2Sg60S78ThHKv9FycN7TX9jJqO5%2BS0Etas9%2BcPY%2FIhjsP9Jz3Rbh%2BkvQKhWBVHRRzMpWcTNRaO5ozBr%2Fop%2BY%3D; _uetvid=f5604c40bcaf11edaf2d1f18120e3fc0; t=29428e191b606fefcc9d8d6aee12b533; hng=HK%7Czh-TW%7CHKD%7C344; cookie2=1854d2bb0244b5842e6cf549cc615aa9; _tb_token_=511e5396e3f33; _ga=GA1.1.1587683584.1678169944; _ga_YFVFB9JLVB=GS1.1.1684824030.2.0.1684824034.0.0.0; _samesite_flag_=true; ockeqeudmj=tvGuCVQ%3D; WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BtTNx0AkL9jWg4Ao%3D; _w_app_lg=0; lgc=%5Cu9EC4%5Cu80A5%5Cu8FBE; cancelledSubSites=empty; dnk=%5Cu9EC4%5Cu80A5%5Cu8FBE; tracknick=%5Cu9EC4%5Cu80A5%5Cu8FBE; sgcookie=E100Y7YtvJkiZ4oU9uWojM3u4fz4ovs6nRPm4qhSnCqxIa8EONB0zqHGVTHJLmh9lnPSqbggfEb0ifeRf8oFjc8aJV4AUffR92XTZkUReoV1omc%3D; uc3=nk2=2B6%2FTcv%2F&lg2=U%2BGCWk%2F75gdr5Q%3D%3D&id2=Uojci5CHgfDLFw%3D%3D&vt3=F8dCsfGYQ7Q4N5lgIJI%3D; csg=e8bfcf11; skt=ec88788068a93dd9; existShop=MTY4NDk4NDg0NA%3D%3D; uc4=id4=0%40UOBYw0Q6ZG0Yox1ck%2BmPmqgFU0KG&nk4=0%402iuK1QU1ZgJcvL2Edj4Hfho%3D; _cc_=UtASsssmfA%3D%3D; xlly_s=1; _m_h5_tk=8c5e7af2fac0ef41dc6b712bd6643849_1685612199840; _m_h5_tk_enc=2a7d32360fb01b840e67b46bd0e77812; x5sec=7b22617365727665723b32223a223930363766363061663839663537326662323530336266343561633865303963434c4f5934614d47454c47646d754c556c592f672b774561444445354f4441784f5451304d546b374d5444386d4e62562f502f2f2f2f384251414d3d227d; mt=ci=-1_0; uc1=existShop=false&cookie14=Uoe8j2FoB5QrIA%3D%3D&cookie21=U%2BGCWk%2F7p4mBoUyS4E9C&pas=0&cookie16=UIHiLt3xCS3yM2h4eKHS9lpEOw%3D%3D; isg=BMbGokNM3qlAkI2Y4vhVOrpjF7xIJwrhrigQbbDviOnEs2bNGbcK8ayCj-9_GwL5; tfstk=cbOGBI4zsdWs2GlvAh1s1UYLJphRZTVVqIRBTqxUtjVPIsAFi8eUUEgs-GmSb-1..; l=fBaA_KT4TnzCUKL-BOfZnurza77TpIRAguPzaNbMi9fPO_5B5ZBOW1atyQ86CnGVFsaeJ3l39SNMBeYBqbh-nxvtIosM_EHmndLHR35..')
const shortLink = ref('https://m.tb.cn/h.UxIRw6k?tk=bMAWdpr1YHr')

async function handleLink() {
  const { data } = await useFetch<GoodDetail>('/api/tb', {
    method: 'post',
    body: {
      url: shortLink.value,
      ck: userCk.value,
    },
  })

  console.log(data)
  data.value && emits('generate', data.value)
}
</script>

<template>
  <div>
    <div class="mb-4 md:mb-2">
      <ElInput v-model="userCk" placeholder="淘宝ck" />
    </div>
    <div class="gap-4" flex="~ col" md="flex-row gap-2">
      <ElInput v-model="shortLink" placeholder="粘贴淘口令(含https://m.tb.cn)" />
      <ElButton type="warning" @click="handleLink">
        {{ $t('generate') }}
      </ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
