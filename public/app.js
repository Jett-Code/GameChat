const socket = io();
const chatinput = document.getElementById('chat-form');
const chatMsg = document.querySelector('.msg');


let res = '';
    const num = 8;
    for(let i = 0; i < num; i++){
    const random = Math.floor(Math.random() * 27);
    res += String.fromCharCode(97 + random);}
    localStorage.setItem("name", res);


socket.on('message', message =>{
    console.log(message);
    
    if (message.text.trim().length != 0  ){
        outputMessage(message, localStorage.getItem("name"));}

    chatMsg.scrollTop = chatMsg.scrollHeight;
});



chatinput.addEventListener('submit', (e)=>{
    e.preventDefault();

    const msg = e.target.elements.i.value;
    
    socket.emit('chatMessage', msg);

   
    console.log(document.getElementById("i").placeholder)
    e.target.elements.i.value = "";
    e.target.elements.i.placeholder = "Press TAB to exit chat";
    e.target.elements.i.focus();
});

function outputMessage(message, name){
    
    const div = document.createElement('div');
    div.classList.add('msg');
    div.innerHTML =` <h3><span id="col" style="color:${message.color}">${name}</span>: ${message.text}</h3>`;
    document.querySelector('.msg').appendChild(div);
};

