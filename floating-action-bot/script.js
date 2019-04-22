let status = document.getElementById('status');
let chatbox = document.getElementById('main-box');
let id = Math.floor(Math.random() * 1000 + 1);
let ul = document.getElementById('conversation');
let chat = document.getElementById("chat-container");
let input = document.getElementById("chat-input");
let fab = document.getElementById('fab');
let fab_close = document.getElementById('fab-close');

const url = "http://localhost:8080/api/v1";

input.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btn").click();
    }
});

window.onload = function () {
    fetch(`${url}/status`, {
        method: 'GET'
    })
        .then(function (response) {
            status.innerHTML = "<i class='fas fa-circle'></i> Online";
        })
        .catch(function (response) {
            status.innerHTML = "<i class='fas fa-circle' style='color:red'></i> Offline";
        })
}

function openchat() {
    chatbox.style.display = "block"
    fab.style.display = "none";
    fab_close.style.display = "block";
}

function closechat() {
    chatbox.style.display = "none";
    fab_close.style.display = "none";
    fab.style.display = "block";
}

function start(msg) {
    createSender(msg);
    document.getElementById('typing').style.display = "inline";
    respond(msg);
}

function speak(msg) {
    var speech = new SpeechSynthesisUtterance(msg);
    speech.voice = speechSynthesis.getVoices()[5];
    window.speechSynthesis.speak(speech);
}

function createSender(msg) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(msg));
        li.className = "sender"
        ul.appendChild(li);
        document.getElementById('chat-input').value = "";
        chat.scrollTop = chat.scrollHeight;
}

function ValidURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(str)) {
      return false;
    } 
    return true;
  }

function createButton(msg){
    if(msg.includes('What processor do you need?')){
        let li = document.createElement('li');
        li.innerHTML = msg;
        if (voice() == true)
            speak(li.innerText);
        li.className = 'responder';
        
        ul.appendChild(li)

        var createBtn = function(btn, name)
        {
        btn.className = 'chat-button';
        btn.innerHTML = name;
        btn.setAttribute('value', name); 
        btn.setAttribute('id', 'btnVal' + name);
        btn.setAttribute('onclick', 'sendButton(this.id)');
        ul.appendChild(btn)
        
        }
        
        let bt = document.createElement('button');
        let bt1 = document.createElement('button');
        let bt2 = document.createElement('button');
        let bt3 = document.createElement('button');
        let bt4 = document.createElement('button');
        
        createBtn(bt, 'i3');
        createBtn(bt1, 'i5');
        createBtn(bt2, 'i7');
        createBtn(bt3, 'Xeon');
        createBtn(bt4, 'Celeron');


        chat.scrollTop = chat.scrollHeight;
    }
    else if(msg.includes('How much memory do you need?')){
        let li = document.createElement('li');
        li.innerHTML = msg;
        if (voice() == true)
            speak(li.innerText);
        li.className = 'responder';
        
        ul.appendChild(li)

        var createBtn = function(btn, name)
        {
        btn.className = 'chat-button';
        btn.innerHTML = name;
        btn.setAttribute('value', name); 
        btn.setAttribute('id', 'btnVal' + name);
        btn.setAttribute('onclick', 'sendButton(this.id)');
        ul.appendChild(btn)
        
        }
        
        let bt = document.createElement('button');
        let bt1 = document.createElement('button');
        let bt2 = document.createElement('button');
        let bt3 = document.createElement('button');
        
        createBtn(bt, '4GB');
        createBtn(bt1, '8GB');
        createBtn(bt2, '16GB');
        createBtn(bt3, '32GB');


        chat.scrollTop = chat.scrollHeight;
    }
    else if(msg.includes('Which Product would you like to see?')){

        let li = document.createElement('li');
        li.innerHTML = msg;
        if (voice() == true)
            speak(li.innerText);
        li.className = 'responder';
        
        ul.appendChild(li)

        var createBtn = function(btn, name)
        {
        btn.className = 'chat-button';
        btn.innerHTML = name;
        btn.setAttribute('value', name); 
        btn.setAttribute('id', 'btnVal' + name);
        btn.setAttribute('onclick', 'sendButton(this.id)');
        ul.appendChild(btn)
        }
        
        let bt = document.createElement('button');
        let bt1 = document.createElement('button');
        let bt2 = document.createElement('button');
        
        createBtn(bt, 'laptop');
        createBtn(bt1, 'desktop');
        createBtn(bt2, 'workstation');

        chat.scrollTop = chat.scrollHeight;
    }
}


function createResponder(msg) {
    if(msg.includes('What processor do you need?') || msg.includes('How much memory do you need?') || msg.includes('Which Product would you like to see?')){
        createButton(msg);
    } 
    else if(!ValidURL(msg)){
        
        var numberOfLineBreaks = (msg.match(/\n/g)||[]).length -1;
        var Msg = msg.split('\n');
        var n=0;
        do{
            var br = document.createElement("br");
            let li = document.createElement('li');
            li.innerHTML = Msg[n];
            if (voice() == true)
                speak(li.innerText);
            li.className = 'responder';
            $(li).attr('style', 'float:left');
            ul.appendChild(li)
            ul.appendChild(br)
            if(Msg.includes('is it ok for you?')){
                let i = document.createElement('img');
                i.className = 'responder';
                i.setAttribute('src', 'xps.jpg');
                i.setAttribute('style', 'width: 50%; height: 50%; float:left');
                ul.appendChild(i)
            }
            chat.scrollTop = chat.scrollHeight;
            n++;
        }while(n <= numberOfLineBreaks);

    } else{
        let a = document.createElement('a');
        a.className = 'responder';
        $(a).attr('href', msg);
        $(a).attr('style', 'background-color: #84FF91; float:left');
        $(a).attr('target', '_blank');
        $(a).html('See Product');
        ul.appendChild(a)
        chat.scrollTop = chat.scrollHeight;
    }
    
}

function sendButton(id) {
    let message = document.getElementById(id).value;
    if (message != '') {
        createSender(message);
        document.getElementById('typing').style.display = "inline";
        respond(message);
    }
}

function send() {
    let message = document.getElementById('chat-input').value;
    if (message != '') {
        createSender(message);
        document.getElementById('typing').style.display = "inline";
        respond(message);
    }
}

function respond(msg) {
    data = {
        query: msg
    }
    fetch(`${url}/${id}/respond`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(function (response) {
            document.getElementById('typing').style.display = "none";
            return response.json();
        })
        .then(function (responses) {
            console.log(responses);
            if (responses) {
                for (let response of responses) {
                    createResponder(response.text);
            }
            } else {
                createResponder("Sorry, I'm having trouble understanding you, try asking me in an other way")
            }

        })
        .catch(function (err) {
            document.getElementById('typing').style.display = "none";
            createResponder("I'm having some technical issues. Try again later :)");
        });
}

function voice() {
    let speaker = document.getElementById('voice').checked;
    if (speaker == true)
        return true;
    else
        return false;
}

function listen() {
    let mic = document.getElementById('mic');
    mic.style.color = 'red';
    mic.className = 'animated pulse infinite';
    let hear = new webkitSpeechRecognition();
    hear.continuous = false;
    hear.lang = 'en-IN';
    hear.start();

    hear.onresult = function (e) {
        mic.style.color = 'black';
        mic.className = '';
        userVoiceText = e.results[0][0].transcript;
        hear.stop();
        createSender(userVoiceText);
        respond(userVoiceText);
    }
}