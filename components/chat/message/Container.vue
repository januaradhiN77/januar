<script lang="ts" setup>
defineProps<{
  messages: Chat.TypedMessage[]
}>()
const container = ref<HTMLElement>()
onMounted(() => {
  if (container.value) {
    container.value.scrollTo({ top: container.value.scrollHeight })
  }
})

function checkScroll() {
  if (container.value) {
    if (container.value.scrollHeight - container.value.scrollTop > 200) {
      container.value.scrollTo({ top: container.value.scrollHeight, behavior: 'instant' })
    }
  }
}

let observer: MutationObserver
onMounted(() => {
  if (!container.value) return
  observer = new MutationObserver(checkScroll)
  observer.observe(container.value, { childList: true, subtree: true })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div id="chat-container" class="relative flex flex-col justify-end min-h-0">
    <!-- <button type="button" class="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs bg-blue-500 rounded-full px-3 py-1">
          New message
        </button> -->
    <div ref="container" class="px-3 md:px-4 overflow-y-auto min-h-0 chat-scrollbar overflow-x-hidden">
      <TransitionGroup name="chatlist">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="my-2 flex w-full"
          :class="{
            'justify-end': msg.type === 'out',
            'justify-center': msg.type === 'info',
          }"
        >
          <ChatMessageIn v-if="msg.type === 'in'" :msg="msg" class="max-w-[80%] md:max-w-[50%] xl:max-w-[30%]" />
          <ChatMessageOut v-else-if="msg.type === 'out'" :msg="msg" class="max-w-[80%] md:max-w-[50%] xl:max-w-[30%] self-end" />
          <ChatMessageInfo v-else :msg="msg" class="max-w-[80%] self-center" />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
