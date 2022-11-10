import type { MaybeRef } from '@vueuse/core'
import type { ComputedRef } from 'vue'

export function filterRef<T>(arr: MaybeRef<T[]>, fn: any): ComputedRef<T[]> {
  const list = unref(arr)
  return computed(() => list.filter(fn))
}

export function add(a: MaybeRef<number>, b: MaybeRef<number>): number {
  return unref(a) + unref(b)
}
