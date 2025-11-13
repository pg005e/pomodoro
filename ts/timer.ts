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

export let POMODORO_TIME = Number(pomodoroDuration.value);
export let SHORT_BREAK_TIME = Number(shortBreakDuration.value);
export let LONG_BREAK_TIME = Number(longBreakDuration.value);

let timeLeft = POMODORO_TIME;
let startTime: Date | null;
let timerInterval: number | null;
let isRunning = false;

async function logPomodoro(type: string, startTime: Date, endTime: Date) {
  console.log("timer completed");
  await fetch('/?handler=LogTimer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: type,
      startTimeUtc: startTime.toISOString(),
      endTimeUtc: endTime.toISOString()
    })
  });
}

export function startTimer() {
  if (!isRunning) startTime = new Date();
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

      const endTime = new Date();
      const timerMode = (() => {
        const activeButton = document.querySelector('.mode-controls .active');
        switch (activeButton?.id) {
          case "pomodoroBtn":
            return "Pomodoro"
          case "shortBreakBtn":
            return "ShortBreak"
          case "longBreakBtn":
            return "LongBreak"
          default:
            return null;
        }
      })();

      logPomodoro(timerMode!, startTime!, endTime);
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

// configure the duration for each mode
export function selectDuration() {
  // update the HTML for durations (display)
  pomodoroBtn.innerHTML = `Pomodoro (${pomodoroDuration.value}m)`
  shortBreakBtn.innerHTML = `Short Break (${shortBreakDuration.value}m)`
  longBreakBtn.innerHTML = `Long Break (${longBreakDuration.value}m)`

  // update the duration for timer countdown
  POMODORO_TIME = Number(pomodoroDuration.value);
  SHORT_BREAK_TIME = Number(shortBreakDuration.value);
  LONG_BREAK_TIME = Number(longBreakDuration.value);
}
