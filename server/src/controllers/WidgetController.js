const {User, Widget} = require('../models')
const about = require('../config/about.json')

module.exports = {
  async userWidgetList (req, res) {
    //get the currently logged user with its token
    const user = await User.findOne({
      where: {
        loginToken: req.body.token
      }
    })
    if (!user) res.status(403).send({error: 'User not found or not logged.'})
    const widgets = await Widget.findAll({
      where: {
        userId: user.id
      }
    })
    //send back the widgets list
    res.send({
      widgets: widgets
    })
  },
  async addWidget (req, res) {
    try {
      //get the currently logged user with its token
      const user = await User.findOne({
        where: {
          loginToken: req.body.token
        }
      })
      //Error handling
      if (!user) res.status(403).send({error: 'User not found or not logged.'})
      //create temporary variable to store data that will be added to DB
      const service = Object.keys(about).forEach(key => {
        return Object.keys(about[key]).forEach(keyy => {
          if (about[key][keyy].name === req.body.widgetType ) return about[key][keyy].name
        })
      })
      const tmp = {
        userId: user.id,
        service: service,
        widget: req.body.widgetType,
        numerical_value: 0,
        text_value: req.body.textValue,
      }
      //Add widget to DB
      const widget = await Widget.create(tmp)
      res.send({ widget: widget })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: `An error occured. ${error}`
      })
    }
  },
  async deleteWidget (req, res) {
    try {
      //Delete the widget in DB with its ID
      const ret = await Widget.destroy({
        where: {
          id: req.body.widgetId
        }
      })
      res.send({success: ret})
    } catch (error) {
      res.status(500).send({
        error: 'An error occured while trying to delete a widget.'
      })
    }
  }
}