<script lang="ts" setup>
import { useTimeoutFn } from '@vueuse/core'

const fontUrl = 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap'
useHead({
  titleTemplate: (title: any) => title ? `${title} - Crystalenz Portfolio` : 'Crystalenz, Fullstack Developer',
  meta: [
    { name: 'description', content: 'Online Portfolio of Crystalenz, Fullstack Developer' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { name: 'charset', content: 'utf-8' },
    { name: 'theme-color', content: '#162238' },
  ],
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: fontUrl,
      as: 'style',
    },
  ],
})

// TODO: Remove when https://github.com/vuejs/core/issues/5513 fixed
const key = ref(0)
const messages = [
  'Uncaught NotFoundError: Failed to execute \'insertBefore\' on \'Node\': The node before which the new node is to be inserted is not a child of this node.', // chromium based
  'NotFoundError: The object can not be found here.', // safari
]
if (typeof window !== 'undefined') {
  // @ts-expect-error using arbitrary window key
  if (!window.__vue5513) {
    window.addEventListener('error', (event) => {
      if (messages.includes(event.message)) {
        event.preventDefault()
        console.warn(
          'Rerendering layout because of https://github.com/vuejs/core/issues/5513',
        )
        key.value++
      }
    })
  }
  // @ts-expect-error using arbitrary window key
  window.__vue5513 = true
}

const mounted = ref(false)
const hideSplashScreen = ref(false)
const splashScreenFinish = useState('spfinish', () => false)
function openSplashScreen() {
  mounted.value = true
  setTimeout(() => {
    splashScreenFinish.value = true
    setTimeout(() => {
      hideSplashScreen.value = true
    }, 300) // match it with animation
  }, 700)
}

useTimeoutFn(() => {
  openSplashScreen()
}, 750)

useLenis()
</script>

