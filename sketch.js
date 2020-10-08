class Obstacle {
  constructor(r, c) {
    this.x = 620;
    this.size = r;
    this.colour = c;
  }
}

document.addEventListener("keypress", myFunction);
function myFunction(event) {
  console.log(event.which);
  if (event.which === 13) {
    console.log("r pressed");
    window.location.reload();
  }
}

var yVel;
var obstacles = [];
let speed;
let horizon;
let y;
let onGround;
let score;

function setup() {
  createCanvas(500, 200);
  textAlign(CENTER);
  yVel = 0;
  y = 20;
  speed = 6;
  horizon = height - 40;
  onGround = false;
  score = 0;
}
function draw() {
  background(51);
  stroke(255);
  line(0, horizon, width, horizon);
  fill("#999999");
  ellipse(40, y, 40);

  if (frameCount % 120 === 0) {
    speed *= 1.05;
  }

  if (frameCount % 30 === 0) {
    let n = noise(frameCount);
    if (n > 0.5) newObstacles(n);
  }
  //newObstacles();
  score++;
  textSize(20);
  text("Score: " + score, width / 2, 30);
  updateObstacles();
  handleTRex();
}

function newObstacles(n) {
  let obs = new Obstacle(n * 50, color(random(255), random(255), random(255)));
  console.log(obs);
  obstacles.push(obs);
}

function updateObstacles() {
  console.log(obstacles);
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= speed;
    let x = obstacles[i].x;
    let size = obstacles[i].size;
    let s2 = size / 2;
    if (x > -30) {
      fill(obstacles[i].colour);
      rect(x, horizon - size, size, size);
      let x1 = x + s2;
      let y1 = horizon - s2;
      if (dist(x1, y1, 40, y) < s2 + 20) {
        noStroke();
        textSize(40);
        text("GAME OVER", width / 2, height / 2);
        textSize(20);
        text("Press Enter to restart", width / 2, height / 2 + 20);
        noLoop();
      } //20 radius of ellipse
    } else {
      obstacles.splice(i, 1);
    }
  }
}

function handleTRex() {
  if (y + 20 + yVel < horizon) {
    yVel += map(frameCount, 0, 3600, 0.7, 2);
    onGround = false;
  } else {
    yVel = 0;
    onGround = true;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(32) || mouseIsPressed) {
    if (onGround) {
      yVel -= map(frameCount, 0, 3600, 9, 15);
      onGround = false;
    }
  }
  y += yVel;
}
