const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const campground = require('./models/campground');


// Connect to mongoose and create a DB
mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(()=>{
  console.log('Connected Sucessfully to Mongo')
})
.catch((err)=>{
  console.log('Oh No! Connection Error')
  console.log(err)
})

const app = express();
// Set the view engine
app.set('view engine', 'ejs')

// Set the path
app.set('views', path.join(__dirname, 'views'));


app.get('/makeCampground', async (req, res)=>{
  const camp = new campground({
    title: 'First Campground',
    description: 'more data'
  })
  await camp.save()
  .then((data)=>{
    console.log('Yay the below data has been saved sucessfully!')
    console.log(data)
  })
  .catch((e)=>{
    console.log(e)
  })
  res.send('perfect')
})

app.listen(3000, ()=>{
  console.log('Listening on port 3000')
})