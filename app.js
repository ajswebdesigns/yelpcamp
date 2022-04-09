const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override');
const Campground = require('./models/campground');

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

// Parse the Request Body
app.use(express.urlencoded({extended:true}))
// Use Method OverRide
app.use(methodOverride('_method'))

// Index Route
app.get('/campgrounds', async (req, res)=>{
 const campgrounds = await Campground.find({})
 res.render('campgrounds/index', {campgrounds})
})

// Create Route
app.get('/campgrounds/new', (req, res)=>{
  res.render('campgrounds/new')
})

app.post('/campgrounds', async (req, res)=>{
  const campground = new Campground(req.body.campground)
  await campground.save()
  res.redirect(`/campgrounds/${campground._id}`)
})


// Show Route:
app.get('/campgrounds/:id', async (req, res)=>{
  const campground = await Campground.findById(req.params.id)
  res.render('campgrounds/show', {campground})
})

// Update Route:
app.get('/campgrounds/:id/edit', async(req, res)=>{
const campground = await Campground.findById(req.params.id)
res.render('campgrounds/edit', {campground})
})

app.put('/campgrounds/:id', async(req, res)=>{
  const {id} = req.params;
  console.log(req.body.campground)
  const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
  res.redirect(`/campgrounds/${campground._id}`)
})

app.listen(3000, ()=>{
  console.log('Listening on port 3000')
})