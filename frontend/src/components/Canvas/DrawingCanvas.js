/* eslint-disable */
export default function canvas(p) {
  // Variables
  let tool = "circle"; // Currently selected tool "circle", "square", "eraser")
  let color = 0; // Currently selected color (0 = black, 255 = white)
  let size = 8; // Currently selected brush size
  let colors = { //List of colors and their RGB values
    "white": [255, 255, 255],
    "yellow": [255, 255, 0],
    "orange": [255, 165, 0],
    "red": [255, 0, 0],
    "magenta": [255, 0, 255],
    "purple": [85, 26, 139],
    "blue": [0, 0, 255],
    "cyan": [0, 255, 255],
    "green": [0, 255, 0], 
    "darkGreen": [0, 100, 0],
    "brown": [91, 62, 32],
    "tan": [153, 106, 27],
    "lightGray": [211, 211, 211],
    "mediumGray": [128, 128, 128],
    "darkGray": [68, 68, 68],
    "black": [0, 0, 0]
  };

    // Set of toolbar icons
  let small = null;
  let medium = null;
  let large = null;
  let circle = null;
  let square = null;
  let eraser = null;

  p.preload = function() {
    small = p.loadImage('https://raw.githubusercontent.com/nyu-software-engineering/drawing-with-friends/user-story/7/task/35/initialize-canvas/frontend/src/components/Canvas/Small.png');
    medium = p.loadImage('https://raw.githubusercontent.com/nyu-software-engineering/drawing-with-friends/user-story/7/task/35/initialize-canvas/frontend/src/components/Canvas/Medium.png');
    large = p.loadImage('https://raw.githubusercontent.com/nyu-software-engineering/drawing-with-friends/user-story/7/task/35/initialize-canvas/frontend/src/components/Canvas/Large.png');
    circle = p.loadImage('https://raw.githubusercontent.com/nyu-software-engineering/drawing-with-friends/user-story/7/task/35/initialize-canvas/frontend/src/components/Canvas/Circle.png');
    square = p.loadImage('https://raw.githubusercontent.com/nyu-software-engineering/drawing-with-friends/user-story/7/task/35/initialize-canvas/frontend/src/components/Canvas/Square.png');
    eraser = p.loadImage('https://raw.githubusercontent.com/nyu-software-engineering/drawing-with-friends/user-story/7/task/35/initialize-canvas/frontend/src/components/Canvas/Eraser.png');
  }

  p.setup = function() {
    // Set up the canvas 
    p.createCanvas(600, 600);  
  }

  p.draw = function() {
    p.noStroke(); // Remove default stroke line
    p.fill(color); // Set color

    if (p.mouseIsPressed && tool === "circle") {
      p.ellipse(p.mouseX, p.mouseY, size, size);
    } else if (p.mouseIsPressed && tool === "square") {
      p.rect(p.mouseX-(size/2), p.mouseY-(size/2), size, size);
    } else if (p.mouseIsPressed && tool === "eraser") {
      color = [...colors["white"]];
      p.ellipse(p.mouseX, p.mouseY, size, size);
    }

    drawToolbar();
    drawEraseAll();
    drawColorPalette();
  }

function drawColorPalette() {
  p.stroke(0);
  let xPosition = 60;

  for (let color in colors) {
    p.fill(...colors[color]);
    p.rect(xPosition, 20, 30, 30);
    xPosition += 30;
  }
}

function drawToolbar() {
  p.fill(178);
  p.rect(5, 65, 40, 250);

  p.imageMode(p.CENTER);
  p.image(small, 25, 85, 25, 25);
  p.image(medium, 25, 115, 25, 25);
  p.image(large, 25, 145, 25, 25);

  p.image(circle, 25, 210, 25, 25);
  p.image(square, 25, 240, 25, 25);
  p.image(eraser, 25, 270, 25, 25);
}

function drawEraseAll() {
  p.rect(250, 60, 100, 30);
  p.fill(0);
  p.textSize(16);
  p.text("Erase All", 268, 83);
}

  p.mousePressed = function() {
    // Color selection
    if (p.mouseX > 60 && p.mouseX <= 90 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["white"]];
    } else if (p.mouseX > 90 && p.mouseX <= 120 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["yellow"]];
    } else if (p.mouseX > 120 && p.mouseX <= 150 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["orange"]];
    } else if (p.mouseX > 150 && p.mouseX <= 180 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["red"]];
    } else if (p.mouseX > 180 && p.mouseX <= 210 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["magenta"]];
    } else if (p.mouseX > 210 && p.mouseX <= 240 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["purple"]];
    } else if (p.mouseX > 240 && p.mouseX <= 270 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["blue"]];
    } else if (p.mouseX > 270 && p.mouseX <= 300 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["cyan"]];
    } else if (p.mouseX > 300 && p.mouseX <= 330 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["green"]];
    } else if (p.mouseX > 330 && p.mouseX <= 360 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["darkGreen"]];
    } else if (p.mouseX > 360 && p.mouseX <= 390 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["brown"]];
    } else if (p.mouseX > 390 && p.mouseX <= 420 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["tan"]];
    } else if (p.mouseX > 420 && p.mouseX <= 450 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["lightGray"]];
    } else if (p.mouseX > 450 && p.mouseX <= 480 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["mediumGray"]];
    } else if (p.mouseX > 480 && p.mouseX <= 510 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["darkGray"]];
    } else if (p.mouseX > 510 && p.mouseX <= 540 && p.mouseY > 20 && p.mouseY <= 50) {
      color = [...colors["black"]];
    }

    // Size selection
    if (p.mouseX > 13 && p.mouseX < 38 && p.mouseY > 77 && p.mouseY < 98) {
      size = 8; // Small
    } else if (p.mouseX > 13 && p.mouseX < 38 && p.mouseY > 105 && p.mouseY < 128) {
      size = 15; // Medium
    } else if (p.mouseX > 13 && p.mouseX < 38 && p.mouseY > 137 && p.mouseY < 157) {
      size = 25; // Large
    }

    // Tool selection
    if (p.mouseX > 13 && p.mouseX < 38 && p.mouseY > 199 && p.mouseY < 223) {
      tool = "circle";
    } else if (p.mouseX > 13 && p.mouseX < 38 && p.mouseY > 232 && p.mouseY < 252) {
      tool = "square";
    } else if (p.mouseX > 13 && p.mouseX < 38 && p.mouseY > 260 && p.mouseY < 282) {
      tool = "eraser";
    }

    // Erase all
    if (p.mouseX > 250 && p.mouseX < 350 && p.mouseY > 65 && p.mouseY < 90) {
      p.background(255);
    }
  }
}
