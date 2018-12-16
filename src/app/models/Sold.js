module.exports = (Sequelize, DataTypes) => {
  const Sold = Sequelize.define('Sold', {
    fruit: DataTypes.STRING,
    image: DataTypes.STRING,
    classification: DataTypes.STRING,
    fresh: DataTypes.BOOLEAN,
    amount: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    discount: DataTypes.INTEGER,
    profit: DataTypes.FLOAT,
    sold_by: DataTypes.STRING
  })

  return Sold
}
