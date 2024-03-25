<script lang="ts" setup>
defineProps<{
  msg: Chat.TypedChatMessage
}>()
</script>

<template>
  <div class="flex flex-col gap-1.5 items-center">
    <div class="text-xs opacity-70">
      {{ $dayjs(msg.date).format("hh:mm") }}
    </div>
    <div class="flex flex-col gap-2.5 items-center">
      <TransitionGroup name="chatlist">
        <div v-for="[idx, m] in (msg.messages?.entries() || [])" :key="`${msg.id}-${idx}`" class="bg-white/5 rounded-full px-4 py-1 opacity-75">
          {{ m }}
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
