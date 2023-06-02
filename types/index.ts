import type { GlobalComponents } from 'vue'

/** 简化获取组件实例 */
export type ComponentType<K extends keyof GlobalComponents> = InstanceType<
  GlobalComponents[K]
>

/** 用于提取组件的props属性 */
export type ComponentProps<K extends keyof GlobalComponents> =
  ComponentType<K>['$props']

/** 提取组件props属性里面具体某个值的类型 */
export type ComponentProp<
  K extends keyof GlobalComponents, V extends keyof ComponentProps<K>,
> = ComponentProps<K>[V]

/** 提取组件props属性多个属性值 */
export type ComponentPropsMap<
  K extends keyof GlobalComponents, V extends keyof ComponentProps<K>,
> = Pick<ComponentProps<K>, V>
