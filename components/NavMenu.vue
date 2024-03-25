<script setup lang="ts">
import { useElementSize, useEventListener } from '@vueuse/core'

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
  const active = menus.value.find((i: any) => i.$el.getAttribute('data-url') === route.path)
  const el = (active as any)?.$el
  return {
    active: el !== null,
    width: el?.clientWidth ?? 0,
    height: el?.clientHeight ?? 0,
    left: el?.getBoundingClientRect()?.left ?? 0,
  }
}

const pos = ref(getPos())
watch(() => route.path, () => {
  pos.value = getPos()
})
const mounted = ref(false)

const w = ref()
let to: NodeJS.Timeout
useEventListener(w, 'resize', () => {
  mounted.value = false
  if (to) clearTimeout(to)
  to = setTimeout(() => {
    pos.value = getPos()
    mounted.value = true
  }, 150)
})

const menuList = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Projects',
    url: '/projects',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
]

onMounted(() => {
  w.value = window
  pos.value = getPos()
  nextTick(() => {
    setTimeout(() => {
      mounted.value = true
    }, 150)
  })
})
</script>

<template>
  <header ref="navContainer" class="pointer-events-none absolute top-0 z-nav mx-auto my-5 flex w-full items-center justify-end text-center font-semibold pr-14">
    <div
      class="absolute rounded-full bg-navy-4 duration-300 ease-in-out"
      :class="{
        'opacity-100 transition-[left,width,height,opacity]': pos.active && mounted,
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
      <NuxtLink
        v-for="menu in menuList"
        ref="menus"
        :key="menu.url"
        :data-url="menu.url"
        :to="menu.url"
        class="mx-[5px] inline-block px-4 py-1.5 text-sm md:px-5 md:text-lg"
      >
        {{ menu.title }}
      </NuxtLink>
      <div
        :class="{
          'opacity-0': isTop,
          'opacity-100': !isTop,
        }"
        class="absolute inset-0 -z-10 rounded-full bg-navy-1/70 backdrop-blur-[20px] transition-opacity duration-300"
      />
    </nav>
  </header>
</template>
