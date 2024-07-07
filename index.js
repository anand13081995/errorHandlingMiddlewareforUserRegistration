const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


function errorHandler(err, req, res, next) {
  res.status(400).json({ error: err.message });
}

app.post('/register', (req, res, next) => {
  try {
    const { firstName, lastName, password, email, phone } = req.body;

    if (!/^[A-Z]/.test(firstName) || !/^[A-Z]/.test(lastName)) {
      throw new Error('First and last name must start with a capital letter.');
    }

    if (!/(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
      throw new Error('Password must contain at least one special character, one uppercase letter, one numeric character, and be at least 8 characters long.');
    }

    if (!/@/.test(email)) {
      throw new Error('Email must contain an "@" symbol.');
    }

    if (!/^\d{10,}$/.test(phone)) {
      throw new Error('Phone number must be at least 10 digits long.');
    }

    res.status(200).json({ message: 'Registration successful!' });
  } catch (err) {
    next(err);
  }
});


app.use(errorHandler);




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
