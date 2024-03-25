let canvas
let ctx
let width = 0
let height = 0
let mouseXPlus = 0
let mouseXSmooth = 0
let mouseYSmooth = 0
let innerWidth = 0
const bubbles = []
let playAnimation = true

function lerp (a, b, t) {
  return a * (1 - t) + b * t
}

const R = function (x, y, t) {
  return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t))
}

const G = function (x, y, t) {
  return Math.floor(
    192 +
      64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
  )
}

const B = function (x, y, t) {
  return Math.floor(
    192 +
      64 *
        Math.sin(
          5 * Math.sin(t / 9) +
            ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
        )
  )
}

class Bubble {
  constructor () {
    this.x = random(0, 100)
    this.y = random(0, 100)
    this.deep = random(0, 100)
    this.speed = random(0.008, 0.012)
    this.size = random(12, 25) - (this.deep / 100) * 2
    this.color =
      'rgb(' +
      R(this.x, this.y, random(0, 100)) +
      ',' +
      G(this.x, this.y, random(0, 100)) +
      ',' +
      B(this.x, this.y, random(0, 100)) +
      ')'
  }

  draw (ctx) {
    this.y -= (this.speed * 2 * this.deep) / 100
    ctx.fillStyle = this.color
    ctx.globalAlpha = this.deep / 400
    ctx.beginPath()
    const y =
      (height * this.y) / 100 -
      ((mouseYSmooth / height) * 100 * 2 * this.deep) / 100
    ctx.arc(
      (width * this.x) / 100 +
        (((mouseXSmooth / innerWidth) * 100 - 50) * this.deep) / 100,
      y,
      this.size,
      0,
      2 * Math.PI
    )
    ctx.fill()

    if (y < -this.size) {
      this.y += 100 + (this.size / height) * 100 * 2
    }
  }
}

function random (min, max) {
  return Math.random() * (max - min) + min
}

function animate () {
  mouseXSmooth = lerp(mouseXSmooth, mouseXPlus, 0.008)
  mouseXPlus = lerp(mouseXPlus, 0, 0.008)
  ctx.clearRect(0, 0, width, height)
  for (const bubble of bubbles) {
    bubble.draw(ctx)
  }
  if(playAnimation) self.requestAnimationFrame(animate)
}

self.onmessage = function (ev) {
  if (ev.data.msg === 'offscreen') {
    canvas = ev.data.canvas
    ctx = canvas.getContext('2d')
    if (ctx) {
      canvas.width = width
      canvas.height = height
      bubbles.splice(0, bubbles.length)
      for (let i = 0; i < 50; i++) {
        bubbles.push(new Bubble())
      }
    }
    animate()
  } else if (ev.data.msg === 'size') {
    width = ev.data.size.width
    height = ev.data.size.height
    innerWidth = ev.data.size.innerWidth
    if (canvas) {
      canvas.width = width
      canvas.height = height
    }
  }else if(ev.data.msg ==='mouseX'){
    mouseXPlus = ev.data.pos
  }else if(ev.data.msg=== 'stop'){
    playAnimation = false
  }
}
