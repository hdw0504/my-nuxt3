import type { InjectionKey } from 'vue'
import type { GoodDetail, SkuMatcher } from '~/types/tb'

interface State {
  goodInfo: Ref<GoodDetail>
  buyNum: Ref<number>
  propList: Ref<SkuMatcher[]>
  skuDict: Record<string, string>
  totalSku: Ref<string>
}

// eslint-disable-next-line symbol-description
const stateKey: InjectionKey<State> = Symbol()

export function createTbProvide(state: State) {
  provide(stateKey, state)
}

export function useTbInject(): State {
  return inject(stateKey)!
}
