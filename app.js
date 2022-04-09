const express = require('express');
const app = express();
const path = require('path')

// Set the view engine
app.set('view engine', 'ejs')

// Set the path
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res)=>{
  res.render('home');
})

app.listen(3000, ()=>{
  console.log('Listening on port 3000')
})