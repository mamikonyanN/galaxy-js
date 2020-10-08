const mouse = { x: 0, y: 0 }

addEventListener('mousemove', function(event) {
  event.preventDefault()
  mouse.x = event.clientX
  mouse.y = event.clientY
})

export default mouse