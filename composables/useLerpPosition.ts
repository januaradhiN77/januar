interface LerpPositionOpts {
    x? : number,
    y? : number,
    minDiff? : number,
}

export default function (opts? : LerpPositionOpts) {
  const minDiff = opts?.minDiff ?? 0.0006
  const x = ref(opts?.x ?? 0)
  const y = ref(opts?.y ?? 0)

  const target = {
    x: x.value,
    y: y.value
  }

  function set (xx: number, yy :number) {
    target.x = xx
    target.y = yy
    generate()
  }

  function setX (xx: number) {
    target.x = xx
    generate()
  }
  function setY (yy: number) {
    target.y = yy
    generate()
  }

  function lerp (start: number, end: number, amt :number) {
    return (1 - amt) * start + amt * end
  }

  let animationId : number | null = null
  function generate () {
    function animate () {
      const pos = {
        x: lerp(x.value, target.x, 0.1),
        y: lerp(y.value, target.y, 0.1)
      }

      x.value = Math.abs(target.x - x.value) > minDiff ? pos.x : target.x
      y.value = Math.abs(target.y - y.value) > minDiff ? pos.y : target.y

      if (x.value !== target.x || y.value !== target.y) {
        animationId = requestAnimationFrame(animate)
      } else {
        animationId = null
      }
    }

    if (animationId === null) animate()
  }

  return { set, setX, setY, x, y }
}
