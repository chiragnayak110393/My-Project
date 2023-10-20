const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/anime_tshirts_store', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define a Schema and Model for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  payment: String,
});
const FormData = mongoose.model('FormData', formDataSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/checkout.html');
});

app.post('/checkout_process', (req, res) => {
  const { name, email, address, payment } = req.body;

  const formData = new FormData({
    name,
    email,
    address,
    payment,
  });

  formData.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while processing the form data.');
    } else {
      res.send('Order placed successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
