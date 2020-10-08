import Drawable from './Drawable'
import HitBox from './HitBox'

export default abstract class GameObject extends Drawable {
  x: number
  y: number
  height: number
  width: number
  hp: number

  hitBoxes: Array<HitBox> = []
  sprite: HTMLImageElement
  idDestroyed: boolean

  protected constructor(x: number, y: number, sprite: string) {
    super(x, y, sprite)
    this.hp = 100
  }

  abstract draw(context: CanvasRenderingContext2D | null): void

  abstract update(secondsPassed: number): void

  hasCollision(enemies: Array<GameObject>): GameObject {
    let bumpedEnemy = null
    this.hitBoxes.some(
      hitBox => enemies.some(
        enemy => {
          const predicate = enemy.hitBoxes.some(
            enemyHitBox => isIntersect(hitBox, this, enemyHitBox, enemy)
          )
          if (predicate) bumpedEnemy = enemy
          return predicate
        }
      )
    )
    return bumpedEnemy
  }

  takeDamage(damage: number, includeArray: Array<GameObject>): void {
    this.hp -= damage
    if (this.hp <= 0) this.destroy(includeArray)
  }

  destroy(includeArray: Array<GameObject>): GameObject {
    const indexOf = includeArray.indexOf(this)
    if (indexOf !== -1) {
      return includeArray.splice(indexOf, 1)[0] || null
    }
  }

}

function isIntersect(firstHitBox: HitBox, firstObject: GameObject, secondHitBox: HitBox, secondObject: GameObject): boolean {
  return !(
    (firstHitBox.x + firstObject.x - firstObject.width / 2) >= secondHitBox.width + (secondHitBox.x + secondObject.x - secondObject.width / 2) ||
    (secondHitBox.x + secondObject.x - secondObject.width / 2) >= firstHitBox.width + (firstHitBox.x + firstObject.x - firstObject.width / 2) ||
    (firstHitBox.y + firstObject.y - firstObject.height / 2) >= secondHitBox.height + (secondHitBox.y + secondObject.y - secondObject.height / 2) ||
    (secondHitBox.y + secondObject.y - secondObject.height / 2) >= firstHitBox.height + (firstHitBox.y + firstObject.y - firstObject.height / 2)
  )
}