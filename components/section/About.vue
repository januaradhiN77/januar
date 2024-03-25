<!-- eslint-disable import/no-named-as-default -->
<script lang="ts" setup>
import type gsap from 'gsap'
import { NuxtLink } from '#components'
import myLang from '~~/assets/json/myLang.json'

const main = ref()
const { width } = useElementSize(main)

let ctx: gsap.Context
let aboutImage: gsap.core.Tween
onMounted(() => {
  ctx = useGsap.context(() => {
    useGsap
      .timeline({
        scrollTrigger: {
          trigger: '.lang-container',
          start: 'top bottom',
          end: 'bottom bottom',
          toggleActions: 'restart none none reset',
        },
      })
      .from('.lang-list-animate', {
        x: 50,
        stagger: 0.1,
        opacity: 0,
        duration: 1,
        delay: 0,
        ease: 'expo.out',
      })

    aboutImage = useGsap
      .fromTo(
        '#about-img',
        {
          rotate: 0,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.1,
          boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
        },
        {
          rotate: -12,
          boxShadow: '10px 50px 65px -15px rgba(0,0,0,0.7)',
          scale: 1.05,
          ease: 'bouncy',
          x: -21,
          y: -40,
          paused: true,
        },
      )
  }, main.value) // <- Scope!
})

const aboutCard = ref<HTMLElement>()
const isHover = useElementHover(aboutCard)

function isOver() {
  if (aboutCard.value) {
    const rect = aboutCard.value.getBoundingClientRect()
    const height = window.innerHeight / 2
    return rect.top < height
  }
  return false
}

const outFrame = ref(false)

const out = computed(() => {
  if (outFrame.value) {
    return !isHover.value
  }
  else {
    return false
  }
})

watch(out, (o) => {
  if (o) {
    aboutImage.play()
  }
  else {
    aboutImage.reverse()
  }
})

useEventListener(window, 'scroll', () => {
  outFrame.value = isOver()
})

const route = useRoute()
const name = computed(() => {
  if (route.query.n) {
    return 'Kelvin Geraldi'
  }
  else {
    return 'Crstlnz'
  }
})

onBeforeUnmount(() => {
  if (ctx) ctx.kill()
})
</script>

