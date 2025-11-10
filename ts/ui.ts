import { timerDisplay } from './elements.js';

// TODO: update the mode duration when selecting custom mode duration

let isModalVisible = false;

// countdowns the timer, updates the timer as mode selected
export function updateTimerDisplay(timeLeft: number) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// toggle the hidden settings modal (simple)
export function toggleModal(modal: HTMLElement) {
  if (isModalVisible) {
    modal.classList.add('hidden');
    isModalVisible = false;
  } else {
    modal.classList.remove('hidden');
    isModalVisible = true;
  }
}
