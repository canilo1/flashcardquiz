const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Flashcard Quiz API!');
});

// Flashcards route
app.get('/api/flashcards', (req, res) => {
  const flashcards = [
    { id: 1, question: 'What is 2+2?', answer: '4' },
    { id: 2, question: 'Capital of France?', answer: 'Paris' },
  ];
  res.json(flashcards);
});

app.get("/",(req,res)=>{
  
})

// Login route (using POST for security)
app.post('/user/login', (req, res) => {
  // Add login logic here
  res.json({ message: 'Login endpoint' });
});

// Signup route (using POST for security)
app.post('/user/signup', (req, res) => {
  // Add signup logic here
  res.json({ message: 'Signup endpoint' });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});