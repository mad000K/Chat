const http = require('http');
const fs = require('fs');
const path = require('path');

const indexHtmlFile = fs.readFileSync(path.join(__dirname, 'static', 'index.html'));
const scriptFile = fs.readFileSync(path.join(__dirname, 'static', 'script.js'));
const styleFile = fs.readFileSync(path.join(__dirname, 'static', 'style.css'));
const regFile = fs.readFileSync(path.join(__dirname, 'static', 'register.html'));
const authFile = fs.readFileSync(path.join(__dirname, 'static', 'auth.js'));

const server = http.createServer((req, res) => {
    switch(req.url) {
        case '/': return res.end(indexHtmlFile);
        case '/script.js': return res.end(scriptFile);
        case '/style.css': return res.end(styleFile);
        case '/register': return res.end(regFile);
        case '/auth': return res.end(authFile);
    }
    return res.end('Error 404');
});


server.listen(3000);

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected. id - ' + socket.id);
  let userNickname = 'user';

  socket.on('set_nickname', (nickname) => {
    userNickname = nickname;
  });

  socket.on('new_message', (message) => {
    io.emit('message', userNickname + ' : ' + message);
  });
});