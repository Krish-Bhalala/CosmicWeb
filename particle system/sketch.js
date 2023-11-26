// inspired from
// Daniel Shiffman
// http://codingtra.in

// Simple Particle System
// https://youtu.be/UcdigVaIYAk

// for great experience view it here: https://editor.p5js.org/bored-emperor/full/oD_cCAMlZ

let w,h;
let particles = [];
let toggle = true;
let img;
let totalParticles=50;

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(windowWidth,windowHeight);
  //img = loadImage("jet_fighter.png");
  img = loadImage("missile.png");
  //particles = Array(100).map(p => new Particle());
}

function mousePressed(){
  toggle = !toggle;
}

function windowResize() {
  w = windowWidth;
  h = windowHeight;
  resizeCanvas(w, h);
}

function draw() {
  background(255);
  //background(150,210,255);
  for(let i=0;i<totalParticles;i++){
    particles.push(new Particle());
  }
  particles = particles.filter(p => !p.isDestroyed());
  for(let particle of particles){
    particle.show();
    particle.update();
  }
  
  particles.sort((a,b) => a.colorSum-b.colorSum);
  
  let imgX = mouseX-(img.width*0.31);
  let imgY = mouseY-(60);
  image(img,imgX,imgY,img.width/3,img.height/3);
}

class Particle{
  constructor(){
    // this.x = w/4;
    // this.y = h/2;
    this.birthX = mouseX;
    this.birthY = mouseY;
    this.x = this.birthX;
    this.y = this.birthY;
    this.vx = 4;
    this.vy = 5;
    this.ax = 0.2;
    this.ay = 0.01;
    this.fadeV = 0.8;
    this.fadeA = 0.02;
    this.radius = 20;
    this.fade = 100;
    this.isColored = toggle;
    this.colorSum;
  }
  show() {
    noStroke();
    this.flameColor();
    ellipse(this.x, this.y,this.radius);
  }
  flameColor(){
    let r=map(this.fade,5,100,245,245);
    //let g=250-((this.fade)*1.8);
    let g=map(this.fade,5,100,245,70);
    let b=map(this.fade,5,this.fade/4,245,0);
    this.colorSum = r+g+b;
    if(this.isColored){
      fill(r,g,b,this.fade);
    }else{
      let grayscale=map(this.colorSum/3,0,255,150,255);
      fill(grayscale,this.fade);
    }  
  }
  update(){
    this.colored = toggle;
    this.y += random(this.vy)*random(-1,1);
    this.x += this.vx;
    this.fade -= this.fadeV;
    this.vx+=random(this.ax);
    this.vy+=random(this.ay);
    this.fadeV += this.fadeA;
  }
  isDestroyed(){
    return this.fade <= 0;
  }
}