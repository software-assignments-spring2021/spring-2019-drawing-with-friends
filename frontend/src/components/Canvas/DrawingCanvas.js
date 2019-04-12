import io from 'socket.io-client'
let socket = io.connect('https://devserver.letsdraw.me')

import smallPng from '../../images/Small.png'
import mediumPng from '../../images/Medium.png'
import largePng from '../../images/Large.png'
import circlePng from '../../images/Circle.png'
import squarePng from '../../images/Square.png'
import eraserPng from '../../images/Eraser.png'

export default function canvas (p) {
  // Variables
  let tool = 'circle' // Currently selected tool "circle", "square", "eraser")
  let color = 0 // Currently selected color (0 = black, 255 = white)
  let size = 8 // Currently selected brush size
  let colors = { // List of colors and their RGB values
    'white': [255, 255, 255],
    'yellow': [255, 255, 0],
    'orange': [255, 165, 0],
    'red': [255, 0, 0],
    'magenta': [255, 0, 255],
    'purple': [85, 26, 139],
    'blue': [0, 0, 255],
    'cyan': [0, 255, 255],
    'green': [0, 255, 0],
    'darkGreen': [0, 100, 0],
    'brown': [91, 62, 32],
    'tan': [153, 106, 27],
    'lightGray': [211, 211, 211],
    'mediumGray': [128, 128, 128],
    'darkGray': [68, 68, 68],
    'black': [0, 0, 0]
  }

  // Set of toolbar icons
  let small = null
  let medium = null
  let large = null
  let circle = null
  let square = null
  let eraser = null

  p.preload = function () {
    small = p.loadImage(smallPng)
    medium = p.loadImage(mediumPng)
    large = p.loadImage(largePng)
    circle = p.loadImage(circlePng)
    square = p.loadImage(squarePng)
    eraser = p.loadImage(eraserPng)
  }

  p.setup = function () {
    // Set up the canvas
    p.createCanvas(600, 600)

    socket.on('draw',
      function (data) {
        console.log("Received drawing data: " + data);
        p.noStroke();
        p.fill(data.color);
        
        if (data.tool === 'circle') {
          p.ellipse(data.mouseX, data.mouseY, data.size, data.size)
        } else if (data.tool === 'square') {
          p.rect(data.mouseX - (data.size / 2), data.mouseY - (data.size / 2), data.size, data.size)
        } else if (data.tool === 'eraser') {
          p.ellipse(data.mouseX, data.mouseY, data.size, data.size)
        }
      }
    )

    socket.on('welcome', (message) => {
      console.log(message)
    })
  }

  p.draw = function () {
    p.noStroke() // Remove default stroke line
    p.fill(color) // Set color

    // 
    if(p.mouseIsPressed && p.mouseX > 38 && p.mouseY > 50){

      let data = {
        x: p.mouseX,
        y: p.mouseY,
        tool: tool,
        color: color,
        size: size
      }

      if (tool === 'circle') {
        p.ellipse(p.mouseX, p.mouseY, size, size)
      } else if (tool === 'square') {
        p.rect(p.mouseX - (size / 2), p.mouseY - (size / 2), size, size)
      } else if (tool === 'eraser') {
        color = [...colors['white']]
        p.ellipse(p.mouseX, p.mouseY, size, size)
      }
      
      socket.emit("draw", data)
      console.log("Sending draw data: " + data)
    }

    drawToolbar()
    drawEraseAll()
    drawColorPalette()
  }

  function drawColorPalette () {
    p.stroke(0)
    let xPosition = 60

    for (let color in colors) {
      p.fill(...colors[color])
      p.rect(xPosition, 20, 30, 30)
      xPosition += 30
    }
  }

  function drawToolbar () {
    p.fill(178)
    p.rect(5, 65, 40, 250)

    p.imageMode(p.CENTER)
    p.image(small, 25, 85, 25, 25)
    p.image(medium, 25, 115, 25, 25)
    p.image(large, 25, 145, 25, 25)

    p.image(circle, 25, 210, 25, 25)
    p.image(square, 25, 240, 25, 25)
    p.image(eraser, 25, 270, 25, 25)
  }

  function drawEraseAll () {
    p.rect(250, 60, 100, 30)
    p.fill(0)
    p.textSize(16)
    p.text('Erase All', 268, 83)
  }

  p.mousePressed = function () {
    // Color selection
    if (p.mouseY > 20 && p.mouseY <= 50) {
      if (p.mouseX > 60 && p.mouseX <= 90) {
        color = [...colors['white']]
        return
      } else if (p.mouseX > 90 && p.mouseX <= 120) {
        color = [...colors['yellow']]
        return
      } else if (p.mouseX > 120 && p.mouseX <= 150) {
        color = [...colors['orange']]
        return
      } else if (p.mouseX > 150 && p.mouseX <= 180) {
        color = [...colors['red']]
        return
      } else if (p.mouseX > 180 && p.mouseX <= 210) {
        color = [...colors['magenta']]
        return
      } else if (p.mouseX > 210 && p.mouseX <= 240) {
        color = [...colors['purple']]
        return
      } else if (p.mouseX > 240 && p.mouseX <= 270) {
        color = [...colors['blue']]
        return
      } else if (p.mouseX > 270 && p.mouseX <= 300) {
        color = [...colors['cyan']]
        return
      } else if (p.mouseX > 300 && p.mouseX <= 330) {
        color = [...colors['green']]
        return
      } else if (p.mouseX > 330 && p.mouseX <= 360) {
        color = [...colors['darkGreen']]
        return
      } else if (p.mouseX > 360 && p.mouseX <= 390) {
        color = [...colors['brown']]
        return
      } else if (p.mouseX > 390 && p.mouseX <= 420) {
        color = [...colors['tan']]
        return
      } else if (p.mouseX > 420 && p.mouseX <= 450) {
        color = [...colors['lightGray']]
        return
      } else if (p.mouseX > 450 && p.mouseX <= 480) {
        color = [...colors['mediumGray']]
        return
      } else if (p.mouseX > 480 && p.mouseX <= 510) {
        color = [...colors['darkGray']]
        return
      } else if (p.mouseX > 510 && p.mouseX <= 540) {
        color = [...colors['black']]
        return
      }
    }

    
    if (p.mouseX > 13 && p.mouseX < 38) {
      // Size selection
      if (p.mouseY > 77 && p.mouseY < 98) {
        size = 8 // Small
        return
      } else if (p.mouseY > 105 && p.mouseY < 128) {
        size = 15 // Medium
        return
      } else if (p.mouseY > 137 && p.mouseY < 157) {
        size = 25 // Large
        return
      }

      // Tool selection
      else if (p.mouseY > 199 && p.mouseY < 223) {
        tool = 'circle'
        return
      } else if (p.mouseY > 232 && p.mouseY < 252) {
        tool = 'square'
        return
      } else if (p.mouseY > 260 && p.mouseY < 282) {
        tool = 'eraser'
        return
      }
    }

    // Erase all
    if (p.mouseX > 250 && p.mouseX < 350 && p.mouseY > 65 && p.mouseY < 90) {
      p.background(255)
      return
    }
  }
}