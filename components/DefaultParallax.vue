<template>
  <ParallaxCard
    class="z-belowNav mx-auto aspect-[6/3] flex-1 px-20"
    card-class="overflow-hidden rounded-3xl bg-[url('https://atroposjs.com/images/header/atropos-bg.svg')] bg-cover"
    :perspective="1200"
    :max-rotate="{
      x : 15,
      y : 15
    }"
    :max-slide="{
      x : 1,
      y : 1
    }"
    :transition-duration="400"
    :use-card-shadow="false"
  >
    <img :data-offset="-4.5" src="https://atroposjs.com/images/header/atropos-bg.svg" class="absolute bottom-[-5%] left-[-5%] w-[110%] max-w-[110%] object-contain">
    <img :data-offset="-2.5" src="https://atroposjs.com/images/header/atropos-mountains.svg" class="absolute bottom-[-5%] left-[-5%] w-[110%] max-w-[110%] object-contain">
    <img :data-offset="0" src="https://atroposjs.com/images/header/atropos-forest-back.svg" class="absolute bottom-[-5%] left-[-5%] w-[110%] max-w-[110%] object-contain">
    <img :data-offset="2" src="https://atroposjs.com/images/header/atropos-forest-mid.svg" class="absolute bottom-[-5%] left-[-5%] w-[110%] max-w-[110%] object-contain">
    <img :data-offset="4" class="absolute bottom-[-5%] left-[-5%] w-[110%] max-w-[110%] object-contain" src="https://atroposjs.com/images/header/atropos-forest-front.svg">
  </ParallaxCard>
</template>
