import { timerDisplay } from './elements.js';

let isSettingsModalVisible = false;
let isReportsModalVisible = false;

// countdowns the timer, updates the timer as mode selected
export function updateTimerDisplay(timeLeft: number) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// toggle the hidden settings modal (simple)
export function toggleModal(modal: HTMLElement) {
  if (isSettingsModalVisible) {
    modal.classList.add('hidden');
    isSettingsModalVisible = false;
  } else {
    modal.classList.remove('hidden');
    isSettingsModalVisible = true;
  }
}

export async function seeLogReport(
  reportsModal: HTMLElement,
  dayStreak: HTMLElement,
  dayAccessed: HTMLElement,
  frequentTimerDuration: HTMLElement,
  frequentTimerMode: HTMLElement,
  totalHoursFocused: HTMLElement
) {
  const response = await fetch('/?handler=LogReports', {
    method: 'GET'
  });
  const report = await response.json();
  if (report.error == "NotLoggedIn") {
    alert("Please log in to unlock reports!")
  } else {
    if (isReportsModalVisible) {
      reportsModal.classList.add('hidden');
      isReportsModalVisible = false;
    } else {
      reportsModal.classList.remove('hidden');
      isReportsModalVisible = true;
    }

    dayStreak.innerHTML = `Day Streak = ${report.dayStreak}`;
    dayAccessed.innerHTML = `Day Accessed = ${report.dayAccessed}`;
    frequentTimerDuration.innerHTML = `Frequent Timer Duration = ${report.frequentTimerDuration}`;
    frequentTimerMode.innerHTML = `Frequent Timer Mode = ${report.frequentTimerMode}`;
    totalHoursFocused.innerHTML = `Total Hours Focused = ${report.totalHoursFocused}`;
  }
}
