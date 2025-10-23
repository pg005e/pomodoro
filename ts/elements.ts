import { getElement } from './utils.js';

export const timerDisplay = getElement('timer');
export const alarmSound = getElement<HTMLMediaElement>('alarmSound');
export const startBtn = getElement('startBtn');
export const pomodoroBtn = getElement('pomodoroBtn');
export const shortBreakBtn = getElement('shortBreakBtn');
export const longBreakBtn = getElement('longBreakBtn');
