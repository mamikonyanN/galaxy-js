import PlayerSprite from './assets/ship.png'
import EnemySprite from './assets/shipEnemy.png'

import EnemyShip from './models/EnemyShip'
import PlayerShip from './models/PlayerShip'
import Star from './models/Star'

import Enemies from './controllers/Enemies'
import Shells from './controllers/Shells'
import Stars from './controllers/Stars'
import Shell from './models/Shell'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let player: PlayerShip

function init() {
  const ENEMY_COUNT = 15
  const SPRITE_SIZE = 64

  player = new PlayerShip(0, 0, PlayerSprite)

  for (let i = 0; i < ENEMY_COUNT; i++)
    Enemies.push(new EnemyShip(SPRITE_SIZE + SPRITE_SIZE * i * 1.1, SPRITE_SIZE, EnemySprite))

  for (let i = 0; i < 150; i++)
    Stars.push(new Star())
}

let secondsPassed, oldTimeStamp

function animate(timeStamp = 0) {

  secondsPassed = (timeStamp - oldTimeStamp) / 1000
  oldTimeStamp = timeStamp

  Shells.forEach(shell => {
    const target = shell.hasCollision(Enemies)
    if (target !== null) {
      const convertedShell = <Shell>shell.destroy(Shells)
      target.takeDamage(convertedShell.damage, Enemies)
    }
  })

  player.update()
  Stars.forEach(object => object.update(secondsPassed))
  Shells.forEach(object => object.update(secondsPassed))
  Enemies.forEach(enemy => enemy.update(secondsPassed))


  context.clearRect(0, 0, canvas.width, canvas.height)

  player.draw(context)
  Stars.forEach(star => star.draw(context))
  Enemies.forEach(enemy => enemy.draw(context))
  Shells.forEach(shell => shell.draw(context))

  requestAnimationFrame(animate)
}

init()
animate()

addEventListener('contextmenu', event => event.preventDefault())
addEventListener('resize', function() {
  canvas.width = innerWidth
  canvas.height = innerHeight
})
