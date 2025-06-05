let startTime = 0;
let elapsedTime = 0;
let interval;
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function updateDisplay(time) {
  const hours = String(Math.floor(time / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
  display.textContent = `${hours}:${minutes}:${seconds}`;
}

function start() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 1000);
  }
}

function pause() {
  if (isRunning) {
    isRunning = false;
    clearInterval(interval);
  }
}

function reset() {
  isRunning = false;
  clearInterval(interval);
  elapsedTime = 0;
  updateDisplay(elapsedTime);
  laps.innerHTML = "";
}

function lap() {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
}
