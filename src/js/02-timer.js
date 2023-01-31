import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startButton.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

class CountdownTimer {
  constructor(endDate) {
    this.endDate = endDate;
    this.remainingTime = this.endDate - Date.now();
  }

  start() {
    this.intervalId = setInterval(() => {
      this.remainingTime = this.endDate - Date.now();
      if (this.remainingTime <= 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.getElementById('start-button');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

startButton.disabled = true;

let timer = null;

startButton.addEventListener('click', startTimer);

function startTimer() {
  const endDate = new Date(datetimePicker.value);
  timer = new CountdownTimer(endDate);
  timer.start();
  setInterval(updateTimer, 1000);
}

function updateTimer() {
  const remainingTime = timer.remainingTime;
  if (remainingTime <= 0) {
    timer.stop();
  } else {
    const time = convertMs(remainingTime);
    daysField.textContent = addLeadingZero(time.days);
    hoursField.textContent = addLeadingZero(time.hours);
    minutesField.textContent = addLeadingZero(time.minutes);
    secondsField.textContent = addLeadingZero(time.seconds);
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
