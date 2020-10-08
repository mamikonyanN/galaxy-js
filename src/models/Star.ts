import Drawable from './Drawable'
import StarsSprite from '../assets/stars.png'

const ASSETS_COUNT = 4
const ASSETS_SIZE = 16

export default class Star extends Drawable {

  z: number
  assetId: number

  constructor() {
    super(0, 0, StarsSprite)
    this.generate()
    this.y = Math.floor(Math.random() * innerHeight)
    this.assetId = Math.floor(Math.random() * ASSETS_COUNT)
  }

  private generate(): void {
    this.x = Math.floor(Math.random() * innerWidth)
    this.z = 1 + Math.random() * (ASSETS_SIZE - 1)
  }

  draw(context: CanvasRenderingContext2D | null): void {
    context.drawImage(
      this.sprite,
      this.assetId * ASSETS_SIZE,
      0,
      ASSETS_SIZE,
      ASSETS_SIZE,
      this.x - (ASSETS_SIZE / 2) / this.z,
      this.y - (ASSETS_SIZE / 2) / this.z,
      ASSETS_SIZE / this.z,
      ASSETS_SIZE / this.z
    )
  }

  update(secondsPassed: number): void {
    const currentY = this.y
    const addition = this.height / this.z * 125 * secondsPassed || 0
    if (currentY + addition >= innerHeight) this.generate()
    this.y = (this.y + addition) % innerHeight
  }

}