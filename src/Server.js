const getWeather = require ("./Weather")
const getMovies = require ("./Movies")


require("dotenv").config()

const express = require("express")
const cors = require("cors")
const app = express()
const axios =  require('axios')
const WeatherData = require('../Data/Weather.json') 

class ForeCast {
    constructor(date, description) {
        this.date = date
        this.description = description
    }
}

app.use(cors())


app.get('/', function(request, response){
    //Send request to weatherbit api
   
    response.send(WeatherData)
})
//http://http://localhost:3001/Weather?lat=4&lon=4&searchQuery=Paris
app.get("/weather", async function(request, response) {
    //Send request to weatherbit api
    let forecastData = await getWeather(request.query.searchQuery)
    response.send(forecastData)
})


app.get("/movies", async function (request, response) {
   
    //send a request moviedb api
    //URL: https://api.themoviedb.org/3/movie
   let movieData = await getMovies (request.query.movie)
    response.send(movieData)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })



app.listen(3001)