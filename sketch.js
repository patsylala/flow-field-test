var image;
var pixelArray = [];
var greyPixelArray = [];
var life;
var system = new PointSystem();

function preload() {
  img = loadImage("girly3.jpeg");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  pixelDensity(1);
  image(img, 0,0);
  translate((windowWidth/2 - (img.width/2) ),(windowHeight/2 - (img.height/2)));
  loadPixels();
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var loc = (x+y*canvas.width)*4;
      var b = (pixels[loc]+pixels[loc+1]+pixels[loc+2])/3;
      if (b < 100) {
        pixelArray.push([x,y]);
      }
      // else if (b > 160) {
      //   greyPixelArray.push([x,y]);
      // }
    }
  }
  updatePixels();
  background(200);
  system.createSystem(5000);
  life = round(random(10,50));
}

function draw() {
  stroke(0, 30);
  console.log(life);
  system.renderSystem();
  if (life < 0) {
    system.remove();
    system.createSystem(5000);
    life = round(random(10,50));
  }
}

function mouseClicked() {
  system.remove();
  system.createSystem(5000);
}

function PointSystem() {
  this.pointArray = [];

  this.createSystem = function(size) {
    for (var x = 0; x < size; x+=1) {
      this.pointArray.push(new Point());
    }
  }

  this.renderSystem = function() {
    for (var x = 0; x < this.pointArray.length; x++) {
      this.pointArray[x].movePoint();
      this.pointArray[x].renderPoint();
    }
    life--;
  }

  this.remove = function() {
    this.pointArray.splice(0, this.pointArray.length);

  }
}

function Point() {
  var randomCoordinates = pixelArray[round(random(pixelArray.length))];
  this.x = randomCoordinates[0];
  this.y = randomCoordinates[1];

  this.position = new p5.Vector(this.x, this.y);
  this.velocity = new p5.Vector();

  this.movePoint = function() {
    this.velocity.y = 0.5*cos(TWO_PI*noise(0.01*this.position.x,0.01*this.position.y));
    this.velocity.x = 0.5*sin(TWO_PI*noise(0.01*this.position.x,0.01*this.position.y));
    this.position.add(this.velocity);
  }

  this.renderPoint = function() {
    point(this.position.x, this.position.y);
  }
}
