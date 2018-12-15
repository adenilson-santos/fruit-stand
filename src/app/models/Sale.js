module.exports = (Sequelize, DataTypes) => {
  const Sale = Sequelize.define('Sale', {
    fruit: DataTypes.STRING,
    image: DataTypes.STRING,
    classification: DataTypes.STRING,
    fresh: DataTypes.BOOLEAN,
    amount: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  })

  return Sale
}
