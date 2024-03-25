<script lang="ts" setup>
import markdownit from 'markdown-it'
import multiavatar from '@multiavatar/multiavatar/esm'

defineProps<{
  msg: Chat.TypedMessage
}>()

const md = markdownit(
  { html: true, linkify: true, typographer: true },
)
</script>

<template>
  <div class="flex gap-2.5">
    <div class="rounded-full w-10 h-10 shrink-0" v-html="multiavatar(msg.avatarId)" />
    <div>
      <div class="text-xs opacity-75 mb-1">
        {{ msg.name }}
      </div>
      <div class="flex flex-col gap-2">
        <TransitionGroup name="chatlist">
          <div v-for="[idx, m] in (msg.messages?.entries() || [])" :key="`${msg.id}-${idx}`" class="flex gap-2 items-end">
            <div v-if="(typeof m === 'string')" :class="{ 'rounded-tl-xl': idx >= 1 }" class="bg-white/5 p-3 rounded-r-xl rounded-bl-xl text-sm" v-html="md.render(m)" />
            <img v-else alt="Gif" :src="m.url" class="rounded-md w-64 max-w-[80%] object-cover" :style="{ aspectRatio: `${m.height}/${m.width}` }">
            <div v-if="idx === msg.messages?.length - 1" class="text-xs opacity-60">
              {{ $dayjs(msg.date).format("hh:mm") }}
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>
