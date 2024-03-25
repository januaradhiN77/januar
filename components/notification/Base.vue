<script lang="ts" setup>
import { useMouseInElement, useRafFn, useWindowFocus } from '@vueuse/core'
import { useNotifications } from '~~/store/notifications'

const props = defineProps<{
  icon: string
  color: string
  defaultTitle?: string
  notif: NotifData
}>()

defineEmits<{ (e: 'close'): void }>()
const { deleteNotif } = useNotifications()
const notif = ref<NotifData>(props.notif)
const lastTime = ref(0)
const { pause, resume } = useRafFn(() => {
  const now = Date.now()
  notif.value.remainingTime = Math.max(0, notif.value.remainingTime - (now - lastTime.value))
  lastTime.value = now
  if (notif.value.remainingTime <= 0) {
    pause()
    deleteNotif(props.notif.id)
  }
})

const focused = useWindowFocus()

const container = ref()
const { isOutside } = useMouseInElement(container)

function setState() {
  if (!isOutside.value || !focused.value) {
    pause()
  }
  else {
    lastTime.value = Date.now()
    resume()
  }
}

watch(isOutside, () => {
  setState()
})

watch(focused, () => {
  setState()
}, { immediate: false })

onMounted(() => {
  lastTime.value = Date.now()
  if (focused.value) {
    resume()
  }
})
</script>

<template>
  <div ref="container" class="pointer-events-auto overflow-hidden rounded-full bg-navy-3 shadow-md">
    <div class="flex items-center justify-between gap-3 overflow-hidden p-3">
      <div>
        <Icon :name="icon" class="inline-block h-6 w-6 self-center rounded-full p-1.5 text-white md:h-7 md:w-7" :class="color" />
      </div>
      <div :title="notif.message" class="line-clamp-2 min-h-0 w-full text-sm font-semibold text-slate-300 md:text-base">
        {{ notif.message }}
      </div>
      <button aria-label="Close notif" type="button" class="self-center" @click="() => $emit('close')">
        <Icon name="ic:round-close" class="mr-0.5 h-4 w-5 self-center md:h-6 md:w-6" />
      </button>
    </div>
    <!-- <div class="mx-[30px]">
      <div
        v-if="notif.duration != null && notif.remainingTime != null"
        :class="color"
        :style="{
          width: `${(notif.remainingTime / notif.duration) * 100}%`,
          opacity : `${(notif.remainingTime / notif.duration) * 100 < 5 ? (notif.remainingTime / notif.duration) * 100 / 5 : 1}`
        }"
        class="h-1 w-[50%] rounded-full border-slate-100 opacity-60 transition-[width,opacity] duration-300 ease-out"
      />
    </div> -->
  </div>
</template>
