export default function () {
  let currentAnimationId = 0
  function isMotionReduced () {
    return matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  /**
   * It scrolls to a target position on the page, with a smooth animation
   * @param {number} scrollTargetY - The target scrollY property of the window
   * @param [maxDuration=800] - The maximum duration of the animation in milliseconds.
   */

  // easeInOutQuad
  function ease (x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2
  }

  function smoothScroll (scrollTargetY: number, maxDuration = 800) {
    currentAnimationId += 1
    const id = currentAnimationId

    let animationFrameId: number
    let currentTime = 0
    const speed = 1000
    const scrollPos = scrollY || document.documentElement.scrollTop
    const derivedSpeed = (isMotionReduced() ? speed * 3 : speed)
    const time = Math.max(
      0.1,
      Math.min(Math.abs(scrollPos - scrollTargetY) / derivedSpeed, maxDuration / 1000)
    )

    function runAnimation () {
      cancelAnimationFrame(animationFrameId)
      if (id !== currentAnimationId) return
      currentTime += 1 / 60
      const p = currentTime / time
      if (p < 1) {
        const t = ease(p)
        animationFrameId = requestAnimationFrame(runAnimation)
        scrollTo(0, scrollPos + (scrollTargetY - scrollPos) * t)
      } else {
        scrollTo(0, scrollTargetY)
      }
    }
    runAnimation()
  }

  return { smoothScroll }
}
