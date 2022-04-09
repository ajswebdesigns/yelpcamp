const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const campground = require('../models/campground');

// Connect to mongoose and create a DB
mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(()=>{
  console.log('Connected Sucessfully to Mongo')
})
.catch((err)=>{
  console.log('Oh No! Connection Error')
  console.log(err)
})

const sample = (array)=> array[Math.floor(Math.random() * array.length)]
  


const seedDB = async()=>{
  await campground.deleteMany()
  for(let i = 0; i < 50; i++){
    const random1000 = Math.floor(Math.random() * 1000)
     const camp = new campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`
      
    })
    await camp.save()
  }

}
seedDB()
.then(()=>{
  mongoose.connection.close();
})
