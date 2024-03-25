<script lang="ts" setup>
import multiavatar from '@multiavatar/multiavatar/esm'

const props = defineProps<{
  name: string
  avatarId: string
}>()

const avatar = computed(() => {
  return multiavatar(props.avatarId)
})
</script>

<template>
  <div class="relative p-2 bg-white/5 rounded-md flex gap-2.5 items-center">
    <div class="w-9 h-9 rounded-full overflow-hidden z-10" v-html="avatar" />
    <div class="flex-1 rounded-full flex items-center truncate text-sm">
      {{ name }}
    </div>
  </div>
</template>
