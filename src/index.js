import './scss/main.scss';

class CountdownTimer {
  #selector;
  #targetDate;

  #interval;
  constructor({ selector, targetDate }) {
    this.#selector = document.querySelector(selector);
    this.#targetDate = targetDate;
    this.init();
  }

  initEvents() {
    this.#selector.querySelector('.selected-button').addEventListener('click', e => {
      e.preventDefault();
      if (
        !this.#selector.querySelector('.selected-input.year').value &&
        !this.#selector.querySelector('.selected-input.hour').value
      )
        return;
      const newData = this.#selector.querySelector('.selected-input.year').value.split('/');
      const correctTime = this.#selector
        .querySelector('.selected-input.hour')
        .value.split(':')
        .map(item => parseInt(item));
      localStorage.setItem('data', [
        parseInt(newData[0]),
        parseInt(newData[1]) - 1,
        parseInt(newData[2]),
        ...correctTime,
      ]);

      localStorage.setItem(
        'LastDate',
        `${this.#selector.querySelector('.selected-input.year').value} ${
          this.#selector.querySelector('.selected-input.hour').value
        }`,
      );
      this.#selector.querySelector('.selected-input.year').value = '';
      this.#selector.querySelector('.selected-input.hour').value = '';
      this.#selector.querySelector('.last-picked-date').textContent =
        localStorage.getItem('LastDate');
      this.init();
    });

    this.#selector.querySelector('.refresh-timer').addEventListener('click', () => {
      localStorage.removeItem('data');
      this.#selector.querySelectorAll('.timer-value').forEach(item => (item.textContent = '00'));
    });
  }

  init() {
    if (localStorage.LastDate) {
      this.#selector.querySelector('.last-picked-date').textContent =
        localStorage.getItem('LastDate');
    }
    this.initEvents();
    if (localStorage.data) {
      this.#interval = setInterval(() => {
        if (!localStorage.data) {
          clearInterval(this.#interval);
          return;
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
          this.#selector.querySelector('.timer-title').textContent =
            'Passed since the selected date:';
        }
        const days = parseInt(difference / 60 / 60 / 24);
        const hours = parseInt((difference - days * 24 * 60 * 60) / 60 / 60);
        const minutes = parseInt((difference - days * 24 * 60 * 60 - hours * 60 * 60) / 60);
        const seconds = parseInt(difference - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60);
        const dataArr = [days, hours, minutes, seconds];
        const timerValue = this.#selector.querySelectorAll('.timer-value');
        for (let i = 0; i < timerValue.length; i += 1) {
          timerValue[i].textContent = Math.abs(dataArr[i]);
        }
      }, 1000);
    } else {
      clearInterval(this.#interval);
    }
  }
}

const timer = new CountdownTimer({ selector: '.timer', targetDate: localStorage.data });
timer.init();
