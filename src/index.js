import './scss/main.scss';

const data = {
  inputYear: document.querySelector('.selected-input.year'),
  inputHour: document.querySelector('.selected-input.hour'),
  button: document.querySelector('.selected-button'),
  timerTitle: document.querySelector('.timer-title'),
  timerValue: document.querySelectorAll('.timer-value'),
  lastPickedDate: document.querySelector('.last-picked-date'),
  refreshTimer: document.querySelector('.refresh-timer'),
};

if (localStorage.LastDate) {
  data.lastPickedDate.textContent = localStorage.getItem('LastDate');
}

function initialization() {
  let interval;
  if (localStorage.data) {
    interval = setInterval(() => {
      if (!localStorage.data) {
        clearInterval(interval);
      }
      const date = new Date().getTime();

      const pickedDate = new Date(
        ...localStorage
          .getItem('data')
          .split(',')
          .map(item => parseInt(item)),
      ).getTime();
      const difference = (pickedDate - date) / 1000;
      if (difference < 0) {
        data.timerTitle.textContent = 'Passed since the selected date:';
      }
      const days = parseInt(difference / 60 / 60 / 24);
      const hours = parseInt((difference - days * 24 * 60 * 60) / 60 / 60);
      const minutes = parseInt((difference - days * 24 * 60 * 60 - hours * 60 * 60) / 60);
      const seconds = parseInt(difference - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60);

      for (const item of data.timerValue) {
        if (item.dataset.value === 'days') {
          item.textContent = Math.abs(days);
        } else if (item.dataset.value === 'hours') {
          item.textContent = Math.abs(hours);
        } else if (item.dataset.value === 'minutes') {
          item.textContent = Math.abs(minutes);
        } else if (item.dataset.value === 'seconds') {
          item.textContent = Math.abs(seconds);
        }
      }
    }, 1000);
  } else {
    clearInterval(interval);
  }
}
initialization();

data.button.addEventListener('click', e => {
  e.preventDefault();
  if (!data.inputYear.value) return;
  const newData = data.inputYear.value.split('/');
  const correctTime = data.inputHour.value.split(':').map(item => parseInt(item));
  localStorage.setItem('data', [
    parseInt(newData[0]),
    parseInt(newData[1]) - 1,
    parseInt(newData[2]),
    ...correctTime,
  ]);

  localStorage.setItem('LastDate', `${data.inputYear.value} ${data.inputHour.value}`);
  data.inputYear.value = '';
  data.inputHour.value = '';
  data.lastPickedDate.textContent = localStorage.getItem('LastDate');
  initialization();
});

data.refreshTimer.addEventListener('click', () => {
  localStorage.removeItem('data');
  data.timerValue.forEach(item => (item.textContent = '00'));
});