<script setup lang="ts">
import { useElementSize, useEventListener, useTimeoutFn } from '@vueuse/core'

const props = defineProps<{
  currectSection: string | undefined | null
}>()
const emit = defineEmits<{ (e: 'menuClick', menu: Menu): void }>()
const nav = ref<HTMLElement | null>(null)
const navContainer = ref<HTMLElement | null>(null)
const isTop = ref(true)
const { height } = useElementSize(navContainer)

useEventListener(window, 'scroll', () => {
  isTop.value = window.scrollY <= height.value
})

const route = useRoute()
const menus = ref<HTMLElement[]>([])

function getPos() {
  let active = menus.value.find((i: any) => {
    return i.getAttribute('data-id') === props.currectSection
  })
  if (!active) active = menus.value[0]
  const el = active as any
  return {
    active: el !== null,
    width: el?.clientWidth ?? 0,
    height: el?.clientHeight ?? 0,
    left: el?.getBoundingClientRect()?.left ?? 0,
  }
}

const pos = ref(getPos())

const { start } = useTimeoutFn(() => {
  pos.value = getPos()
}, 150)

watch(() => props.currectSection, () => {
  start()
})

watch(() => route.path, () => {
  pos.value = getPos()
})
const mounted = ref(false)

const w = ref()
useEventListener(w, 'resize', () => {
  mounted.value = false
  pos.value = getPos()
  setTimeout(() => {
    mounted.value = true
  }, 150)
})

const menuList = [
  {
    title: 'Home',
    url: '#',
    id: 'home',
  },
  {
    title: 'About',
    url: '#about',
    id: 'about',
  },
  {
    title: 'Projects',
    url: '#projects',
    id: 'projects',
  },
]

onMounted(() => {
  w.value = window
  nextTick(() => {
    pos.value = getPos()
    setTimeout(() => {
      mounted.value = true
    }, 550)
  })
})

function linkClick(menu: Menu) {
  emit('menuClick', menu)
}
</script>

<template>
  <header ref="navContainer" class="pointer-events-none top-0 z-nav mx-auto my-5 flex w-full items-center justify-center text-center font-semibold">
    <div
      class="absolute rounded-full duration-500 ease-in-out bg-navy-5"
      :class="{
        'opacity-100 transition-[left,width,height,opacity,background-color]': pos.active && mounted,
        'opacity-0 transition-none': !mounted,
      }"
      :style="{
        left: `${pos.left}px`,
        width: `${pos.width}px`,
        height: `${pos.height}px`,
      }"
    />
    <nav
      ref="nav"
      class="pointer-events-auto relative flex p-[10px]"
    >
      <button
        v-for="menu in menuList"
        ref="menus"
        :key="menu.url"
        type="button"
        :data-url="menu.url"
        :data-id="menu.id"
        :to="menu.url"
        class="mx-[5px] inline-block px-4 py-1.5 text-sm md:px-5 md:text-lg rounded-full focus:ring-0"
        @click="() => linkClick(menu)"
      >
        {{ menu.title }}
      </button>
      <div
        :class="{
          'opacity-0': isTop,
          'opacity-100': !isTop,
        }"
        class="absolute inset-0 -z-10 rounded-full bg-navy-1/80 backdrop-blur-[6px] transition-opacity duration-300"
      />
    </nav>
  </header>
</template>
