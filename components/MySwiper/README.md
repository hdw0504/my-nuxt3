### 首页 FOR YOU 轮播图

#### Props

```ts
interface Props {
  value: GameInfo[] // 游戏信息
  showName?: boolean // 图片的时候是否展示名字
  pagination?: boolean // 是否有分页
}
const props = withDefaults(defineProps<Props>(), {
  showName: false,
  pagination: false,
})
```

#### expose

```ts
defineExpose({
  currentIndex, // 正确的索引
  switchAutoPlay, // 切换自动轮播状态 用于视频播放时需暂停
  switchCurrentIndex, // 切换轮播索引
  swiper: controlledSwiper, // swiper实例 调用swiper方法
})
```

#### 使用

如果使用 pagination 需要在父元素加`mb-20px`

```html
<!-- swiper -->
<div h-330px w-665px mb-20px>
  <GameSwiper rd-10px :value="gamePicAndVideo" pagination></GameSwiper>
</div>
```
