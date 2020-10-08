/** TODO: Animated sprites, destroy animation
 * destroySprite
 * animationTick - timer to update (animationSpeed (for timer), animationLength)
 * isDone
 */
export default abstract class Drawable {
  x: number
  y: number
  width: number
  height: number
  sprite: HTMLImageElement

  protected constructor(x: number, y: number, sprite: string) {
    this.x = x
    this.y = y
    if (sprite) {
      const image = new Image()
      image.src = sprite
      this.sprite = image
    }
    this.width = this.sprite.width
    this.height = this.sprite.height
  }

  abstract draw(context: CanvasRenderingContext2D | null): void
}