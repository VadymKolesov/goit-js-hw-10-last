import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/1-timer.css';

const refs = {
  inputDate: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

let userSelectedDate;
let remaningTime;
let formatedRemaningTime;

refs.startBtn.addEventListener('click', renderTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  onClose(selectedDates) {
    saveDate(selectedDates);
    checkCorrectDate();
  },
};

flatpickr(refs.inputDate, options);

function showErrorMessage() {
  iziToast.error({
    message: 'Please choose a date in the future',
    position: 'topRight',
  });
}

function saveDate(date) {
  userSelectedDate = date[0].getTime();
  remaningTime = userSelectedDate - new Date();
}

function checkCorrectDate() {
  if (userSelectedDate - new Date() <= 0) {
    refs.startBtn.disabled = true;
    showErrorMessage();
  } else {
    refs.startBtn.disabled = false;
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

function formatingDate(dateValue) {
  formatedRemaningTime = convertMs(dateValue);
  for (let value in formatedRemaningTime) {
    formatedRemaningTime[value] = formatedRemaningTime[value]
      .toString()
      .padStart(2, '0');
  }
}

function renderTimer() {
  if (!remaningTime) {
    showErrorMessage();
    return;
  }
  formatingDate(remaningTime);
  renderTime();

  const setTime = setInterval(() => {
    startTimer();
    if (remaningTime <= 0) {
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';
      clearInterval(setTime);
      refs.startBtn.disabled = false;
      refs.inputDate.disabled = false;
      return;
    }
  }, 1000);
  refs.startBtn.disabled = true;
  refs.inputDate.disabled = true;
}

function startTimer() {
  remaningTime -= 1000;
  formatingDate(remaningTime);
  renderTime();
}

function renderTime() {
  refs.days.textContent = formatedRemaningTime.days;
  refs.hours.textContent = formatedRemaningTime.hours;
  refs.minutes.textContent = formatedRemaningTime.minutes;
  refs.seconds.textContent = formatedRemaningTime.seconds;
}
