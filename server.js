const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// GET endpoint at /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint at /bfhl
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input. 'data' must be an array." });
    }

    // Separate numbers and alphabets
    let numbers = [];
    let alphabets = [];

    data.forEach(item => {
      // Ensure the item is a string
      const str = String(item).trim();
      // Check if the string is numeric (only digits)
      if (/^\d+$/.test(str)) {
        numbers.push(str);
      } else if (/^[a-zA-Z]$/.test(str)) {
        alphabets.push(str);
      }
    });

    // Determine the highest alphabet (case-insensitive) if any alphabets exist
    let highest_alphabet = [];
    if (alphabets.length > 0) {
      highest_alphabet.push(alphabets.reduce((a, b) => {
        return a.toUpperCase() >= b.toUpperCase() ? a : b;
      }));
    }

    // Build the response with your details (adjust these if needed)
    const response = {
      is_success: true,
      user_id: "playerishash_01011990",
      email: "playerishash@xyz.com",
      roll_number: "ROLL123",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ is_success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
