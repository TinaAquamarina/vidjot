const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/vidjot-dev', {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Load Idea model
require('./models/Idea');
const Idea = mongoose.model('Ideas');

// Handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Index route
app.get('/', (req, res) => {
  console.log(req.name);
  res.render('index');
});

// About route
app.get('/about', (req, res) => {
  res.render('about')
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});