const config = require('../config/config')
const qs = require('querystring')
const Twitter = require('twitter')

module.exports = {
  async lastTweet (req, res) {
    try {
      //Create a twitter object that contains all the authentification infos
      t = new Twitter({
        consumer_key: config.api.twitterConsKey,
        consumer_secret: config.api.twitterScrtConsKey,
        access_token_key: config.api.twitterAccessToken,
        access_token_secret: config.api.twitterScrtAccessToken
      })
      //parse the choosen screenName in the url
      screenName = qs.parse(req.url)['/tweet?screenName']
      //Create the query for the request (in a JSON object format)
      reqParam = {
        screen_name: screenName,
        count: 1
      }
      //make a call to Twitter class method to create a GET request
      t.get('statuses/user_timeline', reqParam, function(error, tweets, response) {
        //send back to client the usefull infos to display
        res.send({
          tweet: tweets[0].text,
          name: tweets[0].user.name
        })
      })
    } catch (error) {
      res.status(403).send({
        error: `Impossible to get latest tweet. ${error}`
      })
    }
  },
  async NumberOfFollower (req, res) {
    try {
      //Create a twitter object that contains all the authentification infos
      t = new Twitter({
        consumer_key: config.api.twitterConsKey,
        consumer_secret: config.api.twitterScrtConsKey,
        access_token_key: config.api.twitterAccessToken,
        access_token_secret: config.api.twitterScrtAccessToken
      })
      //parse the choosen screenName in the url
      screenName = qs.parse(req.url)['/followerCount?screenName']
      //Create the query for the request (in a JSON object format)
      reqParam = {
        screen_name: screenName,
        count: 1
      }
      //make a call to Twitter class method to create a GET request
      t.get('statuses/user_timeline', reqParam, function(error, tweets, response) {
        //send back to client the usefull infos to display
        res.send({
          followers_count: tweets[0].user.followers_count
        })
      })
    } catch (error) {
      res.status(403).send({
        error: `Impossible to get latest tweet. ${error}`
      })
    } 
  } 
}