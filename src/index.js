import './scss/main.scss';

const data = {
  inputYear: document.querySelector('.selected-input.year'),
  inputHour: document.querySelector('.selected-input.hour'),
  button: document.querySelector('.selected-button'),
  timerTitle: document.querySelector('.timer-title'),
  timerValue: document.querySelectorAll('.timer-value'),
};

const date = new Date().getTime();

data.button.addEventListener('click', e => {
  e.preventDefault();
  if (!data.inputYear.value) return;
  const newData = data.inputYear.value.split('/');
  const newTime = data.inputHour.value.split(':');
  const correctTime = newTime.map(item => parseInt(item));
  const pickedDate = new Date(
    newData[0],
    parseInt(newData[1]) - 1,
    parseInt(newData[2]),
    ...correctTime,
  ).getTime();
  const difference = (pickedDate - date) / 1000;
  const days = parseInt(difference / 60 / 60 / 24);
  const hours = parseInt((difference - days * 24 * 60 * 60) / 60 / 60);
  const minutes = parseInt((difference - days * 24 * 60 * 60 - hours * 60 * 60) / 60);
  const seconds = parseInt(difference - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60);

  for (const item of data.timerValue) {
    if (item.dataset.value === 'days') {
      item.textContent = days;
    } else if (item.dataset.value === 'hours') {
      item.textContent = hours;
    } else if (item.dataset.value === 'minutes') {
      item.textContent = minutes;
    } else if (item.dataset.value === 'seconds') {
      item.textContent = seconds;
    }
  }

  console.log(`Days: ${days}`);
  console.log(`Hours: ${hours}`);
  console.log(`Minutes: ${minutes}`);
  console.log(`Seconds: ${seconds}`);
});
