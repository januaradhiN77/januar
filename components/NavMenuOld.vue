<script setup lang="ts">
import { onClickOutside, useScroll } from '@vueuse/core'

// const color = ref<string>()
const classColor = useState<string>('navClassColor')
const colorMode = useColorMode()
const isOpen = ref<boolean>(false)
const menu = ref<HTMLElement | null>(null)
const menuButton = ref<HTMLElement | null>(null)
const doc = ref<Window | null>(null)
const { isScrolling } = useScroll(doc)
onMounted(() => {
  doc.value = window
})

const route = useRoute()

watch(route, () => {
  if (isOpen.value) toggleMenu()
})

watch(isScrolling, (scrolling) => {
  if (scrolling) { if (isOpen.value) toggleMenu() }
})

function toggleMenu () {
  // console.log('TOGGLE', isOpen.value, '=>', !isOpen.value)
  isOpen.value = !isOpen.value
}

function toggleDark () {
  if (colorMode.value === 'dark') colorMode.preference = 'light'
  else colorMode.preference = 'dark'
}
let clean: (() => void) | undefined
watch(isOpen, (val) => {
  if (val) {
    clean = onClickOutside(menu, () => {
      toggleMenu()
    }, { ignore: [menuButton] })
  } else if (clean) clean()
})

defineExpose({ isOpen, toggleMenu })
</script>

<template>
  <div class="relative flex gap-4">
    <button
      ref="menuButton"
      type="button"
      aria-label="Open Menu"
      class="relative z-50 cursor-pointer text-2xl text-blue-400 dark:border-slate-100"

      @click="toggleMenu"
    >
      <div
        class="flex h-8 flex-col items-end justify-between py-1 [&>span]:transition-all [&>span]:duration-200"
      >
        <span
          class="inline-block h-1.5 w-12 rounded bg-blue-500 dark:bg-slate-400"
          :class="{ '!h-1 w-8 translate-y-2.5 rotate-45': isOpen, [classColor] : classColor !== undefined && !isOpen }"
        />
        <span
          class="inline-block h-1.5 w-8 rounded bg-blue-500 dark:bg-slate-400"
          :class="{ '!h-1 -translate-y-2.5 -rotate-45': isOpen, [classColor] : classColor !== undefined && !isOpen }"
        />
        <!-- :style="color && !isOpen ? { background: color } : undefined" -->
      </div>
    </button>
    <nav
      id="nav"
      ref="menu"
      :class="{ open: isOpen }"
      class="absolute -top-11 -right-11 min-w-[24rem] origin-top-right overflow-hidden bg-neutral-95 p-14 drop-shadow-md dark:bg-neutral-20"
    >
      <div id="nav-container" :class="{ open: isOpen }" class="flex min-h-[20rem] flex-col justify-between pt-6">
        <ul class="nav-menu relative space-y-6 [&>li]:text-2xl ">
          <li class="nav-items">
            <NuxtLink to="projects">
              <span>My Projects </span>
            </NuxtLink>
          </li>
          <li class="nav-items">
            <NuxtLink to="aws">
              <span>Contacts</span>
            </NuxtLink>
          </li>
        </ul>
        <div class="nav-menu flex-reverse mt-20 flex items-center gap-6">
          <div class="flex gap-6 border-r-2 pr-6 dark:border-slate-600">
            <a
              href="https://github.com/crstlnz"
              aria-label="Github Profile"
              target="_blank"
              class="relative flex h-6 w-6 cursor-pointer items-center border-slate-800 text-2xl hover:text-blue-500 dark:border-slate-100"
            >
              <Icon
                name="uil:github"
              />
            </a>
            <a
              href="https://github.com/crstlnz"
              aria-label="Twitter Profile"
              target="_blank"
              class="relative flex h-6 w-6 cursor-pointer items-center border-slate-800 text-2xl hover:text-blue-500 dark:border-slate-100"
            >
              <Icon
                name="uil:twitter"
              />
            </a>
          </div>
          <div class="flex gap-6">
            <button
              type="button"
              aria-label="Toggle Dark Mode"
              class="relative flex h-6 w-6 cursor-pointer items-center border-slate-800 text-2xl hover:text-blue-500 dark:border-slate-100"
              @click="toggleDark"
            >
              <Icon
                name="material-symbols:g-translate"
              />
            </button>
            <button
              type="button"
              aria-label="Toggle Dark Mode"
              class="relative flex h-6 w-6 cursor-pointer items-center border-slate-800 text-2xl hover:text-blue-500 dark:border-slate-100"
              @click="toggleDark"
            >
              <Icon
                name="ph:moon-bold"
                class="absolute left-1/2 top-1/2 !hidden -translate-x-1/2 -translate-y-1/2 dark:!inline-block"
              />
              <Icon name="ph:sun-bold" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 dark:!hidden" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
#nav {
  clip-path: circle(80px at calc(100% - 55px) 55px);
  opacity: 0;
  visibility: hidden;
  border-radius: 50% 0.2rem 50% 50%;
  transition-duration: 300ms;
  transition-property: clip-path, border-radius, opacity, visibility;
  transition-timing-function: ease;

  &.open {
    visibility: visible;
    opacity: 1;
    clip-path: circle(75% at 50% 50%);
    border-radius: 0.2rem 0.2rem 0.2rem 0.2rem;
  }

  #nav-container {
    transition-property: unset;
    transition-duration: unset;
    transition-timing-function: unset;

    .nav-menu {
      transform: translateY(60px);
      opacity: 0;
      transition-property: transform, opacity;
      transition-duration: 120ms;
      transition-timing-function: ease-out;

      &:nth-child(1) {
        transition-delay: 0;
      }

      &:nth-child(2) {
        transition-delay: 0;
      }

      .nav-items {
        a {
          @apply text-blue-500 dark:text-slate-400;
          position: relative;
          text-decoration: none;
          display: inline-block;

          span {
            &::before {
              @apply bg-blue-100 dark:bg-slate-700;
              content: "";
              pointer-events: none;
              position: absolute;
              left: 12px;
              bottom: -25%;
              width: calc(100% - 8px);
              height: calc(100% - 8px);
              z-index: -1;
              transition-property: width, height, left, bottom;
              transition-duration: 350ms;
              transition-timing-function: cubic-bezier(0.25, 0.1, 0, 1.55);
            }
          }

          &:hover {
            span {
              &::before {
                left: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }

    &.open {
      .nav-menu {
        opacity: 1;
        transform: translateY(0);
        transition-property: transform, opacity;
        transition-duration: 300ms;
        transition-timing-function: cubic-bezier(0, 0.645, 0, 0.995);

        &:nth-child(1) {
          transition-delay: 300ms;
        }

        &:nth-child(2) {
          transition-delay: 450ms;
        }
      }
    }
  }
}
</style>
