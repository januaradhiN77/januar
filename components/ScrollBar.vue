<script lang="ts" setup>
import { useElementHover, useEventListener, useMouseInElement, useScroll, useTimeoutFn } from '@vueuse/core'

const props = defineProps<{
  useWindow: boolean
  scrollContent?: HTMLElement
}>()

const emit = defineEmits<{ (e: 'scroll', y: number): any, (e: 'start'): any, (e: 'stop'): any }>()
const key = ref(0)
const scrollbar = ref<HTMLElement | null>(null)
const scrollParent = ref<Window | HTMLElement | null>()

onMounted(() => {
  if (props.useWindow) {
    scrollParent.value = window
  }
  else {
    scrollParent.value = scrollbar.value?.parentElement
  }
})

const { y } = useScroll(scrollParent)

function getHeight() {
  if (!scrollParent.value) return 0
  if (scrollParent.value instanceof Window) return scrollParent.value.innerHeight
  return scrollParent.value.clientHeight
}

function getWidth() {
  if (!scrollParent.value) return 0
  if (scrollParent.value instanceof Window) return scrollParent.value.innerWidth
  return scrollParent.value.clientWidth
}

function contentHeight() {
  if (!scrollParent.value) return 0
  if (scrollParent.value instanceof Window) return scrollParent.value.document.documentElement.scrollHeight
  return props.scrollContent?.scrollHeight || 0
}

const handleHeight = computed(() => {
  const percent = (getHeight() ?? 0) / (contentHeight() ?? 0)
  return percent * (getHeight() ?? 0) + (key.value * 0)
})

const handle = ref<HTMLElement | null>(null)
const scrollPos = computed(() => {
  return ((y.value / (contentHeight() ?? 0 + (handleHeight.value ?? 0))) * 100) + (key.value * 0)
})

const w = ref()
useEventListener(w, 'resize', () => {
  key.value++
})

function refresh() {
  key.value++
}

function onMutation() {
  refresh()
}

const observer = ref<MutationObserver | null>()
// const mousePosition = ref({ top: 0, left: 0 })
const mousePosY = ref(0)
function mouseMoveHandler(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  const y = (event.clientY - mousePosY.value) / getHeight() * (contentHeight() ?? 0)
  // const y = (mousePosY.value / getHeight()) * contentHeight() + event.clientY - mousePosY.value - (handle.value?.getBoundingClientRect()?.top ?? 0)
  emit('scroll', y)
}

function onMouseDown(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  mousePosY.value = event.clientY - (handle.value?.getBoundingClientRect()?.top ?? 0)
  // mousePosition.value = { top: event.clientY - (handle.value?.getBoundingClientRect()?.top ?? 0), left: event.clientX - (handle.value?.getBoundingClientRect()?.left ?? 0) }
  document.addEventListener('mousemove', mouseMoveHandler)
  emit('start')
}

function onMouseUp(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  document.removeEventListener('mousemove', mouseMoveHandler)
  emit('stop')
}

onMounted(() => {
  observer.value = new MutationObserver(onMutation)
  observer.value.observe(scrollParent.value instanceof Window ? scrollParent.value.document : scrollParent.value!, { childList: true })
  w.value = window
  if (!handle.value) return

  handle.value.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mouseup', onMouseUp)
})

onBeforeUnmount(() => {
  if (observer.value) observer.value.disconnect()
  handle.value?.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mousemove', mouseMoveHandler)
  document.removeEventListener('mouseup', onMouseUp)
})

const visible = ref(false)
const isHover = useElementHover(scrollbar)
const element = computed(() => {
  if (scrollParent.value instanceof Window) return scrollParent.value.document.documentElement
  return scrollParent.value
})
const { isOutside: outScrollable } = useMouseInElement(element)
function calculateMouseClick(event: MouseEvent) {
  // event.preventDefault()
  // event.stopPropagation()
  return (event.clientY - handleHeight.value / 2) / getHeight() * (contentHeight() ?? 0)
}

const { start } = useTimeoutFn(() => {
  if (outScrollable.value) {
    visible.value = false
  }
}, 800)

watch(y, () => {
  visible.value = true
  start()
})

defineExpose({ refresh })
</script>

<template>
  <div
    ref="scrollbar"
    :class="{ 'opacity-0': outScrollable && !visible, 'opacity-100': !outScrollable && visible }"
    :style="{ position: useWindow ? 'fixed' : 'static' }"
    class="transition-opacity duration-200 ease-linear w-4 absolute right-0 top-0 bottom-0 z-aboveNav flex items-end justify-end"
    @mousedown="(e: MouseEvent) => emit('scroll', calculateMouseClick(e))"
  >
    <div class="h-full transition-[background] duration-200 w-full ease-linear" :class="{ 'bg-slate-700/0': !isHover, 'bg-slate-700': isHover }" />
    <div id="handle" ref="handle" class="px-0.5 w-full absolute py-2" :style="{ height: `${handleHeight}px`, top: `${scrollPos}%` }">
      <div class="rounded-lg h-full float-right transition-[background-color,width] ease-in-out duration-200" :class="{ 'w-1.5 bg-slate-600': !isHover, 'w-full bg-slate-500': isHover }" />
    </div>
  </div>
</template>

<style lang="scss">
</style>
