import {
  startBtn,
  pomodoroBtn,
  shortBreakBtn,
  longBreakBtn,
  settingsModalBtn,
  settingsModal,
  settingsSaveBtn,
  seeReportBtn,
  dayStreak,
  dayAccessed,
  frequentTimerDuration,
  frequentTimerMode,
  totalHoursFocused,
  reportsModal,
} from './elements.js';
import {
  POMODORO_TIME,
  SHORT_BREAK_TIME,
  LONG_BREAK_TIME,
  setMode,
  toggleTimer,
  selectDuration,
} from './timer.js';
import { seeLogReport, toggleModal } from './ui.js';

startBtn.addEventListener('click', toggleTimer);
pomodoroBtn.addEventListener('click', () => setMode(pomodoroBtn, POMODORO_TIME));
shortBreakBtn.addEventListener('click', () => setMode(shortBreakBtn, SHORT_BREAK_TIME));
longBreakBtn.addEventListener('click', () => setMode(longBreakBtn, LONG_BREAK_TIME));

settingsModalBtn.addEventListener('click', () => toggleModal(settingsModal));
settingsSaveBtn.addEventListener('click', () => selectDuration());

seeReportBtn.addEventListener('click', () =>
  seeLogReport(
    reportsModal,
    dayStreak,
    dayAccessed,
    frequentTimerDuration,
    frequentTimerMode,
    totalHoursFocused
  ));
