<script setup lang="ts">
const emit = defineEmits<(e: 'pick', msg: Chat.ImageMessage) => void >()
const search = useSessionStorage('search-gif', () => '')
const data = ref<any[]>([])
const next = ref<string | null>()
const infiniteFinish = ref(false)
const pending = ref(true)
const error = ref<any | null>(null)

const uri = computed(() => {
  if (search.value) {
    return `https://tenor.googleapis.com/v2/search`
  }
  else {
    return `https://tenor.googleapis.com/v2/featured`
  }
})

async function fetchTenor(n?: string | null, restart: boolean = false) {
  if (restart) {
    data.value = []
    infiniteFinish.value = false
  }
  pending.value = true
  error.value = null
  try {
    const res = await $fetch<{ results: any[], next?: string }>(uri.value, {
      query: {
        q: search.value,
        key: useRuntimeConfig().public.tenor_key,
        limit: 20,
        pos: n || undefined,
      },
    })
    data.value.push(...res.results)
    next.value = res.next
  }
  catch (e: any) {
    console.error(e)
    error.value = e
  }
  pending.value = false
}

const { start } = useTimeoutFn(() => {
  fetchTenor(null, true)
}, 500, { immediate: false })

watch(search, () => {
  start()
})

onMounted(() => {
  fetchTenor()
})

const gifScroller = ref<HTMLElement>()

function checkInfinite() {
  if (!gifScroller.value) return
  const percent = gifScroller.value.scrollTop / (gifScroller.value.scrollHeight - gifScroller.value.clientHeight) * 100
  if (percent >= 80) {
    if (next.value) {
      if (!pending.value) {
        fetchTenor(next.value)
      }
    }
    else {
      infiniteFinish.value = true
    }
  }
}

useEventListener(gifScroller, 'scroll', checkInfinite)

const bottomPadding = ref(0)
const container = ref<HTMLElement>()
function calculateBottomPadding() {
  const visualViewport = window.visualViewport
  if (!visualViewport) {
    return bottomPadding.value = 0
  }

  const contentHeight = container.value?.clientHeight || 0
  const h = ((window.innerHeight / 2) - contentHeight / 2) - 12
  let height = (window.innerHeight - visualViewport.height) / 2
  if (height <= 0) {
    height = 0
  }
  else
    if (height > h) height = h

  if (height === 0) {
    bottomPadding.value = height
  }
  else {
    bottomPadding.value = -height
  }
}
useEventListener(window, 'resize', () => {
  calculateBottomPadding()
})

function pickGif(data: any) {
  const gif = data.media_formats?.tinygif
  if (gif) {
    emit('pick', {
      url: gif.url,
      height: gif.dims?.[0],
      width: gif.dims?.[1],
    })
  }
}
</script>

<template>
  <div
    ref="container"
    :style="{
      transform: `translateY(${bottomPadding}px)`,
    }" class="transition-all duration-200 overflow-hidden rounded-lg shadow-lg ring-1 bg-navy-2 border border-white/5 ring-black/5 py-3 flex flex-col gap-2"
  >
    <div class="px-4 text-xl font-semibold flex justify-between items-center">
      <span>
        Gif Search
      </span>
      <span class="opacity-50 text-xs">
        <NuxtLink to="https://tenor.com/" target="_blank" class="!text-white">Tenor</NuxtLink></span>
    </div>
    <input v-model="search" class="mx-4 bg-white/5 focus-within:ring-1 ring-white/20 py-1 px-3 rounded-md focus:outline-none">
    <div ref="gifScroller" class="px-4 aspect-[6/7] md:aspect-video overflow-y-auto chat-scrollbar">
      <div v-if="pending && !data.length" key="loading" class="flex py-2 items-center justify-center h-full flex-wrap gap-3 animate-pulse font-semibold text-xl">
        Loading...
      </div>
      <div v-else-if="error" key="error" class="flex py-2 items-center justify-center h-full flex-wrap gap-3 animate-pulse font-semibold text-xl">
        An error occured!
      </div>
      <div v-else key="data" class="flex py-2 h-full flex-wrap gap-3">
        <button
          v-for="img in (data || [])"
          :key="img?.id || String(Math.random() * 1000)"
          type="button" class="relative inline-block transition-all duration-300 group hover:scale-110" @click="() => pickGif(img)"
        >
          <div class="rounded-md absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            class="rounded-md h-24 bg-white/5"
            :src="img?.media_formats?.nanogif?.url" :alt="img?.id"
            :style="{
              aspectRatio: `${img?.media_formats?.nanogif?.dims?.[0]}/${img?.media_formats?.nanogif?.dims?.[1]}`,
            }"
          >
        </button>
      </div>
    </div>
  </div>
</template>
