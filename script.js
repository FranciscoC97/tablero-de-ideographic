
const board = document.getElementById("board");
const ctx = board.getContext("2d");

const pen = document.getElementById("pen");
const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");

let drawing = false;
let erasing = false;

function resizeBoard() {
  const rect = board.getBoundingClientRect();
  board.width = rect.width;
  board.height = rect.height;
}

resizeBoard();
window.addEventListener("resize", resizeBoard);

board.addEventListener("pointerdown", (e) => {
  drawing = true;
  board.setPointerCapture(e.pointerId);

  ctx.beginPath();
  ctx.moveTo(
    e.offsetX * board.width / board.clientWidth,
    e.offsetY * board.height / board.clientHeight
  );
});

board.addEventListener("pointermove", (e) => {
  if (!drawing) return;

  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.strokeStyle = erasing ? "white" : "#222";

  ctx.lineTo(
    e.offsetX * board.width / board.clientWidth,
    e.offsetY * board.height / board.clientHeight
  );

  ctx.stroke();
});

board.addEventListener("pointerup", () => {
  drawing = false;
});
board.addEventListener("pointercancel", () => {
  drawing = false;
});

pen.addEventListener("click", () => {
  erasing = false;
});
eraser.addEventListener("click", () => {
  erasing = true;
});
clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, board.width, board.height);
});

const display = document.getElementById("timeDisplay");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const startBtn = document.getElementById("startTimer");
const pauseBtn = document.getElementById("pauseTimer");
const finishBtn = document.getElementById("finishTimer");
const resetBtn = document.getElementById("resetTimer");

let remaining = 300;
let interval = null;

function showTime() {
  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;

  display.textContent =
    String(min).padStart(2, "0") + ":" +
    String(sec).padStart(2, "0");
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

function getInputTime() {
  const min = Math.max(
    0, Math.min(999, Number(minutesInput.value) || 0)
  );
  const sec = Math.max(
    0, Math.min(59, Number(secondsInput.value) || 0)
  );

  return Math.floor(min) * 60 + Math.floor(sec);
}

function startTimer() {
  if (interval !== null) return;

  if (remaining <= 0) {
    remaining = getInputTime();
    showTime();
  }

  if (remaining <= 0) return;

  interval = setInterval(() => {
    remaining--;
    showTime();

    if (remaining <= 0) {
      remaining = 0;
      showTime();
      stopTimer();
      alert("¡Tiempo terminado!");
    }
  }, 1000);
}

startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", stopTimer);

finishBtn.addEventListener("click", () => {
  stopTimer();
  remaining = 0;
  showTime();
});

resetBtn.addEventListener("click", () => {
  stopTimer();
  remaining = getInputTime();
  showTime();
});

minutesInput.addEventListener("change", () => {
  stopTimer();
  remaining = getInputTime();
  showTime();
});

secondsInput.addEventListener("change", () => {
  stopTimer();
  remaining = getInputTime();
  showTime();
});

showTime();
