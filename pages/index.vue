<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints, useEventListener } from '@vueuse/core'
import SectionNavButton from '~/components/SectionNavButton.vue'

const wrapper = ref<HTMLElement>()
const wrapperChild = ref<HTMLElement>()
const { greaterOrEqual } = useBreakpoints(breakpointsTailwind)
const xl = greaterOrEqual('xl')

const size = ref<{ width: number | null, height: number | null }>({
  width: null,
  height: null,
})

function calculateWraperSize(el: HTMLElement) {
  size.value = {
    width: null,
    height: null,
  }
  nextTick(() => {
    if (xl.value) {
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
  })
}

onMounted(() => {
  if (wrapper.value) {
    calculateWraperSize(wrapper.value)
  }
})

useEventListener(window, 'resize', () => {
  requestAnimationFrame(() => {
    if (wrapper.value) {
      calculateWraperSize(wrapper.value)
    }
  })
})

useEventListener(window, 'scroll', () => {
  detectSection()
})

const currentSection = ref<HTMLElement>()
const sectionId = computed(() => {
  return currentSection.value?.getAttribute('data-section')
})
const sections = ref<HTMLElement[]>([])
const currectSectionIndex = ref(0)
function detectSection() {
  currentSection.value = sections.value.find((sec, idx) => {
    const y = window.scrollY
    const offset = sec.offsetTop - window.innerHeight / 2
    const height = sec.offsetHeight
    if (y >= offset && y < offset + height) {
      currectSectionIndex.value = idx
      return true
    }
    return false
  })
}

const prevSectionId = computed<string | undefined | null>(() => {
  const prevIdx = currectSectionIndex.value - 1
  if (prevIdx < 0) return null
  return sections.value[prevIdx]?.getAttribute('id')
})

const nextSectionId = computed<string | undefined | null>(() => {
  const nextIdx = currectSectionIndex.value + 1
  if (nextIdx >= sections.value.length - 1) return null
  return sections.value[nextIdx]?.getAttribute('id')
})

onMounted(() => {
  nextTick(() => {
    sections.value = [...document.querySelectorAll('section')]
  })
})

function menuClick(menu: Menu) {
  if (menu.url !== '#') {
    const el = document.getElementById(menu.id)
    smoothScroll(el || 0)
  }
  else {
    smoothScroll(0)
  }
}

function onScroll(y: number) {
  window.scrollTo({ top: y, behavior: 'instant' })
}

const { isMobile } = useDevice()
</script>

<template>
  <div id="main-app">
    <Teleport v-if="!isMobile" to="body">
      <ScrollBar
        :use-window="true"
        @scroll="onScroll"
      />
    </Teleport>
    <SinglePageNav class="fixed top-0 !left-0" :currect-section="sectionId" @menu-click="menuClick" />
    <SectionNavButton :next-id="nextSectionId" :prev-id="prevSectionId" />
    <SectionHome />
    <SectionAbout />
    <SectionProjects />
    <SectionContact />
  </div>
</template>
