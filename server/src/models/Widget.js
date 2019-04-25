module.exports = (sequelize, DataTypes) => 
  sequelize.define('Widget', {
    userId: DataTypes.INTEGER,
    service: DataTypes.STRING,
    widget: DataTypes.STRING,
    numerical_value: DataTypes.INTEGER,
    text_value: DataTypes.STRING
  })