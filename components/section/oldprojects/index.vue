<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const projectURL = ref('https://dc.crstlnz.my.id/')
const githubURL = ref('https://github.com/crstlnz/jkt48showroom')
const breakpoints = useBreakpoints(breakpointsTailwind)
const small = breakpoints.smaller('xl')
</script>

<template>
  <section
    id="projects"
    data-section="projects"
    data-color="bg-white"
    class="projects px-10 min-h-[100vh] bg-language flex snap-start flex-col items-center py-14 font-bold text-white md:py-20 relative"
  >
    <ScrollButton to="#projects" icon="mingcute:arrows-down-fill" icon-class="text-white" class="bg-secondary" />
    <div class="flex items-end gap-3 text-2xl md:mt-8 md:text-4xl">
      <Icon name="streamline-emojis:briefcase" class="text-blue-500" size="2.6rem" />
      <span>My Projects</span>
    </div>
    <div class="flex flex-wrap items-center justify-center mt-10 w-full">
      <div class="text-center w-1/2 px-5 pb-10">
        <div class="bg-navy-3 p-10 aspect-[16/9] shadow-md border border-white/10 rounded-xl">
          kotak
        </div>
      </div>
      <div class="text-center w-1/2 px-5 pb-10">
        <div class="bg-navy-3 p-10 aspect-[16/9] shadow-md border border-white/10 rounded-xl">
          kotak
        </div>
      </div>
      <div class="text-center w-1/2 px-5 pb-10">
        <div class="bg-navy-3 p-10 aspect-[16/9] shadow-md border border-white/10 rounded-xl">
          kotak
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.bg-project {
  position: relative;
  &:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  background-image: url('https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D&w=1000&q=80');
  background-repeat: no-repeat;
  background-size: cover;
}
}
</style>
