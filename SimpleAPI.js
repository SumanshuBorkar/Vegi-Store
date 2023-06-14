const fs = require('fs');
const http = require("http");
const data = fs.readFileSync(`${__dirname}/APIdata.json`, 'utf-8');
const server = http.createServer((req, res)=>{
    res.end(data)
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log('this is running fine');
})