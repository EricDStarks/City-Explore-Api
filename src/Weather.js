
const axios =  require('axios')


class ForeCast {
    constructor(date, description) {
        this.date = date
        this.description = description
    }
}
async function getWeather(city) {
    let cityData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${city}`)
    let forecastData = cityData.data.data.map(function(element){
        return new ForeCast(element.datetime, element.weather.description)
    })

    return (
        forecastData
    )
} 

module.exports = getWeather