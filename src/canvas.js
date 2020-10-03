import Ship from './assets/spaceship.png'
import EnemyShip from './assets/enemy-spaceship.png'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const state = {
  isShooting: false
}

// Event Listeners
addEventListener('contextmenu', event => event.preventDefault())
addEventListener('mousemove', (event) => {
  event.preventDefault()
  mouse.x = event.clientX
  mouse.y = event.clientY
})
addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
})

// Objects
class GameObject {
  constructor(x = 0, y = 0, ImageResource = null) {
    this.x = x
    this.y = y
    if (ImageResource) {
      const sprite = new Image()
      sprite.src = ImageResource
      this.sprite = sprite
    }

  }

  draw() {
  }

  update() {
  }
}

class Enemy extends GameObject {
  constructor(x, y, ImageResource) {
    super(x, y, ImageResource)
    this.width = 50
    this.height = 50
    this.hp = 100
  }

  draw() {
    context.drawImage(this.sprite, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
  }

  takeDamage(shell = { damage: 0 }) {
    this.hp -= shell.damage
    if (this.hp <= 0)
      this.destroy()
  }

  destroy() {
    let indexOf = enemies.indexOf(this)
    if (indexOf !== -1)
      return enemies.splice(indexOf, 1)
  }
}


class PlayerShip extends GameObject {
  constructor(ImageResource) {
    super(mouse.x, mouse.y, ImageResource)

    addEventListener('mousedown', event => {
      if (event.button === 0) {
        state.isShooting = true
        shooting(this)
      }
    })

    addEventListener('mouseup', event => {
      if (event.button === 0)
        state.isShooting = false
    })
  }

  draw() {
    context.drawImage(this.sprite, this.x - 25, this.y - 25, 50, 50)
  }
}

let shells = []

class Shell {
  constructor(x, y, speed, direction = 1) {
    this.x = x
    this.y = y
    this.speed = speed
    this.direction = direction
    this.damage = 100 / 3
  }

  draw() {
    context.save()

    context.beginPath()
    context.rect(this.x - 1, this.y - 8, 2, 16)
    context.closePath()

    context.fillStyle = `#ffffff`
    context.shadowBlur = 10
    context.shadowColor = '#ffffff'
    context.fill()

    context.restore()
  }

  update() {
    this.y += this.direction * this.speed
    if (this.y < 0 || this.y > canvas.height)
      this.destroy()
  }

  destroy() {
    let indexOf = shells.indexOf(this)
    if (indexOf !== -1)
      return shells.splice(indexOf, 1)[0] || null
  }
}

class Star {
  constructor(x, y, radius, opacity, shade, speed = radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.opacity = opacity
    this.shade = shade
    this.speed = speed
  }

  draw() {
    context.save()

    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    context.closePath()

    context.fillStyle = `rgba(255, 255, ${this.shade}, ${this.opacity})`
    context.shadowBlur = 5
    context.shadowColor = '#ffff' + Number(this.shade).toString(16)
    context.fill()

    context.restore()
  }

  update() {
    if (this.y >= canvas.height) {
      this.y = -this.speed
      this.x = Math.round(Math.random() * canvas.width)
    }
    this.y += this.speed
  }
}

let player
let enemies
let stars

function init() {
  player = new PlayerShip(Ship)

  enemies = []
  for (let i = 0; i < 15; i++)
    enemies.push(new Enemy(
      50 + Math.random() * (canvas.width - 100),
      50 + Math.random() * 200,
      EnemyShip
    ))

  stars = []
  for (let i = 0; i < 100; i++) {
    let x = Math.round(Math.random() * canvas.width)
    let y = Math.round(Math.random() * canvas.height)
    let radius = Math.random() * 2
    let speed = 2 + Math.random() * 3
    let opacity = Math.random()
    let shade = Math.floor(50 + Math.random() * 205)
    let star = new Star(x, y, radius, opacity, shade, speed)
    stars.push(star)
  }
}

function shooting(ship) {
  if (state.isShooting) {
    const shell = new Shell(ship.x, ship.y - 25, 5, -1)
    shells.push(shell)
    setTimeout(() => shooting(ship), 100)
  }
}

function animate() {
  collisionDetection()


  context.clearRect(0, 0, canvas.width, canvas.height)

  player.draw()
  enemies.forEach(star => star.draw())
  stars.forEach(star => star.draw())
  shells.forEach(star => star.draw())
  player.x = mouse.x
  player.y = mouse.y

  requestAnimationFrame(animate)
}


function collisionDetection() {
  shells.forEach(shell => {
    enemies.forEach(enemy => {
        if (rectIntersect(
          enemy.x - enemy.width / 2, enemy.y - enemy.height / 2, enemy.width, enemy.height,
          shell.x - 1, shell.y - 8, 2, 16
        )) {
          enemy.takeDamage(shell.destroy())
        }
      }
    )
  })
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2)
}

function updateValues() {
  [...stars, ...shells].forEach(object => object.update())

  for (let i = enemies.length; i < 15; i++)
    enemies.push(new Enemy(
      50 + Math.random() * (canvas.width - 100),
      50 + Math.random() * 200,
      EnemyShip
    ))
}

setInterval(updateValues, 1)

init()
animate()