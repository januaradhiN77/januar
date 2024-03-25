<script lang="ts" setup>
import myLang from '~~/assets/json/myLang.json'

const langs = ref(['Nuxt 3', 'Vue.js', 'Hono', 'Typescript', 'MongoDB', 'NodeJS'])

const madeWith = computed(() => {
  return langs.value.map((i) => {
    return myLang.find(lang => lang.title === i)
  }).filter(i => i !== undefined)
})
</script>

<template>
  <div id="animate-project" data-section="projects" class="mx-auto">
    <div class="relative w-[80%] pb-20 mx-auto pr-3">
      <img class="main-ss w-full" src="https://res.cloudinary.com/haymzm4wp/image/upload/w_1000/v1685538525/assets/img/desktop-dark_rgl4to.webp" alt="Desktop Screenshot">
      <div class="absolute bottom-0 flex gap-20 items-end">
        <div class="description-ss">
          <!-- <div class="absolute -inset-x-5 -inset-y-2 z-0 rounded-full bg-black/20 blur-3xl" /> -->
          <div class="relative mb-5 flex">
            <div class="relative z-10 space-y-2 rounded-md bg-neutral-900 p-5 ring-4 ring-slate-500">
              <div class="text-xl font-bold">
                JKT48 Showroom
              </div>
              <div class="font-thin">
                Website fanmade untuk rekap history dari live <a href="https://www.showroom-live.com/" class="font-bold text-red-500">SHOWROOM</a> member JKT48.
                Website ini dibangun menggunakan <a href="https://nuxt.com/" class="font-bold text-red-500">Nuxt</a> sebagai backend dan frontend, serta
                <a href="https://www.mongodb.com/" class="font-bold text-red-500">MongoDB</a> sebagai databasenya.
              </div>
            </div>
          </div>
          <span class="relative z-10 mb-5 flex flex-wrap items-center gap-3 md:gap-5">
            <NuxtLink v-for="lang in madeWith" :key="lang?.title" target="_blank" :to="lang?.resource" class="flex gap-1.5 items-center rounded-md bg-slate-600 px-2 py-1 hover:bg-slate-700 md:px-3 md:py-2">
              <img :src="lang?.img" class="w-6 h-6"> {{ lang?.title }}
            </NuxtLink>
          </span>
        <!-- <span class="relative z-10 text-6xl font-bold">JKT48 Showroom</span> -->
        <!-- <span class="relative z-10">A fanmade project for JKT48 Showroom-live.com history</span> -->
        </div>
        <img class="mobile-ss drop-shadow-2xl -mr-3" src="https://res.cloudinary.com/haymzm4wp/image/upload/w_250/v1685538526/assets/img/phone-dark_dr98sa.webp" alt="Mobile Screenshot">
      </div>
    </div>
  </div>
</template>
