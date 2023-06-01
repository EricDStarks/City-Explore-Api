
const axios = require('axios')

let moviecache = {}

let headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDY5NWM2OWRhOTU0MTE0NzE0OTUzMDJlMzQ0NWYyZSIsInN1YiI6IjY0NmUyOTY0NTFlNmFiMDExZGI1MzM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dGAgL3gNxjOWY5_Sf_jvQVFdnm-dN-7RwJGcTeTz1GA'
}

async function getMovies(city) {
    // check cache for data
    let movieResponse = moviecache[city]

    if (movieResponse == undefined) {
        movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`, headers = headers)
        moviecache[city] = movieResponse.data
        return movieResponse.data.results
    }

    //send a request mov iedb api
    //URL: https://api.themoviedb.org/3/movie
   
    return (
        movieResponse.results
    )

}



module.exports = getMovies