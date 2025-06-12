<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Message Board</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #ffe4ec;
      padding: 2rem;
      text-align: center;
    }
    h1 {
      color: #c94f7c;
    }
    textarea {
      width: 100%;
      max-width: 500px;
      height: 100px;
      margin: 10px 0;
      font-size: 1rem;
    }
    button {
      padding: 10px 20px;
      font-size: 1rem;
      background: #ff88aa;
      border: none;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
    .messages {
      margin-top: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      text-align: left;
    }
    .message {
      background: #fff;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <h1>Leave a Message 💬</h1>
  <textarea id="messageText" placeholder="Type your message here..."></textarea><br>
  <button onclick="submitMessage()">Send</button>

  <div class="messages" id="messages"></div>

  <script>
    function loadMessages() {
      fetch('/messages')
        .then(res => res.json())
        .then(data => {
          const container = document.getElementById('messages');
          container.innerHTML = '';
          data.reverse().forEach(msg => {
            const div = document.createElement('div');
            div.className = 'message';
            div.innerHTML = `<strong>${new Date(msg.time).toLocaleString()}</strong><br>${msg.text}`;
            container.appendChild(div);
          });
        });
    }

    function submitMessage() {
      const text = document.getElementById('messageText').value;
      if (!text) return alert('Please write something first!');
      
      fetch('/messages', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ text })
      })
      .then(res => {
        if (res.ok) {
          document.getElementById('messageText').value = '';
          loadMessages();
        } else {
          alert('Error sending message');
        }
      });
    }

    loadMessages();
  </script>
</body>
</html>
