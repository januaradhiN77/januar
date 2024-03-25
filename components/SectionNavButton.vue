<script setup lang="ts">
const props = defineProps<{
  nextId?: string | null
  prevId?: string | null
}>()

const isTop = ref(false)

useEventListener(window, 'scroll', () => {
  isTop.value = window.scrollY > window.innerHeight / 2
})

function next() {
  if (props.nextId) {
    const el = document.getElementById(props.nextId)
    smoothScroll(el || 0)
  }
}

function prev() {
  if (props.prevId) {
    const el = document.getElementById(props.prevId)
    smoothScroll(el || 0)
  }
}
</script>

<template>
  <div class="z-aboveNav bottom-4 right-4 md:bottom-6 md:right-6 xl:bottom-10 xl:right-10 flex flex-col gap-3 fixed pointer-events-none [&>button]:pointer-events-auto">
    <button key="prev-btn" :disabled="prevId == null" type="button" class="disabled:opacity-20 disabled:cursor-not-allowed h-7 w-7 md:w-10 md:h-10 bg-navy-3 border-white/50 border-2 rounded-full hover:bg-navy-5 transition-[background-color,transform,opacity] hover:scale-110 duration-200 ease-linear" @click="prev">
      <Icon name="heroicons:arrow-long-up-16-solid" class="w-full h-full p-1" />
    </button>
    <button key="next-btn" :disabled="nextId == null" type="button" class="disabled:opacity-20 disabled:cursor-not-allowed h-7 w-7 md:w-10 md:h-10 bg-navy-3 border-white/50 border-2 rounded-full hover:bg-navy-5 transition-[background-color,transform,opacity] hover:scale-110 duration-200 ease-linear" @click="next">
      <Icon name="heroicons:arrow-long-down-16-solid" class="w-full h-full p-1" />
    </button>
  </div>
</template>
