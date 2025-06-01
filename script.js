
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById('clock').textContent = time;
}
setInterval(updateClock, 1000);

let visits = localStorage.getItem('visits') || 0;
visits++;
localStorage.setItem('visits', visits);
console.log("Вы посетили этот сайт " + visits + " раз(а).");

document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.button');
  if (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Форма загрузки работы в разработке. Следите за обновлениями!');
    });
  }
});
