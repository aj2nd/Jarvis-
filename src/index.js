const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

// === OpenAI Setup ===
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// === AI Chat Endpoint ===
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Jarvis, an expert business/accounting/tax assistant." },
        { role: "user", content: message }
      ],
      max_tokens: 256,
      temperature: 0.7,
    });
    res.json({ reply: completion.data.choices[0].message.content.trim() });
  } catch (err) {
    res.json({ reply: "Sorry, I'm having trouble connecting to AI right now." });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello, Jarvis!');
});

// Route to serve dashboard.html
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
