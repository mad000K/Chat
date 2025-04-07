const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('new_message', input.value);
    input.value = '';
  }
});

socket.on('new_message', function (message) {
    var item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

function changeNickname() {
  let nickname = prompt("Enter your nickname:");
  if (nickname) {
    socket.emit('set_nickname', nickname);
  }
}

changeNickname();