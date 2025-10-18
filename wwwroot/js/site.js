let timeLeft = 25 * 60;  // default (pomodoro)
let timerInterval = null;
let isRunning = false;

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

const alarmSound = document.getElementById('alarmSound');
const timerDisplay = document.getElementById('timer');

const startBtn = document.getElementById('startBtn');
const pomodoroBtn = document.getElementById('pomodoroBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  isRunning = true;
  startBtn.textContent = "Pause";

  startBtn.classList.remove('pause');
  startBtn.classList.add('start');

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      pauseTimer();
      alarmSound.play();
      alert("Time is Up!");
      setMode(pomodoroBtn, POMODORO_TIME);
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  startBtn.textContent = "Start";

  startBtn.classList.remove('start')
  startBtn.classList.add('pause')

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function setMode(button, duration) {
  pauseTimer();
  timeLeft = duration;
  updateDisplay();

  document.querySelectorAll('.mode-controls button').forEach(btn => {
    btn.classList.remove('active');
  })

  button.classList.add('active');
}

pomodoroBtn.addEventListener('click', () => setMode(pomodoroBtn, POMODORO_TIME))
shortBreakBtn.addEventListener('click', () => setMode(shortBreakBtn, SHORT_BREAK_TIME))
longBreakBtn.addEventListener('click', () => setMode(longBreakBtn, LONG_BREAK_TIME))

startBtn.addEventListener('click', () => toggleTimer(startBtn))
