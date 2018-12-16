const sequelizePaginate = require('sequelize-paginate')

module.exports = (Sequelize, DataTypes) => {
  const Sale = Sequelize.define('Sale', {
    fruit: DataTypes.STRING,
    image: DataTypes.STRING,
    classification: DataTypes.STRING,
    fresh: DataTypes.BOOLEAN,
    amount: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  })

  Sale.associate = models => {
    Sale.belongsTo(models.User, { as: 'user', foreignKey: 'admin_id' })
  }

  sequelizePaginate.paginate(Sale)

  return Sale
}
