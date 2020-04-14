var inputMessage = document.getElementById("message");
var buttonSend = document.getElementById("btnSend");
var messageArea = document.getElementById("messageArea");
var to = document.getElementById("to");

buttonSend.disabled = true;

var ws = new WebSocket("ws://localhost:9000/ws");

ws.onopen = function() {
  console.log("socket opened..");
};

//onmessage
ws.onmessage = function (event){
  var messageData = event.data;
  var message = JSON.parse(messageData);
  console.log(message);

  messageFmt = message.from +" : "+message.content+"\n";
  messageArea.value += messageFmt;
};

ws.onclose = function() {
  // websocket is closed.
  console.log("Connection is closed...");
};

window.onbeforeunload = function(event) {
  socket.close();
};

function userType() {
  if(!inputMessage.validity.valueMissing) {
    buttonSend.disabled = false;
  } else {
    buttonSend.disabled = true;
  }
}

function sendMessage() {
  var content = inputMessage.value;

  var toUser = "";
  var messageType = "broadcast";
  
  if (to.value != "") {
    toUser = to.value;
    messageType = "privateMessage"
  }

  var msg = {
    from: "",
    to: toUser,
    messageType: messageType,
    content: content
  }
  ws.send(JSON.stringify(msg));
  inputMessage.value = "";
}

function clearMessage() {
  messageArea.value = "";
}
