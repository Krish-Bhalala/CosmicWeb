// Daniel Shiffman
// http://codingtra.in

// Simple Particle System
// https://youtu.be/UcdigVaIYAk

let w,h;

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w,h);
}

function windowResize() {
  w = windowWidth;
  h = windowHeight;
  resizeCanvas(w, h);
}

function draw() {
  background(0);
  let x = new Particle();
  x.show();
  
}

class Particle{
  constructor(){
    this.x = w/2;
    this.y = h;
    this.radius = 15;
  }

  show() {
    fill(255,100);
    ellipse(this.x,this.y-this.radius,this.radius,this.radius);
  }
}