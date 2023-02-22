import type { GlobalComponents } from 'vue'
export type ComponentProps<K extends keyof GlobalComponents> = InstanceType<GlobalComponents[K]>['$props']
export type ComponentProp<K extends keyof GlobalComponents, V extends keyof ComponentProps<K>> = ComponentProps<K>[V]
export type ComponentPropsMap<K extends keyof GlobalComponents, V extends keyof ComponentProps<K>> = Pick<ComponentProps<K>, V>
