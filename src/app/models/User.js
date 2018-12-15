const bcrypt = require('bcryptjs')

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      admin: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
