var x = 100;
var y = 50;
var r = 10;
var duration = 1000; // in ms
var nextX, nextY;
var startTime;

function anim(time) {
  if (!startTime) // it's the first frame
    startTime = time || performance.now();

  // deltaTime should be in the range [0 ~ 1]
  var deltaTime = (time - startTime) / duration;
  // currentPos = previous position + (difference * deltaTime)
  var currentX = x + ((nextX - x) * deltaTime);
  var currentY = y + ((nextY - y) * deltaTime);

  if (deltaTime >= 1) { // this means we ended our animation
    x = nextX; // reset x variable
    y = nextY; // reset y variable
    startTime = null; // reset startTime
    draw(x, y); // draw the last frame, at required position
  } else {
    draw(currentX, currentY);
    requestAnimationFrame(anim); // do it again
  }
}

function moveanim(){
  nextX = +x_in.value;
  nextY = +y_in.value;
  anim();
}

/* var move = document.getElementById('move');
move.onclick = function() {moveanim()}; */

// OP's code

var WIDTH = 600;
var HEIGHT = 400;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw(x, y) {
  clear(WIDTH, HEIGHT);
  ctx.fillStyle = "black";
  circle(x, y, r);
}

draw(x, y);
setInterval(moveanim, 1000);