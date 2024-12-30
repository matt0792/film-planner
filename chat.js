const logItems = JSON.parse(localStorage.getItem("logItems")) || [];
const crew = JSON.parse(localStorage.getItem("crew")) || [];
const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
let userIs = JSON.parse(localStorage.getItem("userIs")) || null;

document.addEventListener("DOMContentLoaded", function () {
  if (crew.length === 0) {
    window.location.href = "manage.html";
  }
  createLogItems(logItems);
  populateChatHistory(chatHistory);
});

document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    newMessage();
  }
});

// Function to create and append log items
function createLogItems(logItems) {
  // Get the log content container
  const logContent = document.getElementById("logContent");

  // Check if the container exists
  if (!logContent) {
    console.error("Element with id 'logContent' not found.");
    return;
  }

  // Loop through each log item
  logItems.forEach((item) => {
    // Create log item container
    const logItemDiv = document.createElement("div");
    logItemDiv.classList.add("log-item");

    // Create log details container
    const logDetailsDiv = document.createElement("div");
    logDetailsDiv.classList.add("log-details");

    // Create and append title
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("log-item-title");
    titleDiv.textContent = item.title;
    logDetailsDiv.appendChild(titleDiv);

    // Create and append date
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("log-item-date");
    dateDiv.textContent = item.date;
    logDetailsDiv.appendChild(dateDiv);

    // Append log details to log item
    logItemDiv.appendChild(logDetailsDiv);

    // Create and append description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("log-item-description");
    descriptionDiv.textContent = item.content;
    logItemDiv.appendChild(descriptionDiv);

    // Append log item to log content container
    logContent.appendChild(logItemDiv);
  });

  logContent.scrollTop = logContent.scrollHeight;
}

function populateChatHistory(chatHistory) {
    const chatContent = document.getElementById("chatContent"); // Get the chat container element
    chatContent.innerHTML = ""; // Clear any existing content
  
    chatHistory.forEach((chat) => {
      // Create the chat item container
      const chatItem = document.createElement("div");
      chatItem.classList.add("chat-item");
  
      // Create the chat item head
      const chatItemHead = document.createElement("div");
      chatItemHead.classList.add("chat-item-head");
  
      // Create and populate the user name
      const chatItemName = document.createElement("div");
      chatItemName.classList.add("chat-item-name");
      chatItemName.textContent = chat.user;
  
      // Create and populate the timestamp
      const chatItemTime = document.createElement("div");
      chatItemTime.classList.add("chat-item-time");
      chatItemTime.textContent = chat.timestamp;
  
      // Append name and time to the chat head
      chatItemHead.appendChild(chatItemName);
      chatItemHead.appendChild(chatItemTime);
  
      // Create and populate the message text
      const chatItemText = document.createElement("div");
      chatItemText.classList.add("chat-item-text");
      chatItemText.textContent = chat.message;
  
      // Append head and text to the chat item
      chatItem.appendChild(chatItemHead);
      chatItem.appendChild(chatItemText);
  
      // Append the chat item to the chat content container
      chatContent.appendChild(chatItem);
    });
    chatContent.scrollTop = chatContent.scrollHeight;
  }
  
function newMessage() {
    let user = userIs.name;
    let message = document.getElementById("chatInputText").value;
    let timestamp = new Date().toLocaleString();

    if (message === "") {
        return;
    } else {
        chatHistory.push({ user, message, timestamp });
        populateChatHistory(chatHistory);
        document.getElementById("chatInputText").value = "";
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
}