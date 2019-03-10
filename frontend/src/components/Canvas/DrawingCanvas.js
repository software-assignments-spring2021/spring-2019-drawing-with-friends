/* eslint-disable */
// Variables
let tool = "circle"; // Currently selected tool "circle", "square", "fill")
let color = 0; // Currently selected color (0 = black, 255 = white)
let size = 5; // Currently selected brush size
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

function setup() {
  // Set up the canvas 
  createCanvas(600, 600);
}

function draw() {
  noStroke(); // Remove default stroke line
  fill(color); // Set color
  if (mouseIsPressed) {
    circle(mouseX, mouseY, size);
  }

  drawColorPalette();
}

function drawColorPalette() {
  stroke(0);
  let xPosition = 60;

  for (let color in colors) {
    fill(...colors[color]);
    square(xPosition, 20, 30);
    xPosition += 30;
  }
}

function mousePressed() {
  if (mouseX > 60 && mouseX <= 90 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["white"]];
  } else if (mouseX > 90 && mouseX <= 120 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["yellow"]];
  } else if (mouseX > 120 && mouseX <= 150 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["orange"]];
  } else if (mouseX > 150 && mouseX <= 180 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["red"]];
  } else if (mouseX > 180 && mouseX <= 210 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["magenta"]];
  } else if (mouseX > 210 && mouseX <= 240 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["purple"]];
  } else if (mouseX > 240 && mouseX <= 270 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["blue"]];
  } else if (mouseX > 270 && mouseX <= 300 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["cyan"]];
  } else if (mouseX > 300 && mouseX <= 330 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["green"]];
  } else if (mouseX > 330 && mouseX <= 360 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["darkGreen"]];
  } else if (mouseX > 360 && mouseX <= 390 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["brown"]];
  } else if (mouseX > 390 && mouseX <= 420 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["tan"]];
  } else if (mouseX > 420 && mouseX <= 450 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["lightGray"]];
  } else if (mouseX > 450 && mouseX <= 480 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["mediumGray"]];
  } else if (mouseX > 480 && mouseX <= 510 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["darkGray"]];
  } else if (mouseX > 510 && mouseX <= 540 && mouseY > 20 && mouseY <= 50) {
    color = [...colors["black"]];
  }
}