<template>
  <div id="app" class="max-w-[2400px] mx-auto overflow-y-clip">
    <NotificationView />
    <div v-if="!hideSplashScreen" class="bg-secondary inset-0 fixed z-aboveAll flex justify-center items-center splashscreen-2 min-h-[100dvh] duration-500" :class="{ open: mounted }">
      <svg id="a" class="floating w-40 max-w-[90vw] opacity-85 text-[#1a2a46]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 601.01 869.76"><path fill="currentColor" d="M527.29 824.76H10.59C4.77 824.76 0 829.52 0 835.35c0 .35.02.69.05 1.03.01.14.04.28.06.42.03.19.05.39.09.58.04.18.08.36.13.53.04.14.07.28.11.42.06.21.13.41.21.61.04.1.07.2.11.3.09.22.19.44.29.66.03.07.06.13.1.2.12.24.25.47.38.69.02.04.05.08.07.12.15.24.31.48.48.7.01.02.02.03.04.05.18.24.37.48.57.7 2.19 2.85 8.09 6.37 19.39 9.9 2.31.72 4.71 1.1 7.13 1.1h82.57c5.22.24 11.75 5.4 17.88 9.88 5.81 4.24 12.8 6.54 19.99 6.53l119.31-.09 119.31.09c7.19 0 14.18-2.29 19.99-6.53 6.13-4.48 12.66-9.64 17.88-9.88h82.57c2.42 0 4.82-.38 7.13-1.1 11.3-3.52 17.2-7.05 19.39-9.9.2-.23.39-.46.57-.7.01-.02.02-.03.04-.05.17-.23.33-.46.48-.7.02-.04.05-.08.07-.12.14-.23.26-.45.38-.69.03-.06.06-.13.1-.2.1-.22.2-.44.29-.66.04-.1.07-.2.11-.3.07-.2.15-.4.21-.61.04-.14.07-.28.11-.42.04-.18.09-.35.13-.53.04-.19.06-.39.09-.58.02-.14.05-.28.06-.42.03-.34.05-.68.05-1.03 0-5.82-4.76-10.59-10.59-10.59ZM473.93 461.21c-.09-20.35-.18-40.74-.17-61.19-.28-5.52-6.1-13.61-12.54-13.65-128.22-.01-256.45.01-384.66.09h-.17c-6.5.7-15.45 8.91-14.58 16.65-.88 85.94.84 194.2 3.16 285.54 1.52 28.51 2.5 59.34 12.84 85.11l-.35-.23c4.67 12.89 16.97 26.47 29.69 31.33 2.87 1.1 5.92 1.6 8.99 1.6h69.08c39.45.08 88.17.09 143.61 0h91.94c4.11 0 8.19-.85 11.91-2.58 11.65-5.43 22.55-17.76 27.09-29.66.02-.01.03-.03.05-.04l.09-.31c.04-.11.09-.23.13-.34l-.04.03a59.17 59.17 0 0 0 2.11-9.8c2.26-18.07 4.09-36.1 5.59-54.1 190.23-6.64 162.84-239.95 6.21-248.45Zm-2.65 194.2c2.28-46.23 2.8-92.39 2.81-138.68 2.67.18 5.4.54 8.14 1.08 15.47 3.06 28.23 10.11 37.37 19.45 52.16 46.81 18.49 115.89-48.32 118.15ZM182.82 218.12c-14.12-22.08-14.64-40.16-14.12-48.71.96-15.71 7.17-27.68 16.24-45.18 11.62-22.42 18.14-25.39 24.71-44.47 3.54-10.27 7.11-20.66 5.65-33.18-3.04-25.95-25.52-42.01-32.47-46.59 5.1 10.7 10.81 26.84 9.18 45.88-1.17 13.69-5.46 21.07-18.35 49.41-15.87 34.91-23.81 52.55-24 62.12-.28 14.44 5.33 35.12 33.18 60.71ZM240 168c-18.41 30.86-27.62 46.29-27.53 64.94.14 27.44 16.33 48.32 20.47 53.65 11.65 15.02 25.08 23.33 33.18 27.53-7.69-8.5-24.6-29.71-25.41-59.29-.65-23.69 9.3-42.05 14.82-52.24 14.01-25.84 25.13-25.31 38.12-52.24 4.58-9.5 11.09-23.38 11.29-42.35.09-8.88.29-27.62-12.71-45.18-13.99-18.89-34.12-24.08-40.24-25.41 5.31 4.43 15.07 13.84 20.47 28.94 1.47 4.11 5.71 17.3 2.12 37.41-4.21 23.56-14.53 30.61-34.59 64.24ZM349.41 309.88c-6.04-8.46-14.81-23.05-19.06-43.06-2.29-10.8-3.89-18.36-2.12-28.24 3.26-18.12 14.22-23.69 23.74-48.07 4.71-12.06 5.73-16.44 5.91-19.7.74-13.71-5.53-24.85-10-31.2-1.45 5.08-3.92 12.71-8.03 21.5-7.2 15.41-13.43 21.53-19.39 32.28 0 0-9.95 18.73-12 40.24-3.46 36.2 30.48 67.28 40.94 76.24Z" style="stroke-width:0" /></svg>
    </div>
    <div v-if="!hideSplashScreen" :class="{ open: mounted }" class="bg-navy-4 inset-0 fixed z-aboveAll flex justify-center items-center splashscreen min-h-[100dvh]">
      <svg id="a" class="floating w-40 max-w-[90vw] opacity-60 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 601.01 869.76"><path fill="currentColor" d="M527.29 824.76H10.59C4.77 824.76 0 829.52 0 835.35c0 .35.02.69.05 1.03.01.14.04.28.06.42.03.19.05.39.09.58.04.18.08.36.13.53.04.14.07.28.11.42.06.21.13.41.21.61.04.1.07.2.11.3.09.22.19.44.29.66.03.07.06.13.1.2.12.24.25.47.38.69.02.04.05.08.07.12.15.24.31.48.48.7.01.02.02.03.04.05.18.24.37.48.57.7 2.19 2.85 8.09 6.37 19.39 9.9 2.31.72 4.71 1.1 7.13 1.1h82.57c5.22.24 11.75 5.4 17.88 9.88 5.81 4.24 12.8 6.54 19.99 6.53l119.31-.09 119.31.09c7.19 0 14.18-2.29 19.99-6.53 6.13-4.48 12.66-9.64 17.88-9.88h82.57c2.42 0 4.82-.38 7.13-1.1 11.3-3.52 17.2-7.05 19.39-9.9.2-.23.39-.46.57-.7.01-.02.02-.03.04-.05.17-.23.33-.46.48-.7.02-.04.05-.08.07-.12.14-.23.26-.45.38-.69.03-.06.06-.13.1-.2.1-.22.2-.44.29-.66.04-.1.07-.2.11-.3.07-.2.15-.4.21-.61.04-.14.07-.28.11-.42.04-.18.09-.35.13-.53.04-.19.06-.39.09-.58.02-.14.05-.28.06-.42.03-.34.05-.68.05-1.03 0-5.82-4.76-10.59-10.59-10.59ZM473.93 461.21c-.09-20.35-.18-40.74-.17-61.19-.28-5.52-6.1-13.61-12.54-13.65-128.22-.01-256.45.01-384.66.09h-.17c-6.5.7-15.45 8.91-14.58 16.65-.88 85.94.84 194.2 3.16 285.54 1.52 28.51 2.5 59.34 12.84 85.11l-.35-.23c4.67 12.89 16.97 26.47 29.69 31.33 2.87 1.1 5.92 1.6 8.99 1.6h69.08c39.45.08 88.17.09 143.61 0h91.94c4.11 0 8.19-.85 11.91-2.58 11.65-5.43 22.55-17.76 27.09-29.66.02-.01.03-.03.05-.04l.09-.31c.04-.11.09-.23.13-.34l-.04.03a59.17 59.17 0 0 0 2.11-9.8c2.26-18.07 4.09-36.1 5.59-54.1 190.23-6.64 162.84-239.95 6.21-248.45Zm-2.65 194.2c2.28-46.23 2.8-92.39 2.81-138.68 2.67.18 5.4.54 8.14 1.08 15.47 3.06 28.23 10.11 37.37 19.45 52.16 46.81 18.49 115.89-48.32 118.15ZM182.82 218.12c-14.12-22.08-14.64-40.16-14.12-48.71.96-15.71 7.17-27.68 16.24-45.18 11.62-22.42 18.14-25.39 24.71-44.47 3.54-10.27 7.11-20.66 5.65-33.18-3.04-25.95-25.52-42.01-32.47-46.59 5.1 10.7 10.81 26.84 9.18 45.88-1.17 13.69-5.46 21.07-18.35 49.41-15.87 34.91-23.81 52.55-24 62.12-.28 14.44 5.33 35.12 33.18 60.71ZM240 168c-18.41 30.86-27.62 46.29-27.53 64.94.14 27.44 16.33 48.32 20.47 53.65 11.65 15.02 25.08 23.33 33.18 27.53-7.69-8.5-24.6-29.71-25.41-59.29-.65-23.69 9.3-42.05 14.82-52.24 14.01-25.84 25.13-25.31 38.12-52.24 4.58-9.5 11.09-23.38 11.29-42.35.09-8.88.29-27.62-12.71-45.18-13.99-18.89-34.12-24.08-40.24-25.41 5.31 4.43 15.07 13.84 20.47 28.94 1.47 4.11 5.71 17.3 2.12 37.41-4.21 23.56-14.53 30.61-34.59 64.24ZM349.41 309.88c-6.04-8.46-14.81-23.05-19.06-43.06-2.29-10.8-3.89-18.36-2.12-28.24 3.26-18.12 14.22-23.69 23.74-48.07 4.71-12.06 5.73-16.44 5.91-19.7.74-13.71-5.53-24.85-10-31.2-1.45 5.08-3.92 12.71-8.03 21.5-7.2 15.41-13.43 21.53-19.39 32.28 0 0-9.95 18.73-12 40.24-3.46 36.2 30.48 67.28 40.94 76.24Z" style="stroke-width:0" /></svg>
    </div>

    <NuxtLoadingIndicator
      :height="4"
    />
    <NuxtLayout>
      <NuxtPage
        :key="key"
      />
    </NuxtLayout>
    <!-- <NuxtLayout>
      <NuxtPage
        :key="key"
        :transition="{
          name: 'page',
          mode: 'out-in',
        }"
      />
    </NuxtLayout> -->
  </div>
</template>

<style lang="scss">
.coffee {
  -webkit-mask-image: url(https://res.cloudinary.com/haymzm4wp/image/upload/v1691761221/assets/img/jkt48textlogo_p0hagz.png);
  mask-image: url(https://res.cloudinary.com/haymzm4wp/image/upload/v1691761221/assets/img/jkt48textlogo_p0hagz.png);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: contain;
}

.floating {
    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-top: 5px;
}

@keyframes floating {
    0% { transform: translate(0,  0px); }
    50%  { transform: translate(0, 15px); }
    100%   { transform: translate(0, -0px); }
}

.splashscreen {
  clip-path: inset(0% 0% 0% 0%);
  transition:clip-path 1s cubic-bezier(0.25, 1, 0.5, 1);
  &.open {
    clip-path: inset(0% 0% 100% 0%);
  }
}

.splashscreen-2 {
  clip-path: inset(0% 0% 0% 0%);
  transition:clip-path 1s cubic-bezier(0.77,0,0.18,1);
  &.open {
    clip-path: inset(0% 0% 100% 0%);
  }
}
</style>
