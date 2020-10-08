import GameObject from './GameObject'
import Shells from '../controllers/Shells'
import ShellSprite from '../assets/shell.png'
import HitBox from './HitBox'

export default class Shell extends GameObject {
  speed: number
  direction: number
  damage: number

  constructor(x: number, y: number, speed: number, direction: number, damage: number) {
    super(x, y, ShellSprite)
    this.speed = speed
    this.direction = direction
    this.damage = damage
    this.hitBoxes.push(new HitBox(16, 10, 2, 12))
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(this.sprite, this.x - this.sprite.width / 2, this.y - this.sprite.height / 2)
  }

  update(secondsPassed: number): void {
    this.y += this.direction * this.speed * secondsPassed
    if (this.y < 0 || this.y > innerHeight)
      this.destroy(Shells)
  }
}