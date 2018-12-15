'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('solds', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      fruit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING
      },
      classification: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fresh: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      profit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sold_by: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('solds')
  }
}
