const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIAPI } = require('./openai'); // Assuming you have an OpenAI API wrapper

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to check if a Japanese dish is vegetarian
app.post('/api/checkVegetarian', async (req, res) => {
  try {
    const dishName = req.body.dishName;

    // Call the OpenAI API to ask if the dish is vegetarian
    const response = await OpenAIAPI.completions.create({
      engine: 'text-davinci-003',
      prompt: `Is ${dishName} vegetarian?`,
      max_tokens: 50,
    });

    const answer = response.data.choices[0].text.trim();
    res.json({ message: answer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
