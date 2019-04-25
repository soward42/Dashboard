module.exports = {
  services: [{
    name: 'Weather',
    logo: '../assests/weatherLogo.png',
    backColor: '#000000',
    widget: [{
      name: 'LocalWeather',
      paramName: 'City Name'
    }]
  }, {
    name: 'twitter',
    logo: '../assests/twitterLogo.jpg',
    backColor: '#00C2F2',
    widget: [{
      name: 'FollowerCount',
      paramName: 'Account Name'
    }, {
      name: 'LastTweet',
      paramName: 'Account Name'
    }]
  }]
}