<template>
  <section
    id="about"
    ref="main"
    data-section="about"
    class="bg-gray-900 flex flex-col w-full px-4 md:px-6 xl:px-8 relative"
  >
    <ScrollButton
      to="#about"
      icon="mingcute:arrows-down-fill"
      icon-class="text-white"
      class="bg-secondary"
    />
    <div class="pt-16 md:pt-24">
      <div
        class="max-w-[87rem] mx-auto flex max-xl:flex-col gap-10 md:gap-14 xl:gap-20 flex-1 mt-10"
      >
        <div
          id="about-card"
          ref="aboutCard"
          class="glowing-card relative z-10 group max-w-full w-full xl:w-[700px] 2xl:w-[850px]"
        >
          <div class="absolute inset-0 glowing -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div class="flex-1 bg-navy-1 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-10 group cursor-pointer flex flex-col gap-4 ring-2 ring-transparent group-hover:-translate-y-2 ease-[--transition-bounce] transition-all duration-700">
            <div class="flex flex-col max-sm:gap-4 sm:flex-row items-center sm:justify-evenly">
              <div
                class="bg-black/20 max-sm:mt-4 w-28 xl:w-32 2xl:w-36 aspect-square relative shrink-0 rounded-xl"
              >
                <img
                  id="about-img"
                  src="https://avatars.githubusercontent.com/u/52141479"
                  alt="Github Profile Picture"
                  class="bg-white/50 w-full aspect-square absolute rounded-xl duration-700 object-cover"
                >
              </div>
              <div class="flex justify-center">
                <div class="text-xl md:text-3xl [&>b]:text-secondary-2">
                  Hello, I'm <b>{{ name }}</b><br>
                  I'm a <b>full-stack web developer</b>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-3">
              <NuxtLink
                to="https://github.com/crstlnz"
                title="GitHub Stats"
                class="flex flex-col max-md:-mx-5 md:flex-row items-start md:items-center justify-center hover md:hover:bg-black/20 rounded-xl transition-colors duration-300"
              >
                <div class="max-md:w-full md:h-36 lg:h-[10.5rem] xl:h-[9rem] 2xl:h-[10.5rem] aspect-[49.45/18] max-w-full">
                  <img
                    class="w-full"
                    src="https://statsme.vercel.app/api?username=crstlnz&hide=issues&count_private=true&show_icons=true&icon_color=ffb886&title_color=ffb886&hide_border=true&text_color=fcfeff&theme=transparent"
                  >
                </div>
                <div class="max-md:w-full md:h-36 lg:h-[10.5rem] xl:h-[9rem] 2xl:h-[10.5rem] aspect-[49.45/18] md:aspect-[9.09/5] max-w-full flex">
                  <div class="aspect-[9.09/5] max-h-full h-full">
                    <img
                      class="w-full"
                      src="https://statsme.vercel.app/api/top-langs/?username=crstlnz&layout=compact&theme=transparent&langs_count=6&exclude_repo=komik_scraper,daiakuma-drive&show_icons=true&icon_color=ffb886&title_color=ffb886&hide_border=true&text_color=fcfeff"
                    >
                  </div>
                </div>
              </NuxtLink>
              <NuxtLink to="https://wakatime.com/@crstlnz" class="md:w-full max-md:-mx-5 md:bg-black/20 rounded-xl">
                <div class="max-md:w-full md:h-[10.7rem] aspect-[511/175.05] max-w-full">
                  <img
                    class="w-full"
                    src="https://statsme.vercel.app/api/wakatime?username=crstlnz&hide_border=true&theme=transparent&icon_color=ffb886&title_color=ffb886&text_color=fcfeff&range=last_7_day&langs_count=4"
                  >
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="flex-1 flex flex-col">
          <div class="group tech-stacks relative flex-1 flex flex-col">
            <div
              class="skill-title container top-0 z-20 mx-auto flex items-end gap-3 pb-8 md:pb-10 text-2xl font-bold md:text-4xl cursor-pointer"
            >
              <div class="relative w-[3rem] h-[3rem] card">
                <div class="card-inner">
                  <img
                    :src="
                      $imagekitIcon(
                        'https://ik.imagekit.io/crstlnz/img/icons_javascript.png?updatedAt=1706206130202',
                      )
                    "
                    alt=""
                    class="absolute inset-0 card-front"
                  >
                  <img
                    :src="
                      $imagekitIcon(
                        'https://ik.imagekit.io/crstlnz/img/icons_typescript.png?updatedAt=1706206130201',
                      )
                    "
                    alt=""
                    class="absolute inset-0 card-back"
                  >
                </div>
              </div>
              <span
                class="text-slate-300 group-hover:text-slate-100 transition-colors duration-700"
              >My Tech Stacks</span>
            </div>
            <div
              class="relative flex-1 text-slate-300 group-hover:text-slate-100 cursor-pointer container mx-auto text-lg p-4 indent-8 text-justify leading-8 md:p-8 rounded-2xl bg-navy-1 ring-1 group-hover:ring-2 group-hover:ring-white/50 ring-white/10 group-hover:-translate-y-1 transition-[transform,box-shadow,color] ease-[--transition-bounce] duration-700"
            >
              With 4 years of experience for web development, I have very good
              skills for full-stack projects using JavaScript or TypeScript with
              Vue and Nuxt framework. I often use Vue, but I also explored React
              JS to gain flexibility in adapting to various project needs. I'm
              also actively expanding my skillset, having explored mobile
              development with Flutter and Jetpack Compose for Android.
            </div>
          </div>
          <div
            class="lang-container container mx-auto mt-8 flex flex-wrap gap-3"
          >
            <component
              :is="lang.img ? NuxtLink : 'div'"
              v-for="lang in myLang"
              :key="lang.title"
              :to="lang.resource"
              target="_blank"
              class="lang-list-animate rounded-md bg-blue-200/10 px-2 py-1.5 text-sm transition-[color,width] hover:bg-blue-300/40 text-slate-300 hover:text-slate-100"
            >
              {{ lang.title }}
            </component>
          </div>
        </div>
      </div>
      <RunningIcon
        class="py-24 md:py-32 w-full"
        :speed="(width * 0.03) / 100"
        :enable-hover="true"
        :min-gap="{
          all: 30,
          sm: 60,
          md: 60,
          lg: 70,
          xl: 75,
          xxl: 75,
        }"
        sizes="h-[80px] sm:h-[100px]"
        image-sizes="80px sm:100px"
        :data="myLang"
      />
    </div>
  </section>
</template>

<style lang="scss">
.tech-stacks {
  &:hover {
    .card-inner {
      transform: rotateY(180deg);
    }
  }
  .card {
    perspective: 1200px;
    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 1s;
      transform-style: preserve-3d;
      .card-front {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }
      .card-back {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        transform: rotateY(180deg);
      }
    }
  }
}

// .glowing-card {
//   position: relative;
//   z-index: 1000 !important;
//   &::before {
//     position: absolute;
//     content: '';
//     opacity: 0;
//     top: 10px;
//     left: 0;
//     right: 0;
//     z-index: -1000;
//     height: 100%;
//     width: 100%;
//     transform: scale(0.9) translateZ(0);
//     transition: 0.3s;
//     filter: blur(55px);
//     background: linear-gradient(
//       to left,
//       #ff5770,
//       #e4428d,
//       #c42da8,
//       #9e16c3,
//       #6501de,
//       #9e16c3,
//       #c42da8,
//       #e4428d,
//       #ff5770
//     );
//     background-size: 200% 200%;
//     animation: animateGlow 2s linear infinite;
//   }
//   &:hover {
//     &::before {
//       opacity: 1;
//     }
//   }
// }

.glowing {
  top: -7px;
  left: 0;
  right: 0;
  z-index: -1000;
  height: 100%;
  width: 100%;
  border-radius: 0.25rem;
  transform: scale(1) translateZ(0);
  filter: blur(18px);
  background: linear-gradient(
    to left,
    #f79d5d,
    #ffe1cc,
    #f79d5d,
    #f79d5d,
  );
  background-size: 200% 200%;
  animation: animateGlow 2.5s linear infinite;
}

@keyframes animateGlow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}
</style>
