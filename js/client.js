const socket=io('http://localhost:8000');
const form= document.getElementById("sendForm");
const messageInput= document.getElementById("messageInp");
const messageContainer=document.querySelector(".container");
var audio = new Audio('notify.mp3')
const append=function (message,position){
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();
    }
}
// const name=window.prompt("Enter your name:");
socket.emit('new-user-joined',name);
socket.on('user-joined',(name)=>{
   append(`${name} joined chat`,'right');
})


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageInput.value; 
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';

})

socket.on('recieve',(data)=>{
    append(`${data.name}: ${data.message} `,'left');
    
})

socket.on('left',(name)=>{
    append(`${name}: Left the chat `,'left');
    
})