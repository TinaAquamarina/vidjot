const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// Add body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROUTES
// Index route
app.get('/', (req, res) => {
  console.log(req.name);
  res.render('index');
});

// About route
app.get('/about', (req, res) => {
  res.render('about')
});

// Add idea form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add')
});

// POST process form
app.post('/ideas', (req, res) => {
  let errors = [];

  if(!req.body.title){
    errors.push({text:'Please add a title'});
  }
  if(!req.body.details){
    errors.push({text:'Please add some details'});
  }
  if(errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    })
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
    .save()
    .then(idea => {
      res.redirect('/ideas');
    })
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});