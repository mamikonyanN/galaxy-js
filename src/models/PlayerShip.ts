import GameObject from './GameObject'
import Shell from './Shell'
import Shells from '../controllers/Shells'
import Mouse from '../controllers/Mouse'

const FIRE_RATE = 8 // shells per second
const SHELL_SPEED = 1000 // px per second

export default class PlayerShip extends GameObject {
  private isShooting = false

  constructor(x: number, y: number, ImageResource: string) {
    super(x, y, ImageResource)

    addEventListener('mousedown', event => {
      if (event.button === 0) {
        this.isShooting = true
        this.shooting()
      }
    })

    addEventListener('mouseup', event => {
      if (event.button === 0)
        this.isShooting = false
    })
  }

  draw(context: CanvasRenderingContext2D | null): void {
    context.drawImage(this.sprite, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
  }

  shooting(): void {
    if (this.isShooting) {
      const shell = new Shell(this.x, this.y - this.width / 2, SHELL_SPEED, -1, 20)
      Shells.push(shell)
      setTimeout(() => this.shooting(), 1000 / FIRE_RATE)
    }
  }

  update(): void {
    const dx = (Mouse.x - this.x) * .125
    const dy = (Mouse.y - this.y) * .125

    if (Math.abs(dx) + Math.abs(dy) < 0.1) {
      this.x = Mouse.x
      this.y = Mouse.y
    } else {
      this.x += dx
      this.y += dy
    }

  }

}