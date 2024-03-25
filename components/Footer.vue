<template>
  <div class="inline-flex gap-2">
    <NuxtLink
      to="mailto:kelvingeraldi21@gmail.com"
      aria-label="Linktree"
      target="_blank"
      :external="true"
      class="rounded-md transition-colors duration-300 w-8 h-8 hover:bg-black/5 hover:dark:bg-white/5 flex items-center"
    >
      <Icon name="material-symbols:mail-rounded" class="w-full h-full p-1" />
    </NuxtLink>
    <NuxtLink
      to="https://twitter.com/crstlnz"
      aria-label="@Crstlnz"
      target="_blank"
      :external="true"
      class="rounded-md transition-colors duration-300 w-8 h-8 hover:bg-black/5 hover:dark:bg-white/5 flex items-center"
    >
      <Icon name="ri:twitter-x-line" class="w-full h-full p-1.5" />
    </NuxtLink>
    <NuxtLink
      to="https://github.com/crstlnz"
      aria-label="Github"
      target="_blank"
      :external="true"
      class="rounded-md transition-colors duration-300 w-8 h-8 hover:bg-black/5 hover:dark:bg-white/5 flex items-center"
    >
      <Icon name="ri:github-fill" class="w-full h-full p-1" />
    </NuxtLink>
  </div>
</template>
