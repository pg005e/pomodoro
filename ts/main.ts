import {
  startBtn,
  pomodoroBtn,
  shortBreakBtn,
  longBreakBtn
} from './elements.js';
import {
  POMODORO_TIME,
  SHORT_BREAK_TIME,
  LONG_BREAK_TIME,
  setMode,
  toggleTimer
} from './timer.js';

startBtn.addEventListener('click', toggleTimer);
pomodoroBtn.addEventListener('click', () => setMode(pomodoroBtn, POMODORO_TIME));
shortBreakBtn.addEventListener('click', () => setMode(shortBreakBtn, SHORT_BREAK_TIME));
longBreakBtn.addEventListener('click', () => setMode(longBreakBtn, LONG_BREAK_TIME));
