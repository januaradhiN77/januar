<script lang="ts" setup>
const props = withDefaults(defineProps<{
  src: string
  autoplay?: boolean
  loop?: boolean
  speed?: number
  controls?: boolean
  worker?: boolean
  width?: string
  height?: string
}>(), {
  worker: true,
  speed: 1,
  controls: false,
  loop: true,
})

// import 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js'

// import '@dotlottie/player-component'

useHead({
  script: [
    {
      type: 'module',
      src: 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs',
    },
  ],
})

const player = ref<any>()
const ready = ref(false)
useEventListener(player, 'ready', () => {
  ready.value = true
  player.value?.setSpeed(props.speed)
  player.value?.setLooping(props.loop)
})

onBeforeUnmount(() => {
  if (player.value?.stop) {
    player.value?.stop()
  }
})
</script>

<template>
  <div :class="{ 'opacity-100': ready }" class="opacity-0 transition-opacity duration-300">
    <dotlottie-player ref="player" :autoplay="autoplay || undefined" :src="src" background="transparent" :style="{ width: width || '100%', height: height || '100%' }" :controls="controls || undefined" :worker="worker" />
  </div>
</template>
