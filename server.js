const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    // For demonstration, accept any username/password
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(400).json({ success: false, message: 'Missing credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
