const config = require('../config/config')
const request = require('request')
const qs = require('querystring')

module.exports = {
  async getCityWeather (req, res) {
    try {
      //Parse url to get the city name
      cityName = qs.parse(req.url)['/weather?city']
      //create variable that will hold the openWeatherMap API url wiht its query
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${config.api.weatherApiKey}`
      //make a GET request to openWeatherMap API to get the current weather in a given city
      request.get(url, function (e, r, body) {
        //Parse body into a JSON object
        w = JSON.parse(body)
        if (w.cod === "404") {
            console.log('erreur')
            res.status(404).send({ error: `City not found` })
            return
        }
        //Send back to client a JSON object with usefull informations to display
        res.send({
          city: cityName,
          weather: w.weather[0].description,
          temp: w.main.temp
        })
      })
    } catch (error) {
      res.status(403).send({
        error: `an error occured while getting the actual weather.`
      })
    }
  }
}