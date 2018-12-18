const { User } = require('../models')

class UserController {
  create (req, res) {
    res.render('auth/signup')
  }

  store (req, res) {
    if (req.file) {
      const { filename } = req.file
      User.create({ ...req.body, avatar: filename })

      return res.redirect('/')
    }

    User.create({ ...req.body, avatar: '/images/defaultavatar.svg' })

    return res.redirect('/')
  }
}

module.exports = new UserController()
