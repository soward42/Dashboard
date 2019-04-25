const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const StatusController = require('./controllers/StatusController')
const WeatherApiController = require('./controllers/WeatherApiController')
const TwitterApiController = require('./controllers/TwitterApiController')
const WidgetController = require('./controllers/WidgetController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/unregister',
    AuthenticationController.unregister)
  app.post('/login',
    AuthenticationController.login)
  app.get('/about.json', StatusController.aboutJsonConfig)
  app.get('/weather', WeatherApiController.getCityWeather)
  app.get('/tweet', TwitterApiController.lastTweet)
  app.get('/followerCount', TwitterApiController.NumberOfFollower)
  app.post('/addWidget', WidgetController.addWidget)
  app.post('/deleteWidget', WidgetController.deleteWidget)
  app.post('/userWidgetList', WidgetController.userWidgetList)
}
