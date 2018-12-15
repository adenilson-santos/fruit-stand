module.exports = (Sequelize, DataTypes) => {
  const Sale = Sequelize.define('Sale', {
    fruit: DataTypes.STRING,
    image: DataTypes.STRING,
    classification: DataTypes.STRING,
    fresh: DataTypes.BOOLEAN,
    amount: DataTypes.INTEGER,
    price: DataTypes.STRING,
    sold: DataTypes.BOOLEAN,
    sold_by: DataTypes.STRING
  })

  Sale.associate = models => {
    Sale.belongsTo(models.User, { as: 'user', foreignKey: 'admin_id' })
  }

  return Sale
}
