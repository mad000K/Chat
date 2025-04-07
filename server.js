const http = require('http');
const fs = require('fs');
const path = require('path');

const indexHtmlFile = fs.readFileSync(path.join(__dirname, 'static', 'index.html'));
const scriptJsFile = fs.readFileSync(path.join(__dirname, 'static', 'script.js'));
const styleCssFile = fs.readFileSync(path.join(__dirname, 'static', 'style.css'));

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/': return res.end(indexHtmlFile);
    case '/script.js': return res.end(scriptJsFile); 
    case '/style.css': return res.end(styleCssFile);
    }
    res.statusCode == 404;
    return res.end(`Error 404`);
});

server.listen(3000);