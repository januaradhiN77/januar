<template>
  <div class="inline-flex gap-2">
    <NuxtLink
      to=""
      aria-label="Tiktok"
      target="_blank"
      :external="true"
      class="rounded-md transition-colors duration-300 w-8 h-8 hover:bg-black/5 hover:dark:bg-white/5 flex items-center"
    >
      <Icon name="ri:instagram-fill" class="w-full h-full p-1" />
    </NuxtLink>
    <NuxtLink
      to="https://twitter.com/januaradhin"
      aria-label="@januaradhin"
      target="_blank"
      :external="true"
      class="rounded-md transition-colors duration-300 w-8 h-8 hover:bg-black/5 hover:dark:bg-white/5 flex items-center"
    >
      <Icon name="ri:twitter-x-line" class="w-full h-full p-1.5" />
    </NuxtLink>
    <NuxtLink
      to="https://github.com/januaradhiN77"
      aria-label="Github"
      target="_blank"
      :external="true"
      class="rounded-md transition-colors duration-300 w-8 h-8 hover:bg-black/5 hover:dark:bg-white/5 flex items-center"
    >
      <Icon name="ri:github-fill" class="w-full h-full p-1" />
    </NuxtLink>
  </div>
</template>
