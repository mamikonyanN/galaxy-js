import GameObject from './GameObject'
import HitBox from './HitBox'

export default class EnemyShip extends GameObject {

  constructor(x: number, y: number, sprite: string) {
    super(x, y, sprite)
    this.hitBoxes = [
      new HitBox(18, 18, 28, 10),
      new HitBox(24, 28, 16, 10),
      new HitBox(27, 38, 10, 20)
    ]
  }

  draw(context: CanvasRenderingContext2D | null): void {
    context.drawImage(this.sprite, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
  }

  update(secondsPassed: number): void {
    // TODO: Enemies route
  }
}