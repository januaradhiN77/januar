import type Lenis from '@studio-freight/lenis/types'

export function smoothScroll(el: HTMLElement | number) {
  const lenis = useState<Lenis | null>('lenis')
  const scrollPos = typeof el === 'number' ? el : (el?.offsetTop || 0)
  if (lenis.value) {
    lenis.value.scrollTo(scrollPos)
  }
  else {
    window.scrollTo({ top: scrollPos, behavior: 'smooth' })
  }
}
