const about = require('../config/about.json')

module.exports = {
  aboutJsonConfig (req, res) {
    try {
      const date = new Date()
      res.send({
        client: req.ip,
        server: {
          current_time: date.getTime(),
          about
        }
      })
    } catch (err) {
      res.status(400).send({
        error: 'An error occured. Impossible to get the about.json.'
      })
    }
  }
}
