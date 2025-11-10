import {
  alarmSound,
  startBtn,
  pomodoroBtn,
  shortBreakBtn,
  longBreakBtn,
  pomodoroDuration,
  shortBreakDuration,
  longBreakDuration,
} from './elements.js';
import { updateTimerDisplay } from './ui.js';

export let POMODORO_TIME = Number(pomodoroDuration.value) * 60;
export let SHORT_BREAK_TIME = Number(shortBreakDuration.value) * 60;
export let LONG_BREAK_TIME = Number(longBreakDuration.value) * 60;

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
      updateTimerDisplay(timeLeft);
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

// select the mode (POMODORO, SHORT-BREAK, LONG-BREAK)
export function setMode(button: HTMLElement, duration: number) {
  pauseTimer();
  timeLeft = duration;
  updateTimerDisplay(timeLeft);

  document.querySelectorAll('.mode-controls button').forEach(btn => {
    btn.classList.remove('active');
  });

  startBtn.classList.remove('resume', 'pause');
  startBtn.textContent = 'START'
  button.classList.add('active');
}

export function selectDuration() {
  // update the HTML for durations (display)
  pomodoroBtn.innerHTML = `Pomodoro (${pomodoroDuration.value}m)`
  shortBreakBtn.innerHTML = `Short Break (${shortBreakDuration.value}m)`
  longBreakBtn.innerHTML = `Long Break (${longBreakDuration.value}m)`

  // update the duration for timer countdown
  POMODORO_TIME = Number(pomodoroDuration.value) * 60;
  SHORT_BREAK_TIME = Number(shortBreakDuration.value) * 60;
  LONG_BREAK_TIME = Number(longBreakDuration.value) * 60;
}
