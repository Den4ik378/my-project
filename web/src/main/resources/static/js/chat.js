function sendMessage(user, messageText) {
  const chatContainer = document.getElementById("chat");

  if (messageText.trim() === "") {
    return;
  }

  const newMessage = document.createElement("div");
  newMessage.textContent = user + ": " + messageText;

  newMessage.classList.add(
    user === "User1" ? "user1-message" : "user2-message"
  );

  chatContainer.appendChild(newMessage);

  const input = document.getElementById(
    user === "User1" ? "user1Input" : "user2Input"
  );
  input.value = "";

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

document.getElementById("sendUser1").addEventListener("click", function () {
  const input = document.getElementById("user1Input").value;
  sendMessage("User1", input);
});

document.getElementById("sendUser2").addEventListener("click", function () {
  const input = document.getElementById("user2Input").value;
  sendMessage("User2", input);
  document.getElementById("user2Input").value = "";
});
