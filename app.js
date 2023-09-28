const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs').promises;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
  const { username } = req.body;

  // Store the username in a session or a database
  // Example using a simple in-memory object for demonstration:
  // Replace this with a database or session management.
  const user = { username };

  // Redirect the user to the chat page
  res.redirect('/');
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/send', async (req, res) => {
  const { username, message } = req.body;
  try {
    // Append the message to a file with username
    await fs.appendFile('chat-history.txt', `${username}: ${message}\n`);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/chat-history', async (req, res) => {
  try {
    // Read and send chat history
    const data = await fs.readFile('chat-history.txt', 'utf-8');
    const messages = data.trim().split('\n').map((line) => {
      const [username, message] = line.split(': ');
      return { username, message };
    });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
