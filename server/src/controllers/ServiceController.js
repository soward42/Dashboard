const { Service } = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const services = await Service.findAll()
      res.send(services)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured trying to fetch the services'
      })
    }
  },
  async addService (req, res) {
    try {
      const service = await Service.create(req.body)
      const serviceJson = service.toJSON()
      res.send({
        service: serviceJson
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error occured trying to create a service'
      })
    }
  }
}
