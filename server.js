const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const FILE_PATH = 'messages.json';

// Read messages
app.get('/messages', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    res.json(JSON.parse(data));
  });
});

// Save new message
app.post('/messages', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).send('No text provided');

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Read error');

    const messages = JSON.parse(data);
    messages.push({ text, time: new Date().toISOString() });

    fs.writeFile(FILE_PATH, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).send('Write error');
      res.status(200).send('Message saved');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
