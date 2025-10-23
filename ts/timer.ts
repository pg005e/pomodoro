import { alarmSound, startBtn, pomodoroBtn } from './elements.js';
import { updateDisplay } from './ui.js';

export const POMODORO_TIME = 25 * 60;
export const SHORT_BREAK_TIME = 5 * 60;
export const LONG_BREAK_TIME = 15 * 60;

let timeLeft = POMODORO_TIME;
let timerInterval: number | null;
let isRunning = false;

export function startTimer() {
  isRunning = true;
  startBtn.textContent = "PAUSE";
  startBtn.classList.remove('pause')
  startBtn.classList.add('resume')

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay(timeLeft);
    } else {
      pauseTimer();
      alarmSound.play();
      alert("Time is Up!");
      setMode(pomodoroBtn, POMODORO_TIME);
    }
  }, 1000);
}

export function pauseTimer() {
  isRunning = false;
  startBtn.textContent = "RESUME";
  startBtn.classList.remove('resume')
  startBtn.classList.add('pause')

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

export function toggleTimer() {
  if (isRunning) pauseTimer();
  else startTimer();
}

export function setMode(button: HTMLElement, duration: number) {
  pauseTimer();
  timeLeft = duration;
  updateDisplay(timeLeft);

  document.querySelectorAll('.mode-controls button').forEach(btn => {
    btn.classList.remove('active');
  });

  startBtn.classList.remove('resume', 'pause');
  startBtn.textContent = 'START'
  button.classList.add('active');
}
