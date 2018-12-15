const { User } = require('../models')

class UserController {
  create (req, res) {
    res.render('auth/signup')
  }

  store (req, res) {
    const { filename } = req.file

    User.create({ ...req.body, avatar: filename })

    res.redirect('/signup')
  }
}

module.exports = new UserController()
