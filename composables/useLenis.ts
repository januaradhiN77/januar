import Lenis from '@studio-freight/lenis'

export default function () {
  const lenis = useState<Lenis | null>('lenis', () => null)

  function raf(time: number) {
    lenis.value?.raf(time * 1000)
  }

  const { $ScrollTrigger } = useNuxtApp()

  function createLenis() {
    lenis.value = new Lenis()
    lenis.value.on('scroll', $ScrollTrigger.update)
    useGsap.ticker.add(raf)
    useGsap.ticker.lagSmoothing(0)
  }

  function destroyLenis() {
    if (lenis.value) {
      lenis.value.destroy()
      useGsap.ticker.remove(raf)
    }
  }

  onMounted(() => {
    createLenis()
  })

  // useNuxtApp().hook('page:finish', () => {
  //   destroyLenis()
  //   createLenis()
  // })

  onBeforeUnmount(() => {
    destroyLenis()
  })
}
