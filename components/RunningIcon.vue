<script lang="ts" setup>
const props = withDefaults(defineProps<{
  data: {
    img: string
    title: string
    resource?: string
  }[]
  enableLink?: boolean
  enableHover?: boolean
  speed?: number
  sizes?: string
  imageSizes?: string
  minGap?: {
    all: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    xxl?: number
  }
  offset?: number // extend left and right for hide the icon before recycle
}>(), {
  enableHover: false,
  enableLink: true,
  speed: 4.5,
  minGap: () => {
    return {
      all: 150,
    }
  },
  offset: 200,
})

const { greaterOrEqual } = useResponsive()

const sm = greaterOrEqual('sm')
const md = greaterOrEqual('md')
const lg = greaterOrEqual('lg')
const xl = greaterOrEqual('xl')
const xl2 = greaterOrEqual('2xl')

const icons = ref<HTMLElement[]>([])
const scroller = ref<HTMLElement | null>()
const container = ref<HTMLElement | null>()

const gap = computed(() => {
  if (props.minGap.xxl && xl2.value) {
    return props.minGap.xxl
  }
  else if (props.minGap.xl && xl.value) {
    return props.minGap.xl
  }
  else if (props.minGap.lg && lg.value) {
    return props.minGap.lg
  }
  else if (props.minGap.md && md.value) {
    return props.minGap.md
  }
  else if (props.minGap.sm && sm.value) {
    return props.minGap.sm
  }
  else {
    return props.minGap.all
  }
})

const { $gsap } = useNuxtApp()
let ctx: gsap.Context
onMounted(() => {
  ctx = $gsap.context(() => {
    $gsap.fromTo('#icon-slider', {
      xPercent: 0,
    }, {
      duration: 60,
      xPercent: -50,
      repeat: -1,
      ease: 'none',
    })
  })
})

onBeforeUnmount(() => {
  if (ctx) ctx.kill()
})
</script>

<template>
  <div>
    <div ref="scroller" class="gradient relative transition-opacity duration-300 mx-auto" :class="sizes">
      <div id="icon-slider" ref="container" class="flex absolute">
        <component
          :is="icon.resource && enableLink ? 'a' : 'div'"
          v-for="[idx, icon] in [...data, ...data].entries()"
          ref="icons"
          :key="idx"
          target="_blank"
          :style="{
            marginRight: `${gap}px`,
          }"
          :href="enableLink ? icon.resource : undefined"
          :title="icon.title"
          :class="[
            {
              'cursor-pointer': enableLink && icon.resource,
              'transition-transform duration-300 hover:scale-90': enableHover,
            },
            sizes,
          ]"
          class="pointer-events-auto shrink-0 inline-block aspect-square rounded-md"
        >
          <NuxtImg :src="icon.img" :alt="icon.title" :sizes="imageSizes" class="w-full h-full object-contain" />
        </component>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.gradient{
  mask-image: linear-gradient(90deg,transparent, #fff 20%, #fff 80%, transparent);
  -webkit-mask-image: linear-gradient(90deg,transparent, #fff 20%, #fff 80%, transparent);
}
</style>
