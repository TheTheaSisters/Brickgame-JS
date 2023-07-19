const canvas = document.getElementById("breakout");
const ctx = canvas.getContext("2d");

var bg = new Image();
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;

bg.src = "img/bg.jpg";




// Make thick lines
ctx.lineWidth = 3;

// Paddle Object
const paddle = {
  x: canvas.width/2 - PADDLE_WIDTH/2,
  y: canvas.height - 20 - 50,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  dx: 5
}

const ball = {
  x: canvas.width/2,
  y: paddle.y - BALL_RADIUS,
  radius: BALL_RADIUS,
  speed: 4,
  dx: -3,
  dy: -3
}

const brick = {
  width: 55,
  height: 20,
  offSetLeft: 20,
  fillColor: "#2e3548",
  strokeColor: "#FFF"
}

let bricks = [];

function createGhostBricks() {
  for (let i = 0; i < 5; i++) {
    bricks[i] = {
      x : i * (brick.offSetLeft + brick.width) + brick.offSetLeft,
      y : 40,
      status: true
    }
  }
}

createGhostBricks();

function drawBricks() {
  for (let i = 0; i < 5; i ++) {
    let b = bricks[i];
    if (b.status) {
    ctx.fillStyle = brick.fillColor;
    ctx.fillRect(b.x, b.y, brick.width, brick.height);

    ctx.strokeStyle = brick.strokeColor;
    ctx.strokeRect(b.x, b.y, brick.width, brick.height);
    }
  }

}

function drawPaddle() {
  ctx.fillStyle = "#2e3548";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  ctx.strokeStyle = "#ffcd05";
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
  ctx.fillStyle = "#ffcd05";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
  
  ctx.fill();

  ctx.strokeStyle = "#2e3548";
  ctx.stroke();

  ctx.closePath();

}

function ballBrickCollission() {
  for (let i = 0; i < 5; i ++) {
    b = bricks[i];
    if(ball.x + ball.radius > b.x &&
       ball.x - ball.radius < b.x + brick.width &&
       ball.y + ball.radius > b.y &&
       ball.y - ball.radius < b.y + brick.height &&
       b.status == true) {
      ball.dy = -ball.dy;
      b.status = false;
    }

  }

}


// Add mouse event listener
canvas.addEventListener("mousemove", getMousePos);

// Event handler function
function getMousePos(evt) {
  let rect = canvas.getBoundingClientRect();

  paddle.x = evt.clientX - (PADDLE_WIDTH/2);
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function ballWallCollision() {
  //Left wall ballWallCollision
  if (ball.x < 0) {
    ball.dx = - ball.dx;
  }
  //Right wall ballWallCollision
  if (ball.x > canvas.width) {
    ball.dx = - ball.dx;
  }

  //Bounce of top edge
  if (ball.y < 0) {
    ball.dy = - ball.dy;
  }

}

function ballFloorCollision() {
  if(ball.y > canvas.height) {
    clearInterval(myInterval);
  }
}

function ballPaddleCollision() {
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y) {
      ball.dy = - ball.dy;
    }
}

function update() {
  moveBall();
  ballWallCollision();
  ballPaddleCollision();
  ballFloorCollision();
  ballBrickCollission();   
}

function render() {
  ctx.drawImage(bg, 0, 0);
  drawPaddle();
  drawBall();
  drawBricks();

}

function game() {
  update();
  render();
}

var FPS = 50;

const myInterval = setInterval(game, 1000/FPS);
