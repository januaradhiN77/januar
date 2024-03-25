<script lang="ts" setup>
import multiavatar from '@multiavatar/multiavatar/esm'
import { v4 as uuid } from 'uuid'
import { useChatUser } from '~/store/chatUser'

definePageMeta({
  pageTransition: {
    name: 'scalein',
  },
})

const chatUser = useChatUser()
const { setName, setAvatar } = chatUser
const { name } = storeToRefs(chatUser)
const nameError = ref(false)
const nameInput = ref('')
const avatarId = ref(uuid())
const svgCode = computed(() => {
  return multiavatar(avatarId.value)
})

watch(nameInput, () => {
  nameError.value = false
})

const { $gsap } = useNuxtApp()
let rotateAnimation: gsap.core.Tween
let scaleAnimation: gsap.core.Tween

function refreshAvatar() {
  avatarId.value = uuid()
  if (rotateAnimation?.isActive()) rotateAnimation.kill()
  if (scaleAnimation?.isActive()) scaleAnimation.kill()
  rotateAnimation = $gsap.fromTo('.rotate-btn', {
    rotation: 0,
  }, {
    duration: 0.7,
    rotation: 360,
  })

  scaleAnimation = $gsap.to('.refresh-btn', {
    scale: 0.75,
    duration: 0.3,
  })

  scaleAnimation.then(() => {
    $gsap.fromTo('.refresh-btn', {
    }, {
      duration: 0.3,
      scale: 1,
    })
  })
}

function join() {
  if (!nameInput.value) {
    nameError.value = true
  }
  else {
    setName(nameInput.value)
    setAvatar(avatarId.value)
  }
}

useHead({
  title: 'Chat Room',
})
</script>

<template>
  <div>
    <Transition name="fade">
      <div v-if="!name" class="flex min-h-[100vh] w-full justify-center items-center pb-10">
        <div class="flex flex-col items-center gap-8">
          <div class="relative">
            <div class="w-40 h-40 rounded-full overflow-hidden" v-html="svgCode" />
            <button type="button" class="refresh-btn !ring-navy-1 !ring-4 rounded-full w-7 h-7 bg-white text-neutral-800 right-4 bottom-0 absolute" aria-label="Refresh" @click="refreshAvatar">
              <Icon name="material-symbols:refresh" class="rotate-btn w-full h-full p-1" />
            </button>
          </div>
          <div class="flex gap-3 items-center">
            <Icon name="ph:chat-teardrop-dots-fill" size="3rem" />
            <span class="text-5xl font-simplify">Chat Room</span>
          </div>
          <div>
            <input v-model="nameInput" type="text" placeholder="Enter Name" :class="{ 'outline outline-4 outline-offset-4 outline-red-500': nameError }" class="bg-white/10 py-2 focus:!outline focus:!outline-white/10 focus:!outline-4 !outline-offset-4 px-5 text-center rounded-full " @keyup.enter="join">
          </div>
          <button type="button" class="bg-navy-3 rounded-full px-5 py-1.5 text-sm" @click="join">
            Join
          </button>
        </div>
      </div>
      <ChatRoom v-else>
        oke {{ name }}
      </ChatRoom>
    </Transition>
  </div>
</template>
