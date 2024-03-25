<script lang="ts" setup>
import { useEventListener, useRafFn, useTimeoutFn } from '@vueuse/core'
const props = defineProps<{
  perspective?: number,
  backgroundImg?: string,
  cardClass: string,
  maxRotate?: { x: number, y: number },
  maxSlide?: { x: number, y: number },
  zPosition? : number,
  touchHoldTime?: number,
  touchMaxMove?: number,
  transitionDuration? : number,
  useCardShadow? : boolean
}>()

const zPos = props.zPosition ?? 50
const maxRotate = props.maxRotate ?? {
  x: 15,
  y: 15
}
const maxSlide = props.maxSlide ?? {
  x: 15,
  y: 15
}

const useCardShadow = props.useCardShadow ?? true
const transitionDuration = props.transitionDuration ?? 300

const posX = ref(0)
const posY = ref(0)

const layers: any[] = []
const win = ref<Window | null>(null)
onMounted(() => {
  win.value = window
  if (container.value) {
    for (const c of container.value.children) {
      const child = c as HTMLElement
      const offset = parseInt(child.dataset?.offset ?? '0') || 0
      child.style.transitionProperty = 'transform'
      child.style.transitionDuration = `${transitionDuration}ms`
      child.style.transitionTimingFunction = 'ease-out'
      layers.push({
        element: child,
        offset: offset ?? 0
      })
    }
  }
})
const hover = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
const isHover = ref(false)

const touchHoldTime = props.touchHoldTime ?? 400 // press and hold time
const touchMaxMove = props.touchMaxMove ?? 10 // maximum pixel to identify touch is scrolling
const rotateEl = ref<HTMLElement | null>(null)
const pos = {
  x: 0,
  y: 0
}

const { pause, resume } = useRafFn(() => {
  moveLayerElements()
},
{ immediate: false })

function moveLayerElements () {
  const el = rotateEl.value
  if (el) el.style.transform = `translate3d(0px,0px,0px) rotateX(${pos.x * -(maxRotate.x)}deg) rotateY(${pos.y * maxRotate.y}deg)`
  for (const layer of layers) {
    if (layer.offset === 0) continue
    layer.element.style.transform = `translate3d(${pos.y * maxSlide.x * layer.offset}%,${pos.x * maxSlide.y * layer.offset}%,0px)`
  }
}

watch(isHover, (hover) => {
  if (hover) {
    resume()
  } else {
    pause()
    moveLayerElements()
  }
})

useEventListener(hover, 'pointerenter', onPointerEnter)

function onPointerEnter (e : PointerEvent) {
  if (e.pointerType !== 'mouse') {
    touchStart.x = e.clientX
    touchStart.y = e.clientY
    touchPos.x = e.clientX
    touchPos.y = e.clientY
    stopTouchTimer()
    startTouchTimer()
  } else {
    isHover.value = true
  }
}

const touchStart = {
  x: 0,
  y: 0
}
const touchPos = {
  x: 0,
  y: 0
}

const { start: startTouchTimer, stop: stopTouchTimer } = useTimeoutFn(() => {
  const x = Math.abs(touchStart.x - touchPos.x)
  const y = Math.abs(touchStart.y - touchPos.y)
  if (x <= touchMaxMove && y <= touchMaxMove) {
    const element = hover.value
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = Math.max(0, Math.min(element.clientWidth, touchPos.x - rect.left))
    const y = Math.max(0, Math.min(element.clientHeight, touchPos.y - rect.top))
    pos.x = calculatePos(y, element.clientHeight)
    pos.y = calculatePos(x, element.clientWidth)
    isHover.value = true
  }
}, touchHoldTime, { immediate: false })

useEventListener(hover, 'touchmove', (e : TouchEvent) => {
  if (isHover.value && e.cancelable) {
    e.preventDefault()
  }
})

useEventListener(hover, 'touchend', (e : TouchEvent) => {
  if (isHover.value && e.cancelable) {
    e.preventDefault()
    isHover.value = false
  }
})

useEventListener(hover, 'pointermove', (e : PointerEvent) => {
  if (e.pointerType !== 'mouse') {
    touchPos.x = e.clientX
    touchPos.y = e.clientY
    if (!isHover.value) return
  }

  const element = hover.value
  if (!element) return
  const rect = element.getBoundingClientRect()
  const x = Math.max(0, Math.min(element.clientWidth, e.clientX - rect.left))
  const y = Math.max(0, Math.min(element.clientHeight, e.clientY - rect.top))
  pos.x = calculatePos(y, element.clientHeight)
  pos.y = calculatePos(x, element.clientWidth)
})

useEventListener(hover, 'pointerleave', (e : PointerEvent) => {
  stopTouchTimer()
  pos.x = 0
  pos.y = 0
  if (e.pointerType === 'touch') return
  isHover.value = false
})

function calculatePos (pos: number, size: number) {
  return (pos / (size / 2)) - 1
}

</script>

<template>
  <div
    ref="hover"
    class="select-none"
    :style="{
      perspective: perspective ? `${perspective}px` : '',
      transformStyle: 'preserve-3d',
    }"
  >
    <div
      class="h-full w-full will-change-transform"
      :style="{
        transformStyle: 'preserve-3d',
        transitionProperty : 'transform',
        transitionDuration : `${transitionDuration}ms`,
        transform : isHover ? `translate3d(0px,0px,${zPos}px)` :'translate3d(0px,0px,0px)',
        transitionTimingFunction : isHover ? 'ease-out' : ''
      }"
    >
      <div
        ref="rotateEl"
        class="relative block h-full w-full  will-change-transform"
        :style="{
          backgroundImage: backgroundImg ? `url('${backgroundImg}')` : '',
          transformStyle: 'preserve-3d',
          transitionDuration : `${transitionDuration}ms`,
          transitionProperty : 'transform',
          transitionTimingFunction : isHover ? 'ease-out' : '',
          transform: `translate3d(0px,0px,0px) rotateX(${posX * -(maxRotate.x)}deg) rotateY(${posY * maxRotate.y}deg)`
        }"
      >
        <div
          ref="container"
          :class="cardClass"
          class="pointer-events-none absolute z-10 h-full w-full touch-none select-none"
          :style="{
            transformStyle: 'preserve-3d',
            backfaceVisibility : 'hidden',
            transform: `translateZ(0px)`
          }"
        >
          <slot />
        </div>
        <div
          v-if="useCardShadow"
          class="absolute inset-0 z-0 bg-black transition-opacity"
          :class="{ 'opacity-5': !isHover, 'opacity-100': isHover }"
          :style="{
            transform: 'translate3d(0px, 0px, -50px) scale(1)',
            filter: 'blur(50px)',
            transitionDuration: `${transitionDuration}ms`,
            transitionTimingFunction : isHover ? 'ease-out' : '',
          }"
        />
      </div>
    </div>
  </div>
</template>
