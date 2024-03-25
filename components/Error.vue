<script lang="ts" setup>
const props = defineProps({
  error: {
    type: Object,
    default() {
      return {}
    },
  },
})

const message = computed(() => {
  if (props.error?.statusCode === 404) {
    return 'Page not found!'
  }
  else {
    return 'An error occured!'
  }
})
// const message = msg !== id ? msg : 'An error occured!'
const messageNode = ref<HTMLElement | null>(null)
interface ErrorMessage {
  message: string
  code: number
  lotie: string
  class: string
  langKey: string
}

function getError(error: any): ErrorMessage {
  switch (error?.statusCode) {
    case 404 :
      return {
        message: 'Page not found!',
        code: 404,
        class: '',
        lotie: 'https://lottie.host/7d064435-bc57-4419-a258-90649de931d9/8fQzNsuP9l.lottie',
        langKey: 'error.404',
      }
    default:
      return {
        message: 'An error occured!',
        code: 520,
        class: '',
        lotie: 'https://lottie.host/7ef28f98-9288-484f-ad71-4eedff5260cc/vAZ0wRnLY2.lottie',
        langKey: 'error.520',
      }
  }
}

const errorData = getError(props.error)
onMounted(() => {
  // if (messageNode.value) { messageNode.value.innerHTML = messageNode.value.textContent?.replace(/\S/g, '<span class=\'letter\'>$&</span>') ?? '' }
  if (messageNode.value) {
    const texts = messageNode.value.innerHTML.split(' ')
    messageNode.value.innerHTML = texts.map((i) => {
      return `<div>${i.split('').map(t => `<span class='letter inline-block'>${t}</span>`).join('')}</div>`
    }).join('<span class=\'letter\'> </span>')
  }
  // const { $CustomEase } = useNuxtApp()
  // $CustomEase.create('bounce', '.175,.885,.32,1.275')

  useGsap.to('.letter', {
    stagger: {
      each: 0.03,
      repeat: -1,
      yoyo: true,
    },
    translateY: -20,
    ease: `elastic`,
    duration: 2,
    repeat: 1,
    yoyo: true,
  })
})
</script>

<template>
  <div class="mx-10 flex min-h-[100vh] py-10 items-center justify-center">
    <div class="mb-20 space-y-10">
      <DotLottie
        class="m-auto aspect-square max-w-[85%] w-[600px]"
        autoplay
        loop
        :src="errorData.lotie"
      />
      <div ref="messageNode" :class="error.statusCode === 404 ? 'text-[#b0e7fd]' : 'text-slate-200'" class="flex flex-wrap justify-center gap-2 pb-10 text-center text-4xl font-semibold xl:text-5xl [&>div]:inline-block">
        {{ message }}
      </div>
      <div class="text-center">
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
