// import {
//   breakpointsTailwind,
//   useBreakpoints,
//   useEventListener,
// } from '@vueuse/core'

// export default function (sectionData?: Ref<HTMLElement[] | null>) {
//   useHead({
//     htmlAttrs: { class: 'md:overflow-hidden' },
//   })

//   const device = useDevice()
//   const breakpoints = useBreakpoints(breakpointsTailwind)
//   const isMedium = () => breakpoints.greaterOrEqual('md').value
//   const listeners: (() => void)[] = []
//   const touchY = ref<number>(0)
//   const prevTime = ref<number>(new Date().getTime())
//   const {
//     goToNextSection,
//     goToPrevSection,
//     goToSection,
//     goToFirstSection,
//     goToLastSection,
//     currentSectionNode,
//     sections,
//     currentSection,
//   } = useSections(sectionData)

//   function getEventPath(
//     event: Event & { path?: EventTarget[] },
//   ): (EventTarget | null)[] {
//     if (!(event instanceof Event)) return []

//     return (
//       (Array.isArray(event.path) && event.path)
//       || (typeof event.composedPath === 'function' && event.composedPath())
//       || (function fallback() {
//         const path = []
//         let target = event.target

//         while (
//           target !== window
//           && (target as HTMLElement).parentNode !== null
//         ) {
//           path.push(target)
//           target = (target as HTMLElement).parentNode
//         }

//         path.push(document, window)

//         return path
//       })()
//     )
//   }

//   function isScrollingTooFast(ms = 150, reset = true) {
//     const curTime = new Date().getTime()
//     const timeDiff = curTime - prevTime.value
//     const isTooFast = timeDiff < ms
//     if (reset || !isTooFast) {
//       prevTime.value = curTime
//     }

//     return timeDiff < ms
//   }

//   function handleMouseWheel(event: WheelEvent) {
//     if (!isMedium() || event.ctrlKey || event.shiftKey) return
//     if (isScrollingTooFast()) return

//     switch (Math.sign(event.deltaY)) {
//       case 1:
//         return goToNextSection()
//       case -1:
//         return goToPrevSection()
//     }
//   }

//   function handleTouchstart(event: TouchEvent) {
//     if (!isMedium() || !(event.touches instanceof TouchList)) return
//     touchY.value = event.touches[0].clientY
//   }

//   function handleTouchMove(event: TouchEvent) {
//     if (
//       !isMedium()
//       || !(event.touches instanceof TouchList)
//       || isScrollingTooFast()
//     ) {
//       return
//     }

//     const curTouchY = event.changedTouches[0].clientY

//     if (touchY.value > curTouchY) goToNextSection()
//     else goToPrevSection()
//   }

//   function handleResize() {
//     if (!isMedium() && listeners.length) {
//       removeEvents()
//     }
//     else if (isMedium() && !listeners.length) {
//       registerEvents()
//     }

//     goToSection(undefined, false)
//   }

//   function handleKeyDown(event: KeyboardEvent) {
//     if (!isMedium() || !event) return

//     const SPACEBAR = [' ', 'Spacebar']
//     const isCommandKey = () => device.isMacOS && event.metaKey
//     const downwardKeys = [
//       'Down',
//       'ArrowDown',
//       'Right',
//       'PageDown',
//       'ArrowRight',
//     ]
//     const upwardKeys = ['Up', 'ArrowUp', 'Left', 'PageUp', 'ArrowLeft']
//     const isScrollableElemFocused = [
//       window?.document.body,
//       window?.document.documentElement,
//     ].includes(event.target as HTMLElement)

//     const inEventPath = (predicate: any) =>
//       getEventPath(event)
//         .filter((el: unknown) => el instanceof HTMLElement)
//         .some(predicate)

//     const isNavFocused = inEventPath(
//       (el: HTMLElement) => el && el.id === 'section-nav',
//     )
//     const isSectionFocused = inEventPath(
//       (el: HTMLElement) => el && el.dataset.section,
//     )
//     const isFormFocused = inEventPath(
//       (el: HTMLElement) => el && el.tagName === 'FORM',
//     )
//     const isButtonFocused = inEventPath(
//       (el: HTMLElement) => el && el.tagName === 'BUTTON',
//     )

//     if (
//       isFormFocused
//       || isScrollingTooFast(500, false)
//       || !(
//         isNavFocused
//         || isSectionFocused
//         || isScrollableElemFocused
//         || isButtonFocused
//       )
//     ) {
//       return
//     }

//     if (SPACEBAR.includes(event.key)) {
//       isCommandKey() ? goToLastSection() : goToNextSection()
//     }
//     else if (downwardKeys.includes(event.key)) {
//       event.preventDefault()
//       isCommandKey() ? goToLastSection() : goToNextSection()
//     }
//     else if (upwardKeys.includes(event.key)) {
//       event.preventDefault()
//       isCommandKey() ? goToFirstSection() : goToPrevSection()
//     }
//     else if (event.key === 'Home') {
//       event.preventDefault()
//       goToFirstSection()
//     }
//     else if (event.key === 'End') {
//       event.preventDefault()
//       goToLastSection()
//     }
//   }

//   const windowElement = ref<Window | null>(null)
//   const documentNode = ref<Document | null>(null)
//   const documentElement = ref<HTMLElement | null>(null)
//   onMounted(() => {
//     documentNode.value = document
//     documentElement.value = document.documentElement
//     windowElement.value = window
//   })

//   useEventListener(windowElement, 'resize', handleResize)

//   function registerEvents() {
//     listeners.push(
//       ...[
//         useEventListener(windowElement, 'keydown', handleKeyDown),
//         useEventListener(documentElement, 'wheel', handleMouseWheel, false),
//         useEventListener(
//           documentElement,
//           'mousewheel',
//           handleMouseWheel,
//           false,
//         ),
//         useEventListener(documentElement, 'touchstart', handleTouchstart),
//         useEventListener(documentElement, 'touchmove', handleTouchMove, {
//           passive: false,
//         }),
//       ],
//     )
//   }

//   function removeEvents() {
//     for (const listener of listeners) {
//       listener()
//     }

//     listeners.splice(0, listeners.length)
//   }

//   onMounted(() => {
//     if (isMedium()) registerEvents()
//   })

//   return { sections, currentSection, currentSectionNode }
// }
