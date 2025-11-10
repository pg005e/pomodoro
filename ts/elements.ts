import { getElement } from './utils.js';

export const timerDisplay = getElement('timer');
export const alarmSound = getElement<HTMLMediaElement>('alarmSound');
export const startBtn = getElement('startBtn');
export const pomodoroBtn = getElement('pomodoroBtn');
export const shortBreakBtn = getElement('shortBreakBtn');
export const longBreakBtn = getElement('longBreakBtn');

export const settingsModalBtn = getElement('settingsModlBtn');
export const settingsModal = getElement('settingsModl');
export const settingsSaveBtn = getElement('settingsSaveBtn');

export const pomodoroDuration = getElement<HTMLInputElement>('pomodoroDuration');
export const shortBreakDuration = getElement<HTMLInputElement>('shortBreakDuration');
export const longBreakDuration = getElement<HTMLInputElement>('longBreakDuration');
