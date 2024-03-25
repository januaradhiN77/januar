<script lang="ts" setup>
import lang from '~/assets/json/myLang.json'

const usedLang = ['nuxt', 'vue', 'typescript', 'javascript', 'hono', 'nodejs', 'mongojs', 'html5', 'sass']

const icons = computed(() => {
  return lang.filter(i => usedLang.includes(i.id))
})
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-3">
    <div class="aspect-[15/5] bg-white/20" />
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <div class="text-2xl font-bold">
          JKT48 Live Log
        </div>
        <div class="text-sm opacity-75">
          Fullstack Project
        </div>
      </div>
      <NuxtLink to="https://dc.crstlnz.my.id" :external="true" class="bg-red-500 px-3 py-1.5 rounded-md">
        Visit
      </NuxtLink>
    </div>
    <div class="flex flex-wrap gap-3">
      <NuxtImg v-for="icon in icons" :key="icon.id" :src="icon.img" :alt="icon.title" sizes="32px" class="h-8 w-8 object-contain" />
    </div>
    <div class="max-w-3xl">
      This project is a project for jkt48 fans to make it easier to get live information, live history, theater data, and more.
    </div>
    <!-- <div class="bg-red-500 w-[550px]">
      wew
    </div> -->
  </div>
</template>
