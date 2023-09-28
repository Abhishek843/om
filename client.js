const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message');

// Check if a username is stored in local storage
const username = localStorage.getItem('username');
if (!username) {
  window.location.href = '/login';
}

// Function to update the chat box
function updateChat(message) {
  const div = document.createElement('div');
  div.textContent = message;
  chatBox.appendChild(div);
}

// Event listener for form submission to send a message
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if (message) {
    const data = {
      username,
      message,
    };

    // Send the message to the server
    const response = await fetch('/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      messageInput.value = '';
      updateChat(`${username}: ${message}`);
    }
  }
});

// Function to retrieve and display chat history
async function displayChatHistory() {
  const response = await fetch('/chat-history');
  if (response.ok) {
    const messages = await response.json();
    messages.forEach((msg) => {
      updateChat(`${msg.username}: ${msg.message}`);
    });
  }
}

// Call the function to display chat history
displayChatHistory();
