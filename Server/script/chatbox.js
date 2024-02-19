let channelId = document.currentScript.getAttribute('channelId');
let chatBoxToggle = true;
const host = 'https://converso.site/chatbox?channelId=' + channelId;
// Create a button element
const button = document.createElement('button');
button.id = 'toggleButton';

// Apply inline styles for the button
button.style.position = 'fixed';
button.style.bottom = '40px';
button.style.right = '40px';
button.style.width = '60px';
button.style.height = '60px';
button.style.border = 'none';
button.style.borderRadius = '50%';
button.style.cursor = 'pointer';

// Create an image element
const icon = document.createElement('img');
icon.src = 'https://static-00.iconduck.com/assets.00/chat-bubbles-question-icon-509x512-03s2gx19.png';
icon.style.width = '32px'; /* Make sure the icon fits the button */
icon.style.height = '32px'; /* Make sure the icon fits the button */

// Append the icon to the button
button.appendChild(icon);

// Append the button to the body
document.body.appendChild(button);

// Create a chat box element
const chatBox = document.createElement('div');
chatBox.id = 'chatBox';
chatBox.style.display = 'block'; // Initially hidden

// Apply inline styles for the chat box
chatBox.style.position = 'absolute';
chatBox.style.bottom = 'calc(100% + 10px)'; /* Adjust the position */
chatBox.style.right = '0';
chatBox.style.width = '450px';
chatBox.style.height = '400px';
chatBox.style.zIndex = '999'; /* Set a higher z-index */
chatBox.style.borderRadius = '8px';

// Add content to the chat box
const iframeChatBox = document.createElement('iframe');
iframeChatBox.id = 'iframeChatBox';
iframeChatBox.src = host;
iframeChatBox.style.width = '100%';
iframeChatBox.style.height = '100%';
iframeChatBox.style.borderRadius = '12px';
iframeChatBox.style.border = '0';
iframeChatBox.style.backgroundColor = 'transparent';
iframeChatBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

chatBox.appendChild(iframeChatBox);

// Append the chat box to the button
button.appendChild(chatBox);

// Toggle functionality

const toggleButton = document.getElementById('toggleButton');
toggleButton.style.backgroundColor = '#edebeb';
toggleButton.addEventListener('click', () => {
  toggleChatBox();
  // Toggle the visibility of the chat box with smooth transition
});
// Add styles for button hover effect
toggleButton.style.transition = 'background-color 0.3s ease-in-out';
toggleButton.addEventListener('mouseover', () => {
  toggleButton.style.backgroundColor = '#ddd'; /* Change background color on hover */
});
toggleButton.addEventListener('mouseout', () => {
  toggleButton.style.backgroundColor = '#edebeb'; /* Revert background color on mouseout */
});

function toggleChatBox() {
  if (chatBoxToggle) {
    chatBox.style.opacity = '0';
    chatBox.style.visibility = 'hidden';
    setTimeout(() => {
      chatBox.style.display = 'none';
    }, 300); // Matches transition duration (0.3 seconds)
  } else {
    chatBox.style.opacity = '0';
    chatBox.style.visibility = 'hidden';
    chatBox.style.display = 'block';
    setTimeout(() => {
      chatBox.style.opacity = '1';
      chatBox.style.visibility = 'visible';
    }, 10); // A small delay to ensure styles are applied
  }
  chatBoxToggle = !chatBoxToggle;
}

window.addEventListener('message', receiveMessage, false);

function receiveMessage(event) {
  if (event.data.type === 'TOGGLE_CHAT') toggleChatBox();
}
