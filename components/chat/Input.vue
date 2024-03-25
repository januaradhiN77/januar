<script lang="ts" setup>
// function onKeyUp(e: KeyboardEvent) {
//   if (!e.shiftKey) {
//     sendMessage()
//   }
// }
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const emit = defineEmits<(e: 'send', msg: string | Chat.ImageMessage) => void>()

const textarea = ref<HTMLTextAreaElement>()

const lineHeight = 24
const padding = 16
const maxLine = 4
const maxHeight = (maxLine * lineHeight) + padding
function calculateHeight() {
  if (!textarea.value) return
  textarea.value.style.height = '40px'
  const height = textarea.value.scrollHeight
  textarea.value.style.height = `${height > maxHeight ? maxHeight : height}px`
  textarea.value.scrollTo({ top: textarea.value.scrollHeight })
}

useEventListener(textarea, 'input', () => {
  calculateHeight()
})

function sendMessage() {
  if (!textarea.value) return
  const msg = textarea.value?.value
  if (msg) {
    emit('send', msg)
    textarea.value.value = ''
    calculateHeight()
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

const { greaterOrEqual } = useBreakpoints(breakpointsTailwind)
const isMD = greaterOrEqual('md')
</script>

<template>
  <div class="flex w-full py-0.5 gap-2 md:gap-3 px-3 items-center">
    <textarea ref="textarea" rows="1" class="hidden-scrollbar bg-white/5 py-2 px-3 rounded-xl my-2 flex-1 focus:outline-none text-base resize-none" @keydown="onKeyDown" />
    <HeadlessPopover v-slot="{ open, close }" class="relative flex items-center">
      <HeadlessPopoverButton
        :class="open ? 'text-white' : 'text-white/90'"
        class="group inline-flex items-center rounded-md text-base font-medium hover:text-blue-500 focus:outline-none focus-within:text-blue-500"
      >
        <Icon name="ph:gif-duotone" size="2.5rem" />
      </HeadlessPopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <HeadlessPopoverPanel
          class="fixed md:absolute bottom-1/2 max-md:translate-y-1/2 md:bottom-[calc(100%_+_18px)] max-md:left-0 md:-right-4 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-xl"
        >
          <Teleport v-if="!isMD" to="body">
            <Transition appear name="fade">
              <div class="fixed inset-0 bg-black/50" @click="close()" />
            </Transition>
          </Teleport>
          <ChatGiftSearch
            @pick="(data) => {
              close()
              $emit('send', data)
            }"
          />
        </HeadlessPopoverPanel>
      </transition>
    </HeadlessPopover>
    <button type="button" class="rounded-full shrink-0 my-2 flex justify-center items-center hover:text-blue-500 focus-within:text-blue-500" aria-label="Send" @click="sendMessage">
      <Icon name="iconamoon:send-fill" size="2rem" />
    </button>
  </div>
</template>
