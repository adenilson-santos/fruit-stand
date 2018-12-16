module.exports = (Sequelize, DataTypes) => {
  const Sold = Sequelize.define('Sold', {
    fruit: DataTypes.STRING,
    image: DataTypes.STRING,
    classification: DataTypes.STRING,
    fresh: DataTypes.BOOLEAN,
    amount: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    profit: DataTypes.STRING,
    sold_by: DataTypes.STRING
  })

  return Sold
}
