const refs = {
  startBtn: document.getElementById('start-btn'),
  stopBtn: document.getElementById('stop-btn'),
  body: document.querySelector('body'),
};

let intervalId = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  intervalId = setInterval(changeBodyColor, 1000);
  toggleButtons();
}

function onStopBtnClick() {
  clearInterval(intervalId);
  toggleButtons();
}

function changeBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function toggleButtons() {
  refs.startBtn.disabled = !refs.startBtn.disabled;
  refs.stopBtn.disabled = !refs.stopBtn.disabled;
}
