import express from 'express';

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Hello from test server');
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
