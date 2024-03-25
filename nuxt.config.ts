// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      tenor_key: process.env.TENOR_API,
    },
  },
  modules: [
    'nuxt-lazy-load',
    'nuxt-headlessui',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@pinia/nuxt',
    '@nuxtjs/device',
    '@hypernym/nuxt-gsap',
    '@nuxt/image',
  ],
  image: {
    provider: 'imagekit',
    imagekit: {
      baseURL: 'https://ik.imagekit.io/crstlnz',
    },
    quality: 100,
    placeholder: 10,
    format: ['webp'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536,
    },
  },
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/lenis-scroll.css',
    '~/assets/css/style.scss',
    '~/assets/css/transition.scss',
    '~/assets/css/fonts.scss',
  ],
  app: {
    rootId: 'app',
  },
  colorMode: {
    preference: 'dark',
    fallback: 'light',
    classSuffix: '',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['dotlottie-player'].includes(tag),
    },
  },
  typescript: {
    shim: false,
    strict: true,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
      },
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  gsap: {
    composables: true,
    extraEases: {
      custom: true,
    },
    extraPlugins: {
      scrollTrigger: true,
    },
  },
})
