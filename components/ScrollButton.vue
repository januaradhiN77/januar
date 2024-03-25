<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import type { NuxtLink } from '#components'

const props = defineProps<{
  to: string
  icon: string
  iconClass?: string
}>()

const button = ref<typeof NuxtLink>()
const isHidden = ref(false)
const w = ref()
function calculate() {
  if (button.value) {
    const rect = button.value?.getBoundingClientRect()
    isHidden.value = rect?.top < window.innerHeight / 3
  }
}
onMounted(() => {
  w.value = window
  calculate()
})
useEventListener(w, 'scroll', () => {
  calculate()
})

function scroll() {
  const el = document.querySelector(props.to)
  smoothScroll(el as HTMLElement)
}
</script>

<template>
  <button ref="button" :class="{ 'opacity-0 invisible': isHidden }" class="duration-500 rounded-full overflow-hidden w-10 h-10 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hover:scale-125 ease-out transition-[opacity,transform,visibility]" @click="scroll">
    <Icon :name="icon" size="1.7rem" :class="iconClass" />
  </button>
</template>
