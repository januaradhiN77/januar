<script lang="ts" setup>
defineProps({
  error: {
    type: Object,
    default() {
      return {}
    },
  },
})

// const errorNode = ref<HTMLElement>()
// useMotion(errorNode, {
//   initial: {
//     opacity: 0,
//     y: 40,
//   },
//   enter: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: {
//       delay: 200,
//       duration: 800,
//       ease: (x: number) => 1 - (1 - x) ** 4,
//     },
//   },
// })

// console.log(props.error)
const errorNode = ref()
</script>

<template>
  <div class="flex h-full w-full items-center justify-center">
    <Error ref="errorNode" :error="error" />
  </div>
</template>
