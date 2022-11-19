const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/message');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket =>{
    console.log("new conn");
    
    
    
    let color;
    color = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();

    /*socket.broadcast.emit('message', formatMessage(res, `${res} has joined the chat`, color));

    socket.on('disconnect', ()=>{
        io.emit('message', formatMessage(res, `${res} has left the chat`, color));
    });*/

    socket.on('chatMessage',(msg)=>{
        io.emit('message', formatMessage(msg, color));
    });
});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT} `));
