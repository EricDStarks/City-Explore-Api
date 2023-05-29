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
    let cityData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${request.query.searchQuery}`)
    let forecastData = cityData.data.data.map(function(element){
        return new ForeCast(element.datetime, element.weather.description)
    })
    response.send(forecastData)
})

let headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDY5NWM2OWRhOTU0MTE0NzE0OTUzMDJlMzQ0NWYyZSIsInN1YiI6IjY0NmUyOTY0NTFlNmFiMDExZGI1MzM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dGAgL3gNxjOWY5_Sf_jvQVFdnm-dN-7RwJGcTeTz1GA'
  }
app.get("/movies", async function (request, response) {
    let movie = request.query.movie
    //send a request moviedb api
    //URL: https://api.themoviedb.org/3/movie
    let movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movie}`, headers=headers)
    response.send(movieResponse.data.results)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(3001)