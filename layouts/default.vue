<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, useEventListener, useIntervalFn } from '@vueuse/core'

const wrapper = ref<HTMLElement>()
const wrapperChild = ref<HTMLElement>()
const { greaterOrEqual } = useBreakpoints(breakpointsTailwind)
const isXL = greaterOrEqual('xl')
const size = ref<{ width: number | null, height: number | null }>({
  width: null,
  height: null,
})

function calculateWraperSize(el: HTMLElement) {
  if (isXL.value) {
    const rect = el.getBoundingClientRect()
    size.value = {
      width: rect.width,
      height: rect.height,
    }
    if (wrapperChild.value) {
      wrapperChild.value.style.width = `${rect.width}px`
      wrapperChild.value.style.height = `${rect.height}px`
    }
  }
  else {
    size.value = {
      width: null,
      height: null,
    }
  }
}

onMounted(() => {
  if (wrapper.value) {
    calculateWraperSize(wrapper.value)
  }
})

useEventListener(window, 'resize', () => {
  if (wrapper.value) {
    calculateWraperSize(wrapper.value)
  }
})

useEventListener(window, 'scroll', () => {
  detectSection()
})

const currectSection = ref<HTMLElement>()
const sections = ref<HTMLElement[]>([])
function detectSection() {
  currectSection.value = sections.value.find((sec) => {
    const y = window.scrollY
    const offset = sec.offsetTop - 200
    const height = sec.offsetHeight
    if (y >= offset && y < offset + height) {
      return sec
    }
    return null
  })
}

onMounted(() => {
  nextTick(() => {
    sections.value = [...document.querySelectorAll('section')]
  })
})

const subContent = shallowRef<any>()
useIntervalFn(() => {
  if (subContent.value) {
    subContent.value = null
  }
  else {
    subContent.value = 'wew'
  }
}, 550)
</script>

<template>
  <div class="min-h-[100vh] overflow-x-clip md:touch-none">
    <slot />
  </div>
</template>
