<script lang="ts" setup>
import markdownit from 'markdown-it'

defineProps<{
  msg: Chat.TypedMessage
}>()

const md = markdownit(
  { html: true, linkify: true, typographer: true },
)
</script>

<template>
  <div class="chat-out flex gap-3">
    <div class="flex flex-col gap-2">
      <TransitionGroup name="chatlist">
        <div v-for="[idx, m] in (msg.messages?.entries() || [])" :key="`${msg.id}-${idx}`" class="flex gap-2 items-end w-full justify-end">
          <div v-if="idx === msg.messages?.length - 1" class="text-xs opacity-60">
            {{ $dayjs(msg.date).format("hh:mm") }}
          </div>
          <div v-if="(typeof m === 'string')" :class="{ 'rounded-tr-xl': idx >= 1 }" class="bg-white text-slate-900 p-3 rounded-l-xl rounded-br-xl text-sm text-end" v-html="md.render(m)" />
          <img v-else alt="Gif" :src="m.url" class="rounded-md w-64 max-w-[80%] object-cover" :style="{ aspectRatio: `${m.height}/${m.width}` }">
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
