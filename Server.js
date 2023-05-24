const express = require("express")
const app = express()
const WeatherData = require('./Data/Weather.json') 
class ForeCast {
    constructor(date, description) {
        this.date = date
        this.description = description
    }
}


app.get('/', function(request, response){
    response.send("hello")
})
//http://http://localhost:3001/Weather?lat=4&lon=4&searchQuery=Paris
app.get("/Weather", function(request, response) {
    console.log(request.query.lat)
    console.log(request.query.lon)
    console.log(request.query.searchQuery)
    let cityData = WeatherData.find(function(element){
        if(element.city_name === request.query.searchQuery){
            return true

        }else{
            return false
        }
    })
    console.log(cityData)
    let forecastData = cityData.data.map(function(element){
        return new ForeCast(element.datetime, element.weather.description)
    })
    response.send(forecastData)
})

app.listen(3001)